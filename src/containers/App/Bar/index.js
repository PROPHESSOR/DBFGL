import React, { Component } from 'react';
import type from 'prop-types';

// Components
import { AppBar } from 'material-ui';

export default class Bar extends Component {
    static propTypes = {
        togglePanel: type.func.isRequired
    }

    render () {
        const { togglePanel } = this.props;

        return (
            <AppBar
                iconClassNameRight = 'muidocs-icon-navigation-expand-more'
                title = 'DooM BFG Launcher'
                onLeftIconButtonClick = { togglePanel }
            />
        );
    }
}
