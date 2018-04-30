import nconf from 'nconf';

import defaultConfig from '../declarations/defaultconfig.json';

nconf.argv()
    .env()
    .defaults(defaultConfig);

if (DBFGL.isNative) {
    nconf.file({ file: DBFGL.appData });
}


export default {
    get (...args) {

        /* if (!DBFGL.isNative) {
            throw new Error('Я не могу работать с файлом конфигурации из браузера!');
        } */
        return nconf.get(...args);
    },
    set (...args) {

        /* if (!DBFGL.isNative) {
            throw new Error('Я не могу работать с файлом конфигурации из браузера!');
        } */
        nconf.set(...args);
    },
    save () {

        if (!DBFGL.isNative) {
            throw new Error('Я не могу работать с файлом конфигурации из браузера!');
        }
        nconf.save();
    }
};
