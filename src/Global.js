import { EventEmitter } from 'events';

const isNative = !!require('fs');

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
        return false; // FIXME: Пока что, исправлены не все NW-зависимые места
        return isNative;
    }

    get appData () {
        throw new Error('Global::appData not implemented yet!');
        // if (!DBFGL.isNative) {
        //     throw new Error('Не могу получить путь папки лаунчера в браузере!');
        // }

        // return NW.App.getDataPath();
    }
}

const global = new GlobalClass();

// window.DBFGL = global;

export default global;