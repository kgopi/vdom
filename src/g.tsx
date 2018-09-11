export class _g {

    public tagName:string;
    public attributes:{};
    public children:Array<_g>;
    public el: Node|HTMLElement;
    public textContent:string;

    constructor(tagName: string, attributes={}, children:Array<_g>){
        this.tagName = tagName;
        this.attributes = attributes;
        this.children = children.map((child:any)=>{
            if(typeof child == "string"){
                let hInst = new _g("#text", [], []);
                hInst.textContent = child;
                return hInst;
            }
            return child;
        });
    }

    public render(){
        this.createElement();
        this.setAttributes(this.attributes);
        this.renderChildren();
    }

    public setAttributes(attributes){
        for(let key in attributes){
            this.setAttribute(key, attributes[key]);
        }
    }

    public removeAttributes(attributes){
        for(let key in attributes){
            this.removeAttribute(key);
        }
    }

    public removeAttribute(key){

        if(this.el.nodeType == Node.TEXT_NODE){
            return;
        }

        if(/^on/.test(key)){
            this.el[key] = null;
        }else{
            (this.el as HTMLElement).removeAttribute(key);
        }
    }

    public setAttribute(key, value){

        if(this.el.nodeType === Node.TEXT_NODE){
            return;
        }

        if(/^on/.test(key)){
            this.el[key] = value;
        }else{
            (this.el as HTMLElement).setAttribute(key, value);
        }
    }

    private renderChildren(){
        this.children.forEach((child:_g)=>{
            child.render();
            this.el.appendChild(child.el);
        });
    }

    private createElement(){
        if(this.tagName == "#text"){
            this.el = document.createTextNode(this.textContent);
        }else{
            this.el = document.createElement(this.tagName);
        }
    }
}

function flattern(list){
    return list.reduce((acc, item)=>{
        if(Array.isArray(item)){
            return acc.concat(flattern(item));
        }else{
            return acc.concat(item);
        }
    }, []);
}

const g = function(tagName, attributes, ...children):_g{
    return new _g(tagName, attributes, flattern(children));
}

export default g;