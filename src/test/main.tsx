import {g, app} from './../lib/vdom';
import View from "./View";

const state = {
    list: [1,2,3,4,5]
}

const actions = {
    updateList: (state)=>{
        return (num)=>{
            state.list.push(num);
            return {...state};
        }
    },
    removeItem: (state)=>{
        return (num)=>{
            state.list.splice(state.list.indexOf(num), 1);
            return {...state};
        }
    }
}

app(document.querySelector('main'), View, state, actions);

