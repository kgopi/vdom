import {g} from './../src/vdom';

export default class View{

    constructor(state, actions){
        return (<div a="2" b="4">
            <h1>G DOM playground</h1>
            <div onclick={function(){
                actions.updateList(Math.floor(Math.random()*1000));
            }}>Click to add</div>
            <div>
                <ul>
                    {
                        state.list.map(item=><li onclick={function(){actions.removeItem(+this.innerText)}} >{item+""}<span style="margin-left: 20px">Click to remove</span></li>)
                    }
                </ul>
            </div>
        </div>);
    }

}