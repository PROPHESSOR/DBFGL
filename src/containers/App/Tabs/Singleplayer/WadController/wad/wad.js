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

        switch (options.name.toLowerCase()) {
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
                this.picture = options.name.toLowerCase().split('.')[0];
                break;
            case 'freedoom.wad':
            case 'freedoom2.wad':
                this.picture = 'freedoom2';
                break;
            case 'freedoom1.wad':
                this.picture = 'freedoom';
                break;
            default:
                this.picture = 'doom';
                break;
        }

        Object.assign(this, options);
    }
}
