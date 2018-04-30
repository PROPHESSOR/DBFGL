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
        this.path = '';
        this.name = 'Unknown wad';
        this.type = 'WAD';
        this.picture = 'doom';

        Object.assign(this, options);
    }
}
