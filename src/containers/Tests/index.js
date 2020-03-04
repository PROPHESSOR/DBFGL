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

    getFromConfig = async() => {
        this.close();
        const res = await DBFGL.prompt({ title: 'Что вы хотите получить?' });

        if (res) alert(Config.get(res));

    }

    setToConfig = async() => {
        this.close();
        const to = await DBFGL.prompt({ title: 'Куда сохранить' });

        if (!to) return;

        const what = await DBFGL.prompt({ title: `Что сохранить? Сейчас там: ${Config.get(to)}` });

        if (!what) return;

        Config.set(to, what);
    }
    saveConfig = () => {
        Config.save();
    }
    openWindow = async() => {
        this.close();
        const name = await await DBFGL.prompt({ title: 'Какое окно открыть? (test)' });

        if (!name) return;

        DBFGL.emit('window.open', name);
    }
    openPanel = async() => {
        this.close();
        const name = await DBFGL.prompt({ title: 'Какую панель открыть? (left/right)' });

        if (!name) return;

        DBFGL.emit('panel.open', name);
    }
    startProcess = async() => {
        this.close();
        const name = await DBFGL.prompt({ title: 'Введите id процесса (строка):' });

        if (!name) return;

        const command = await DBFGL.prompt({ title: 'Введите команду для запуска (путь к игре):' });

        if (!command) return;

        DBFGL.emit('game.start', name, command);
    }
    stopProcess = async() => {
        this.close();
        const name = await DBFGL.prompt({ title: 'Введите id процесса (строка):' });

        if (!name) return;


        DBFGL.emit('game.stop', name);
    }
    killProcess = async() => {
        this.close();
        const name = await DBFGL.prompt({ title: 'Введите id процесса (строка):' });

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
