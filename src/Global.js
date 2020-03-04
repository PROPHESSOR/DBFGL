// import { EventEmitter } from 'events';

const { EventEmitter } = require('events');

const isNative = !!(window && window.process && window.process.type);

const electron = isNative ? require('electron') : null;

class GlobalClass extends EventEmitter {
    constructor () {
        super();
        this.singleplayer = {
            selected: [],
            iwad:     null // new Wad
        };
        /**
         * @type {"singleplayer"|"multiplayer"}
         */
        this.tab = 'singleplayer';

        this.on('tab.change', (tab) => {
            if (!(tab === 'singleplayer' || tab === 'multiplayer')) {
                throw new TypeError('Нет такого таба!');
            }
            this.tab = tab;
        });

        this.on('window.minimize', () => {
            if (!isNative) return;
            if (this.os === 'Linux')
                electron.remote.BrowserWindow.getFocusedWindow().hide();
            else
                electron.remote.BrowserWindow.getFocusedWindow().minimize();
        });

        this.on('window.restore', () => {
            if (!isNative) return;
            if (this.os === 'Linux')
                electron.remote.BrowserWindow.getAllWindows().forEach(win => win.show());
            else
                electron.remote.BrowserWindow.getAllWindows().forEach(win => win.restore());
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

    /**
     * @returns {"Browser"|"Windows"|"Linux"|"Mac"|"Unknown"}
     */
    get os() {
        if (!isNative) return 'Browser';

        const os = require('os').type();

        switch (os) {
            case 'Linux':
                return 'Linux';
            case 'Darwin':
                return 'Mac';
            case 'Windows_NT':
                return 'Windows';
            default:
                console.warn(`[Global::os] Unknown platform ${os}!`);
                return 'Unknown';
        }
    }

    get appData () {
        if (!DBFGL.isNative) {
            throw new Error('Не могу получить путь папки лаунчера в браузере!');
        }

        const path = require('path');

        return path.join(electron.remote.app.getPath('appData'), 'doom-bfg-launcher');
    }
}

const global = new GlobalClass();

window.DBFGL = global;

export default global;