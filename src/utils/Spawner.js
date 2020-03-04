import DBFGL from '@/Global';

const { isNative } = DBFGL;

const cp = isNative ? require('child_process') : null;

class Spawner {
    constructor () {
        this.processes = new Map();

        DBFGL.on('game.start', this.spawn);
        DBFGL.on('game.stop', this.stop);
        DBFGL.on('game.kill', this.kill);
    }

    /** Спавнит процесс в
     * @param  {string} idname - Ключевое слово, для дальшейних действий с процессом
     * @param  {string} exec - Путь к исполняемому файлу
     * @param  {Array<string>} args - Аргументы
     * @returns {number} ID процесса
     */
    spawn = (idname, exec, args=[]) => {
        if (!isNative) {
            throw new Error('Не могу запустить процесс из браузера!');
        }

        if (this.processes.has(idname)) {
            throw new Error('Данный процесс уже запущен!');
        }

        DBFGL.emit('window.minimize');

        const process = cp.spawn(exec, args);

        this.processes.set(idname, process);

        process.on('exit', () => {
            this.kill(idname)
            DBFGL.emit('window.restore');
        });

        // window.DBFGL.emit('game.start', idname, process.pid);

        return process.pid;
    }

    /** Остановить запущенный процесс
     * @param  {string} idname - Ключевое слово
     * @returns {bool} Процесс остановлен?
     */
    stop = (idname) => {
        if (!isNative) {
            throw new Error('Не могу остановить процесс из браузера!');
        }

        if (!this.processes.has(idname)) {
            throw new Error('Нет такого процесса!');
        }

        const killed = this.processes.get(idname).kill();

        this.processes.delete(idname);

        // window.DBFGL.emit('game.stop', idname, killed);

        return killed;
    }

    /** Убить запущенный процесс
     * @param  {string} idname - Ключевое слово
     * @returns {bool} Процесс остановлен?
     */
    kill = (idname) => {
        if (!isNative) {
            throw new Error('Не могу убить процесс из браузера!');
        }

        if (!this.processes.has(idname)) {
            throw new Error('Нет такого процесса!');
        }

        const killed = this.processes.get(idname).kill('SIGKILL');

        this.processes.delete(idname);

        // window.DBFGL.emit('game.stop', idname, killed);

        return killed;
    }
}

export default new Spawner();
