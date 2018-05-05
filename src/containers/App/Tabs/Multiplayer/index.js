import React, { Component } from 'react';

import Toolbar from './Toolbar';
import Servers from './Servers';

export default class Multiplayer extends Component {
    render () {
        return (
            <div
                style = { {
                    height: 'calc(100vh - 110px)'
                } }>
                <Toolbar />
                <Servers />
            </div>
        );
    }
}
