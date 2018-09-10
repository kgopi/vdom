import {h} from './../lib/vdom';

export default class View{

    constructor(){
        return (<div a="2" b="4">
            <div>It's Working</div>
            <div>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ul>
            </div>
        </div>);
    }

}