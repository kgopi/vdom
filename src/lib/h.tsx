class _h {

    private tagName:string;
    private attributes:{};
    private children:Array<_h>;
    public el: HTMLElement;

    constructor(tagName: string, attributes={}, children:Array<_h>){
        this.tagName = tagName;
        this.attributes = attributes;
        this.children = children;
        this.init();
    }

    private init(){
        this.createElement();
        this.setAttributes();
        this.renderChildren();
    }

    private setAttributes(){
        for(let key in this.attributes){
            this.el.setAttribute(key, this.attributes[key]);
        }
    }

    private renderChildren(){
        this.children.forEach((child:_h)=>{
            if(typeof child == "string"){
                this.el.appendChild(document.createTextNode(child));
            }else{
                this.el.appendChild(child.el);
            }
        });
    }

    private createElement(){
        this.el = document.createElement(this.tagName);
    }

}

const h = function(tagName, attributes, ...children){
    return new _h(tagName, attributes, children);
}

export default h;