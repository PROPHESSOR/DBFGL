import { EventEmitter } from 'events';
const NW = window.require('nw.gui');

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

    get appData () {
        return NW.App.getDataPath();
    }
}

window.DBFGL = new GlobalClass();
