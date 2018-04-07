import React, { Component } from 'react';
import type from 'prop-types';

// Components
import { AppBar } from 'material-ui';

import SettingsIcon from 'material-ui/svg-icons/action/settings';

export default class Bar extends Component {
    static propTypes = {
        togglePanel: type.func.isRequired
    }

    render () {
        const { togglePanel } = this.props;

        return (
            <AppBar
                iconClassNameRight = { SettingsIcon }
                title = 'DooM BFG Launcher'
                onLeftIconButtonClick = { togglePanel }
            />
        );
    }
}
