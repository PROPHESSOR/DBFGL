import { EventEmitter } from 'events';
const NW = window.require ? window.require('nw.gui') : null;

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
        if (!DBFGL.isNative) {
            throw new Error('Не могу получить путь папки лаунчера в браузере!');
        }

        return NW.App.getDataPath();
    }
}

window.DBFGL = new GlobalClass();
