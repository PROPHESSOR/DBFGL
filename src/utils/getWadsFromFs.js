import Config from '@/utils/Config';

import DoomFile from '@/classes/DoomFile';
import DBFGL from '@/Global';

const fs = DBFGL.isNative ? require('fs') : null;
const path = DBFGL.isNative ? require('path') : null;

/**
 * @returns {Array<DoomFile>}
 */
export function getWads() {
    if (!DBFGL.isNative) {
        console.warn('Получение списка вадов не работает в браузере!');

        return [];
    }
    const wadPathes = Config
        .get('wads:folders')
        .map(folder => folder
            .replace('{appdata}', DBFGL.appData)
        );

    // Создаём папки, если их нет
    for (const folder of wadPathes) {
        if (fs.existsSync(folder)) continue;


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
                .forEach(file => {
                    const filename = file.split('.');

                    // Если это - .wad файл
                    if (filename[filename.length - 1].toLowerCase() === 'wad') {
                        const wad = new DoomFile({ name: file, path: path.join(folder, file) });

                        if (wadList.has(wad)) {
                            console.warn(`Конфликт файлов! Файл ${file} берется из папки ${folder}`)
                            ;
                        }
                        wadList.add(wad);
                    }
                });
        } catch (e) {
            console.error(`Не могу прочитать содержимое папки ${folder} из-за ошибки: `, e);
        }
    }

    return Array.from(wadList);

}

/**
 * @returns {Array<DoomFile>}
 */
export function getPWads() {
    const iwads = new Set(DoomFile.knownIWADs);

    return getWads().filter(wad => !iwads.has(wad.name));
}

/**
 * @returns {Array<DoomFile>}
 */
export function getIWads() {
    const iwads = new Set(DoomFile.knownIWADs);

    return getWads().filter(wad => iwads.has(wad.name));
}

export default getWads;
