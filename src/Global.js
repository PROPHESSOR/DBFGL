// import { EventEmitter } from 'events';

const { EventEmitter } = require('events');

const isNative = Boolean(window && window.process && window.process.type);

const electron = isNative ? require('electron') : null;

// Когда хочешь использовать IntelliSense, но лень переходить на TypeScript =D
/**
 * @typedef {
            "tab.change"|
            "window.minimize"|"window.restore"|"window.close"|"window.open"|
            "panel.open"|"panel.close"|
            "singleplayer.wadlist.selected.update"|"singleplayer.wadlist.iwad.update"|"singleplayer.wadlist.update"|
            "game.start"|"game.stop"|"game.kill"|
            "notification.alert"|"notification.prompt"|"notification.confirm"|"notification.toast"
        } GlobalEvents
 */

class GlobalClass extends EventEmitter {
    constructor() {
        super();
        this.singleplayer = {
            selected: [],

            /**
             * path to iwad // TODO: Make it <Wad>
             * @type {string}
             */
            iwad: null,
        };

        /**
         * @type {"singleplayer"|"multiplayer"}
         */
        this.tab = 'singleplayer';

        this.on('tab.change', tab => {
            if (!(tab === 'singleplayer' || tab === 'multiplayer')) throw new TypeError('Нет такого таба!');

            this.tab = tab;
        });

        this.on('window.minimize', () => {
            if (!isNative) return;
            if (this.os === 'Linux') electron.remote.BrowserWindow.getFocusedWindow().hide();
            else electron.remote.BrowserWindow.getFocusedWindow().minimize();

        });

        this.on('window.restore', () => {
            if (!isNative) return;

            if (this.os === 'Linux') electron.remote.BrowserWindow.getAllWindows().forEach(win => win.show());
            else electron.remote.BrowserWindow.getAllWindows().forEach(win => win.restore());

        });

        this._notifblock = false;
    }

    /**
     * Usage: await DBFGL.alert({title?, text?});
     * @param {object} options
     * @param {string} [options.title] - Заголовок
     * @param {string} [options.text] - Текст
     * @returns {undefined}
     */
    alert({ title='Сообщение', text='Нажмите Ок, чтобы продолжить' }) {
        if (this._notifblock) throw new Error('На экране уже присутствует модальное окно!');

        return new Promise(res => {
            this.emit('notification.alert', { title, text });
            this._notifblock = true;

            this.once('notification.alert.closed', () => {
                this.removeAllListeners('notification.alert.closed');
                this._notifblock = false;

                return res();
            });
        });
    }

    /**
     * Usage: const result: boolean = await DBFGL.confirm({title?, text?});
     * @param {object} options
     * @param {string} [options.title] - Заголовок
     * @param {string} [options.title] - Заголовок
     * @param {string} [options.text] - Текст
     * @returns {boolean}
     */
    confirm({ title='Ввод текста', text='Подтвердите действие' }) {
        if (this._notifblock) throw new Error('На экране уже присутствует модальное окно!');

        return new Promise(res => {
            this.emit('notification.confirm', { title, text });
            this._notifblock = true;

            this.once('notification.confirm.ok', () => {
                this.removeAllListeners('notification.confirm.ok');
                this.removeAllListeners('notification.confirm.cancel');
                this._notifblock = false;

                return res(true);
            });

            this.once('notification.confirm.cancel', () => {
                this.removeAllListeners('notification.confirm.ok');
                this.removeAllListeners('notification.confirm.cancel');
                this._notifblock = false;

                return res(false);
            });
        });
    }

    /**
     * Usage: const result: (string|null) = await DBFGL.prompt({title?, placeholder?, defaultValue?});
     * @param {object} options
     * @param {string} [options.title] - Заголовок
     * @param {string} [options.placeholder] - Подсказка для ввода
     * @param {string} [options.defaultValue] - Значение по умолчанию
     * @returns {string|null}
     */
    prompt({ title='Ввод текста', placeholder='Писать сюда', defaultValue='' }) {
        if (this._notifblock) throw new Error('На экране уже присутствует модальное окно!');

        return new Promise(res => {
            this.emit('notification.prompt', { title, placeholder, defaultValue });
            this._notifblock = true;

            this.once('notification.prompt.ok', value => {
                this.removeAllListeners('notification.prompt.ok');
                this.removeAllListeners('notification.prompt.cancel');
                this._notifblock = false;

                return res(value);
            });

            this.once('notification.prompt.cancel', () => {
                this.removeAllListeners('notification.prompt.ok');
                this.removeAllListeners('notification.prompt.cancel');
                this._notifblock = false;

                return res(null);
            });
        });
    }

    /**
     * Subscribe to Global Event
     * @param {GlobalEvents} event
     * @param {(...args: any[]) => void} listener
     * @returns {this}
     */
    on(event, listener) {
        super.on(event, listener);

        return this;
    }

    /**
     * Fire Global Event
     * @param  {GlobalEvents} event
     */
    emit(event, ...payload) {
        console.log('Emit', event, payload); // Uncomment for event debugging
        super.emit(event, ...payload);
    }

    get isNative() {
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

    get appData() {
        if (!isNative) throw new Error('Не могу получить путь папки лаунчера в браузере!');


        const path = require('path');

        return path.join(electron.remote.app.getPath('appData'), 'doom-bfg-launcher');
    }
}

const global = new GlobalClass();

window.DBFGL = global;

export default global;
