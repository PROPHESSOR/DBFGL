import Config from '../../../../../utils/Config';
// import fs from 'fs';
const fs = DBFGL.isNative ? window.require('fs') : null;

export default function () {
    if (!DBFGL.isNative) {
        return console.warn('Получение списка вадов не работает в браузере!');
    }
    const wadPathes = Config
        .get('wads:folders')
        .map((folder) => folder
            .replace('{appdata}', DBFGL.appData)
        );

    // Создаём папки, если их нет
    for (const folder of wadPathes) {
        try {
            fs.mkdirSync(folder);
        } catch (e) {
            console.error(`Не могу создать папку по пути ${folder} из-за ошибки: `, e);
        }
    }

    const wadList = new Set();

    // Ищем вады
    for (const folder of wadPathes) {
        try {
            fs.readdirSync(folder)
                .forEach((file) => {
                    const filename = file.split('.');

                    // Если это - .wad файл
                    if (filename[filename.length - 1].toLowerCase() === 'wad') {
                        if (wadList.has(file)) {
                            console.warn(`Конфликт файлов! Файл ${file} берется из папки ${folder}`)
                            ;
                        }
                        wadList.add(file);
                    }
                });
        } catch (e) {
            console.error(`Не могу прочитать содержимое папки ${folder} из-за ошибки: `, e);
        }
    }

    return Array.from(wadList);

}
