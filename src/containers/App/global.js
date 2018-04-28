import { EventEmitter } from 'events';

class GlobalClass extends EventEmitter {
    constructor () {
        super();
        this.singleplayer = {
            selected: null // new Wad
        };
    }

    // Uncomment for event debugging
    emit (...e) {
        console.log('Emit', e);
        super.emit(...e);
    }

    get isNative () {
        return typeof window.require === 'function';
    }
}

window.DBFGL = new GlobalClass();
