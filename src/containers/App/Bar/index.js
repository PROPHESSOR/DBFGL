import React, { Component } from 'react';

// Components
import { AppBar } from 'material-ui';

export default class Bar extends Component {
    render () {
        return (
            <AppBar
                iconClassNameRight = 'muidocs-icon-navigation-expand-more'
                title = 'DooM BFG Launcher'
            />
        );
    }
}
