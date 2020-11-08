import defaultConfig from '../declarations/defaultconfig.js';
import DBFGL from '@/Global';

const nconf = require('nconf');
const path = require('path');

class Config {
    constructor() {
        nconf
            .argv()
            .env()
            .file({ file: path.join(DBFGL.appData, 'config.json') })
            .defaults(defaultConfig);

        this.nconf = nconf;

        DBFGL.on('ready', () => this.init());
    }

    /**
     * Loads initial data from config to DBFGL
     */
    init() {

    }

    /**
     *
     * @param {string} key Config ey like "wads:folders"
     * @param  {...any} args
     */
    get(key, ...args) {
        return nconf.get(key, ...args);
    }

    /**
     *
     * @param {string} key Config ey like "wads:folders"
     * @param {any} value Value to set
     * @param  {...any} args
     */
    set(key, value, ...args) {
        nconf.set(key, value, ...args);
    }

    save() {
        nconf.save(err => {
            if (!err) return console.log('Конфиг успешно сохранен!');

            throw new Error('При сохранении конфига произошла ошибка', err);
        });
    }
}

export default new Config();
