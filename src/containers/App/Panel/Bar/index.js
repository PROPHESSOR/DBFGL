import React, { Component } from 'react';
import type from 'prop-types';

// Components
import { AppBar } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class Bar extends Component {
    static propTypes = {
        togglePanel: type.func.isRequired
    }

    close = () => {
        this.props.togglePanel(false);
    }

    render () {
        return (
            <AppBar
                iconClassNameRight = 'muidocs-icon-navigation-expand-more'
                iconElementLeft = { <IconButton><NavigationClose /></IconButton> }
                title = ''
                onLeftIconButtonClick = { this.close }
            />
        );
    }
}
