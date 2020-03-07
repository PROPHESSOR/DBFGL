import defaultConfig from '../declarations/defaultconfig.json';
import DBFGL from '@/Global';

const nconf = DBFGL.isNative ? require('nconf') : null;
const path = DBFGL.isNative ? require('path') : null;

if (DBFGL.isNative) {
    nconf
        .argv()
        .env()
        .file({ file: path.join(DBFGL.appData, 'config.json') })
        .defaults(defaultConfig);
}

function checkNative() {
    if (!DBFGL.isNative) throw new Error('Я не могу работать с файлом конфигурации из браузера!');
}

export default {
    nconf,

    /**
     * @param {string} key Config key like "wads:folders"
     * @returns {Promise}
     */
    get: key => new Promise((res, rej) => {
        checkNative();

        return nconf.get(key, error => {
            if (error) return rej(error);

            return res();
        });
    }),

    /**
     * @param {string} key Config key like "wads:folders"
     * @param {*} value Value to save
     * @returns {Promise}
     */
    set: (key, value) => new Promise((res, rej) => {
        checkNative();

        nconf.set(key, value, error => {
            if (error) return rej(error);

            return res();
        });
    }),

    /**
     * @returns {Promise}
     */
    save: () => new Promise((res, rej) => {
        checkNative();

        nconf.save(err => {
            if (err) {
                console.error('При сохранении конфига произошла ошибка ', err);

                return rej(err);
            }

            console.log('Конфиг успешно сохранен!');

            return res();
        });
    }),
};
