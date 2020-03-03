import { EventEmitter } from 'events';

const isNative = !!(window && window.process && window.process.type);

const electron = isNative ? require('electron') : null;

class GlobalClass extends EventEmitter {
    constructor () {
        super();
        this.singleplayer = {
            selected: [],
            iwad:     null // new Wad
        };
        this.tab = 'singleplayer';

        this.on('tab.change', (tab) => {
            if (!(tab === 'singleplayer' || tab === 'multiplayer')) {
                throw new TypeError('Нет такого таба!');
            }
            this.tab = tab;
        });
    }

    // Uncomment for event debugging
    emit (...e) {
        console.log('Emit', e);
        super.emit(...e);
    }

    get isNative () {
        return isNative;
    }

    get appData () {
        if (!DBFGL.isNative) {
            throw new Error('Не могу получить путь папки лаунчера в браузере!');
        }

        debugger;

        return electron.remote.app.getPath('appData');;
    }
}

const global = new GlobalClass();

window.DBFGL = global;

export default global;