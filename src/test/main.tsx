import {h, app} from './../lib/vdom';
import View from "./View";

const state = {
    li: [1,2,3,4]
}

app(document.querySelector('main'), View, state);

