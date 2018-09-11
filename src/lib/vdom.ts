export {default as h} from "./h";
import {_h} from "./h";

let vDOM;

function isStateChanged(old, _new){
    return JSON.stringify(old) === JSON.stringify(_new);
}

function compareAttributes(old:_h, _new:_h){

    let attributes2BeAdded = {};
    let attributes2BeRemoved = {};
    for(let key in _new.attributes){
        if(old.attributes[key] == null){
            attributes2BeRemoved[key] = null;
        }else if(old.attributes[key] != _new.attributes[key]){
            attributes2BeAdded[key] = _new.attributes[key];
        }
    }

    _new.el = old.el;
    if(Object.keys(attributes2BeAdded).length > 0){
        _new.setAttributes(attributes2BeAdded);
    }
    if(Object.keys(attributes2BeRemoved).length > 0){
        _new.removeAttributes(attributes2BeRemoved);
    }
}

function compareChildren(old, _new){
    let breakPoint = Math.max(old.children.length, _new.children.length);
    for(let i=0; i<breakPoint; i++){
        compareNodes(old.children[i], _new.children[i], _new.children[i-1]);
    }
}

function compareNodes(old:_h, _new: _h, relative?: _h){
    if(old && _new == null){
        old.el.parentElement.removeChild(old.el);
    }else if(old == null && _new){
        _new.render();
        relative.el['insertAdjacentElement']("afterend", _new.el);
    }else if(old.tagName != _new.tagName){
        _new.render();
        old.el.parentElement.replaceChild(_new.el, old.el);
        compareChildren(old, _new);
    }else if(old.textContent != _new.textContent){
        _new.render();
        old.el.parentElement.replaceChild(_new.el, old.el);
    }else{
        compareAttributes(old, _new);
        compareChildren(old, _new);
    }
}

function triggerChangeDetection(newVDOM){
    compareNodes(vDOM, newVDOM);
    vDOM = newVDOM;
}

function reRenderView(view, state, actions){
    let newVDom = _app(view, state, proxyActions(state, actions, view));
    triggerChangeDetection(newVDom);
}

function proxyActions(state, actions, view){
    let proxyActions = {};
    let proxyActionCall = function(cb){
        return function(){
            let newState = cb.apply(null, arguments);
            if(isStateChanged(state, newState)){
                reRenderView(view, state, actions);
            }
        }
    };
    for(let key in actions){
        if(typeof actions[key] == "function"){
            proxyActions[key] = proxyActionCall(actions[key]({...state}));
        }else{
            proxyActions[key] = proxyActionCall(actions[key]);
        }
    }
    return proxyActions;
}

function _app(view, state, actions){
    return view(state, actions);
}

export const app = (ele:HTMLElement, view: Function, state:Object, actions:Object)=>{
    vDOM = _app(view, state, proxyActions(state, actions, view));
    vDOM.render();
    ele.appendChild(vDOM.el);
}

export default app;