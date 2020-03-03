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

export default {
    get (...args) {

        if (!DBFGL.isNative) {
            throw new Error('Я не могу работать с файлом конфигурации из браузера!');
        }

        return nconf.get(...args);
    },
    set (...args) {

        if (!DBFGL.isNative) {
            throw new Error('Я не могу работать с файлом конфигурации из браузера!');
        }
        nconf.set(...args);
    },
    save () {

        if (!DBFGL.isNative) {
            throw new Error('Я не могу работать с файлом конфигурации из браузера!');
        }
        nconf.save((err) => {
            if (!err) {
                return console.log('Конфиг успешно сохранен!');
            }
            throw new Error('При сохранении конфига произошла ошибка', err);
        });
    }
};
