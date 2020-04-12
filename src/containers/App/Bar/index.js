import React, { PureComponent } from 'react';
import DBFGL from '@/Global';

// Components
import { AppBar, IconButton } from 'material-ui';
import { NavigationRefresh } from 'material-ui/svg-icons';

export default class Bar extends PureComponent {
    togglePanel = mode => {
        if (mode) DBFGL.emit('panel.open', 'left');
        else DBFGL.emit('panel.close', 'left');
    }

    update = () => {
        DBFGL.emit(`${DBFGL.tab}.update`);
    }

    render() {
        return (
            <AppBar
                title='DooM BFG Launcher'
                iconElementRight={<IconButton><NavigationRefresh /></IconButton>}
                onLeftIconButtonClick={this.togglePanel}
                onRightIconButtonClick={this.update}
            />
        );
    }
}
