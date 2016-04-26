/**
 * Created by Mirek on 2015-10-13.
 */
import Dispacher from './Dispacher'
import {observable} from './Decorators'
@observable
export default class BaseStore {
    constructor() {
        this.state = {};
    }

    getState(id) {
        return this.state[id];
    }

    getAllState() {
        return this.state;
    }

    dispach() {
        this.emmit();
    }


    init() {
        this.initialized = true;
        Dispacher.addListener(this.dispacherListener.bind(this));
        this.initImpl();
    }

    setState(options) {
        for (let key in options) {
            this.state[key] = options[key];
        }

        if (this.listener) {
            this.listener();
        }
        this.dispach();
    }

    initImpl() {

    }

    dispacherListener(action) {

    }
}

