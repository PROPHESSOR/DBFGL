import React, { Component } from 'react';

// Components
import { AppBar } from 'material-ui';

export default class Bar extends Component {
    render () {
        return (
            <AppBar
                showMenuIconButton = { false }
                title = 'Дополнительно'
            />
        );
    }
}
