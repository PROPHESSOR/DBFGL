const { isNative } = window.DBFGL;

const cp = isNative ? window.require('child_process') : null;

class Spawner {
    constructor () {
        this.processes = new Map();
    }

    /** Спавнит процесс в
     * @param  {string} idname - Ключевое слово, для дальшейних действий с процессом
     * @param  {string} command - Команда, которую нужно выполнить
     * @returns {number} ID процесса
     */
    spawn (idname, command) {
        if (!isNative) {
            throw new Error('Не могу сделать это в браузере!');
        }

        if (this.processes.has(idname)) {
            throw new Error('Данный процесс уже запущен!');
        }

        const process = cp.spawn(command);

        this.processes.set(idname, process);

        global.DBFGL.emit('game.start', idname, process.pid);

        return process.pid;
    }

    /** Остановить запущенный процесс
     * @param  {string} idname - Ключевое слово
     * @returns {bool} Процесс остановлен?
     */
    stop (idname) {
        if (!isNative) {
            throw new Error('Не могу сделать это в браузере!');
        }

        if (!this.processes.has(idname)) {
            throw new Error('Нет такого процесса!');
        }

        const killed = this.processes.get(idname).kill();

        this.processes.delete(idname);

        global.DBFGL.emit('game.stop', idname, killed);

        return killed;
    }

    /** Убить запущенный процесс
     * @param  {string} idname - Ключевое слово
     * @returns {bool} Процесс остановлен?
     */
    kill (idname) {
        if (!isNative) {
            throw new Error('Не могу сделать это в браузере!');
        }

        if (!this.processes.has(idname)) {
            throw new Error('Нет такого процесса!');
        }

        const killed = this.processes.get(idname).kill('SIGKILL');

        this.processes.delete(idname);

        global.DBFGL.emit('game.stop', idname, killed);

        return killed;
    }
}

export default new Spawner();