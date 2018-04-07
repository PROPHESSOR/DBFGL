export default class Server {

    /**
     * @constructor
     * @param  {object} options - Свойства сервера
     * @param  {number} ping - Пинг до сервера
     * @param  {array} players - Массив игроков на сервере
     * @param  {string} name - Имя сервера
     * @param  {array} ip - IP-адрес сервера
     * @param  {array} wads - Массив вадов на сервере
     * @param  {string} mode - Режим игры
     * @param  {string} country - Страна
    */
    constructor (options = {}) {
        this.ping = 0;
        this.players = [];
        this.name = 'Name';
        this.ip = [0, 0, 0, 0];
        this.wads = [];
        this.mode = 'Cooperative';
        this.country = 'UA';

        Object.assign(this, options);
    }
}
