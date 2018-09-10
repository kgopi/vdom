export {default as h} from "./h";

export const app = (ele:HTMLElement, view: Function, state:Object)=>{
    const v = view(state);
    ele.appendChild(v.el);
};

export default app;