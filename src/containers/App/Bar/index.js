import React, { Component } from 'react';
import DBFGL from '@/Global';

// Components
import { AppBar } from 'material-ui';

export default class Bar extends Component {
    togglePanel = mode => {
        if (mode) DBFGL.emit('panel.open', 'left');
        else DBFGL.emit('panel.close', 'left');

    }

    render() {
        return (
            <AppBar
                title='DooM BFG Launcher'
                onLeftIconButtonClick={this.togglePanel}
            />
        );
    }
}
