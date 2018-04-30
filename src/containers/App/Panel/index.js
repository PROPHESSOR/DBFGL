import React from 'react';

import Bar from './Bar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class Panel extends React.Component {
    constructor () {
        super();

        this.state = {
            open: false
        };

        DBFGL.on('panel.open', (panel) => {
            if (panel === 'left') {
                this.setState({ open: true });
            }
        });
        DBFGL.on('panel.close', (panel) => {
            if (panel === 'left') {
                this.setState({ open: false });
            }
        });
    }

    togglePanel = (mode) => {
        if (mode) {
            DBFGL.emit('panel.open', 'left');
        } else {
            DBFGL.emit('panel.close', 'left');
        }
    }

    openTestMenu = () => {
        DBFGL.emit('panel.close', 'left');
        DBFGL.emit('window.open', 'test');
    }

    render () {
        const { open } = this.state;

        return (
            <Drawer
                docked = { false }
                open = { open }
                onRequestChange = { this.togglePanel }>
                <Bar />
                <MenuItem>Oblige</MenuItem>
                <MenuItem>Настройки</MenuItem>
                <MenuItem>О программе</MenuItem>
                <MenuItem onClick = { this.openTestMenu }>Тестирование</MenuItem>
            </Drawer>
        );
    }
}
