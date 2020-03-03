import knownIWADs from '@/declarations/knownIwads.json';
import covers from '../../../../../../theme/assets/wadcovers';

export default class Wad {

    /**
     * @constructor
     * @param  {object} options - Опции
     * @param  {string} options.path - Путь к wad файлу
     * @param  {string} options.name - Имя wad файла
     * @param  {string} options.type - Тип файла (WAD/PK3/PK7)
     * @param  {string} options.picture - (doom/doom2)
     */
    constructor (options) {
        if (!options.name) {
            options.name = 'Unknown wad';
        }
        this.path = '';
        this.type = 'WAD';

        this.picture = Wad.getIWADcoverName(options.name);

        Object.assign(this, options);
    }

    /**
     * 
     * @param {string} iwad 
     */
    static getIWADcoverName(iwad) {
        const wadname = iwad.toLowerCase();

        switch (wadname) {
            case 'doom.wad':
            case 'doom2.wad':
            case 'plutonia.wad':
            case 'tnt.wad':
            case 'chex.wad':
            case 'chex2.wad':
            case 'doom64.wad':
            case 'hacx.wad':
            case 'heretic.wad':
            case 'hexen.wad':
            case 'strife.wad':
                return wadname.split('.')[0];
            case 'freedoom.wad':
            case 'freedoom2.wad':
                return 'freedoom2';
            case 'freedoom1.wad':
                return 'freedoom';
            default:
                return 'doom';
        }
    }

    /**
     * 
     * @param {string} iwad 
     */
    static getIWADcover(iwad) {
        return covers[Wad.getIWADcoverName(iwad)];
    }

    static get knownIWADs() {
        return knownIWADs;
    }
}
