import defaultConfig from '../declarations/defaultconfig.json';

const nconf = DBFGL.isNative ? window.require('nconf') : null;


if (DBFGL.isNative) {
    nconf.argv()
        .env()
        .defaults(defaultConfig)
        .file({ file: DBFGL.appData });
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
        nconf.save();
    }
};
