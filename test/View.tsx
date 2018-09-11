import {g} from './../src/vdom';

export default class View{

    constructor(state, actions){
        return (<div a="2" b="4">
            <div>It's Working</div>
            <div onclick={function(){
                actions.updateList(Math.floor(Math.random()*1000));
            }}>Click to add</div>
            <div>
                <ul>
                    {
                        state.list.map(item=><li onclick={function(){actions.removeItem(+this.innerText)}} >{item+""}</li>)
                    }
                </ul>
            </div>
        </div>);
    }

}