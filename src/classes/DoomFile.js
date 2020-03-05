import knownIWADs from '../declarations/knownIwads.json';
import covers from '../theme/assets/wadcovers';

export default class DoomFile {

    /**
     * @constructor
     * @param  {string}  path - Путь к wad файлу
     */
    constructor(path) {
        this.path = path;

        const filename = this.path.split(/[\\/]/g).pop();

        this.name = filename;
        this.picture = DoomFile.getIWADcoverName(this.name);
        this.selected = false;
    }

    /**
     * @returns {string} File extension like "wad"
     */
    get extension() {
        const filename = this.path.split(/[\\/]/g).pop();

        const [, extension] = filename.split('.');

        return extension.toLowerCase();
    }

    /**
     * @returns {boolean} Is it a wad file
     */
    get isWad() {
        return this.extension === 'wad';
    }

    /**
     * @returns {boolean} Is it a pk3 file
     */
    get isPk3() {
        return this.extension === 'pk3';
    }

    /**
     * @returns {boolean} Is it a pk7 file
     */
    get isPk7() {
        return this.extension === 'pk7';
    }

    /**
     * @returns {boolean} Is it a pk3 or pk7 file
     */
    get isPk() {
        return this.isPk3 || this.isPk7;
    }

    /**
     * @returns {string} Path to wad folder
     */
    get folder() {
        return this.path.slice(0, -this.name.length);
    }

    /**
     * [NOT IMPLEMENTED!]
     * @returns {boolean} Is it a IWAD, IPK3 or IPK7
     */
    get isIWad() {
        if (this.extension === 'ipk3' || this.extension === 'pk7') return true;
        if (knownIWADs.includes(this.name)) return true; // TODO: Проверять заголовок IWAD'а

        return false;
    }


    /**
     *
     * @param {string} iwad
     * @returns {string} like "doom2"
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
     * @returns {string} "like public/assets/.../doom2.jpg"
     */
    static getIWADcover(iwad) {
        return covers[DoomFile.getIWADcoverName(iwad)];
    }

    /**
     * @returns {Array<string>}
     */
    static get knownIWADs() {
        return knownIWADs;
    }
}
