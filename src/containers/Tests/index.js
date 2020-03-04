import React from 'react';
import Config from '../../utils/Config';
import DBFGL from '@/Global';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class DialogExampleScrollable extends React.Component {
    constructor() {
        super();

        this.state = {
            open: false,
        };

        DBFGL.on('window.open', name => {
            if (name === 'test') this.setState({ open: true });

        });

        DBFGL.on('window.close', name => {
            if (name === 'test') this.setState({ open: false });

        });
    }

    close = () => {
        DBFGL.emit('window.close', 'test');
    };

    getFromConfig = () => {
        const res = prompt('Что вы хотите получить?');

        if (res) alert(Config.get(res));

    }

    setToConfig = () => {
        const to = prompt('Куда сохранить');

        if (!to) return;

        const what = prompt(`Что сохранить? Сейчас там: ${Config.get(to)}`);

        if (!what) return;

        Config.set(to, what);
    }
    saveConfig = () => {
        Config.save();
    }
    openWindow = () => {
        const name = prompt('Какое окно открыть? (test)');

        if (!name) return;

        DBFGL.emit('window.open', name);
    }
    openPanel = () => {
        const name = prompt('Какую панель открыть? (left/right)');

        if (!name) return;

        DBFGL.emit('panel.open', name);
    }
    startProcess = () => {
        const name = prompt('Введите id процесса (строка):');

        if (!name) return;

        const command = prompt('Введите команду для запуска (путь к игре):');

        if (!command) return;

        DBFGL.emit('game.start', name, command);
    }
    stopProcess = () => {
        const name = prompt('Введите id процесса (строка):');

        if (!name) return;


        DBFGL.emit('game.stop', name);
    }
    killProcess = () => {
        const name = prompt('Введите id процесса (строка):');

        if (!name) return;


        DBFGL.emit('game.kill', name);
    }

    render() {
        const actions = <FlatButton
            primary
            label='Закрыть'
            onClick={this.close}
        />;

        return (
            <Dialog
                autoScrollBodyContent
                actions={actions}
                modal={false}
                open={this.state.open}
                title='Раздел тестирования'
                onRequestClose={this.close}>
                <FlatButton
                    fullWidth
                    primary
                    label='Получить данные с конфига'
                    onClick={this.getFromConfig}
                />
                <FlatButton
                    fullWidth
                    primary
                    label='Записать данные в конфиг'
                    onClick={this.setToConfig}
                />
                <FlatButton
                    fullWidth
                    primary
                    label='Сохранить конфиг'
                    onClick={this.saveConfig}
                />
                <FlatButton
                    fullWidth
                    primary
                    label='Открыть окно'
                    onClick={this.openWindow}
                />
                <FlatButton
                    fullWidth
                    primary
                    label='Открыть панель'
                    onClick={this.openPanel}
                />
                <FlatButton
                    fullWidth
                    primary
                    label='Запустить процесс'
                    onClick={this.startProcess}
                />
                <FlatButton
                    fullWidth
                    primary
                    label='Остановить процесс'
                    onClick={this.stopProcess}
                />
                <FlatButton
                    fullWidth
                    primary
                    label='Убить процесс'
                    onClick={this.killProcess}
                />
            </Dialog>
        );
    }
}
