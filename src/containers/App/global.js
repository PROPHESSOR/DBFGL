import { EventEmitter } from 'events';

class GlobalClass extends EventEmitter {
    get isNative () {
        return typeof window.require === 'function';
    }
}

window.DBFGL = new GlobalClass();
