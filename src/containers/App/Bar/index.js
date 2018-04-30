import React, { Component } from 'react';
import type from 'prop-types';

// Components
import { AppBar } from 'material-ui';

import SettingsIcon from 'material-ui/svg-icons/action/settings';

export default class Bar extends Component {
    togglePanel = (mode) => {
        if (mode) {
            DBFGL.emit('panel.open', 'left');
        } else {
            DBFGL.emit('panel.close', 'left');
        }
    }

    render () {
        return (
            <AppBar
                iconClassNameRight = { SettingsIcon }
                title = 'DooM BFG Launcher'
                onLeftIconButtonClick = { this.togglePanel }
            />
        );
    }
}
