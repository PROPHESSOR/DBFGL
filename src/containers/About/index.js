import React from 'react';

import DBFGL from '@/Global';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const { version } = require('../../../package.json');

export default class About extends React.Component {
    constructor() {
        super();

        this.state = {
            open: false,
        };

        DBFGL.on('window.open', name => {
            if (name === 'about') this.setState({ open: true });

        });

        DBFGL.on('window.close', name => {
            if (name === 'about') this.setState({ open: false });

        });
    }

    close = () => {
        DBFGL.emit('window.close', 'about');
    };

    render() {
        const actions = [
            <FlatButton
                primary
                key='0'
                label='Закрыть'
                onClick={this.close}
            />,
        ];

        return (
            <Dialog
                autoScrollBodyContent
                actions={actions}
                modal={false}
                open={this.state.open}
                title='О программе'
                onRequestClose={this.close}>
                <h3>DooM BFG Launcher v{version}: <i>DBFGL is a DooM Launcher!</i></h3><br /><br />
                <b>DBFGL</b> - графический лаунчер для организации и запуска различных портов DOOM.<br />
                Написан на JavaScript с использованием ReactJS.<br />
                Поддерживает множество стандартных (*ZDoom, Zandronum, PrBoom+, Chocolate Doom, Doom Retro, e.t.c.) и пользовательских портов, включая несколько версий одного порта.<br />
                Может использоваться для поиска и подключения к Zandronum серверам.<br />
                <br />
                Авторы:<br />
                <ul>
                    <li><b>PROPHESSOR</b> - Автор идеи, главный разработчик</li>
                    <li><b>UsernameAK</b> - Разработчик Multiplayer раздела</li>
                    <li><b>Morthimer McMare</b> - Помощь в разработке</li>
                    <li><b>pirki</b> - Иконка</li>
                </ul>
                Технологии:<br />
                <ul>
                    <li>ElectronJS</li>
                    <li>ReactJS</li>
                    <li>MaterialUI</li>
                    <li>dmaster (Copyright (C) 2013  Alex Mayfield)</li>
                </ul>
            </Dialog>
        );
    }
}
