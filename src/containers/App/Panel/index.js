import React from 'react';
import DBFGL from '@/Global';

import Bar from './Bar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class Panel extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            open: false,
        };

        DBFGL.on('panel.open', panel => {
            if (panel === 'left') this.setState({ open: true });

        });
        DBFGL.on('panel.close', panel => {
            if (panel === 'left') this.setState({ open: false });

        });
    }

    togglePanel = mode => {
        if (mode) DBFGL.emit('panel.open', 'left');
        else DBFGL.emit('panel.close', 'left');

    }

    openSettingsMenu = () => {
        DBFGL.emit('panel.close', 'left');
        DBFGL.emit('window.open', 'settings');
    }

    openTestMenu = () => {
        DBFGL.emit('panel.close', 'left');
        DBFGL.emit('window.open', 'test');
    }

    openAboutMenu = () => {
        DBFGL.emit('panel.close', 'left');
        DBFGL.emit('window.open', 'about');
    }

    render() {
        const { open } = this.state;

        return (
            <Drawer
                docked={false}
                open={open}
                onRequestChange={this.togglePanel}>
                <Bar />
                <MenuItem onClick={this.openSettingsMenu}>Настройки</MenuItem>
                <MenuItem onClick={this.openAboutMenu}>О программе</MenuItem>
                <MenuItem onClick={this.openTestMenu}>Тестирование</MenuItem>
            </Drawer>
        );
    }
}
