import defaultConfig from '../declarations/defaultconfig.json';
import DBFGL from '@/Global';

const nconf = require('nconf');
const path = require('path');

nconf
    .argv()
    .env()
    .file({ file: path.join(DBFGL.appData, 'config.json') })
    .defaults(defaultConfig);

export default {

    /**
     *
     * @param {string} key Config ey like "wads:folders"
     * @param  {...any} args
     */
    get(key, ...args) {
        return nconf.get(key, ...args);
    },

    /**
     *
     * @param {string} key Config ey like "wads:folders"
     * @param {any} value Value to set
     * @param  {...any} args
     */
    set(key, value, ...args) {
        nconf.set(key, value, ...args);
    },

    save() {
        nconf.save(err => {
            if (!err) return console.log('Конфиг успешно сохранен!');

            throw new Error('При сохранении конфига произошла ошибка', err);
        });
    },
};
