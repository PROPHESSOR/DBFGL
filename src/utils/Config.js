import defaultConfig from '../declarations/defaultconfig.json';
import DBFGL from '@/Global';
import { getIWads } from './getWadsFromFs.js';
import DoomFile from '@/classes/DoomFile.js';

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
        // Import collections
        console.log('Importing collections...');

        /**
         * @type {Array<import('@/Global.js').CollectionJSON>}
         */
        const collections = this.get('collections');
        const IWADs = getIWads();

        DBFGL.singleplayer.collections = collections
            .map(collection => ({
                name: collection.name,
                iwad: IWADs.filter(iwad => iwad.name === collection.iwad).pop(),
                wads: collection.wads.map(wadpath => new DoomFile(wadpath)),
            }));

        DBFGL.emit('singleplayer.collections.update');
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
