import React, { Component, Fragment } from 'react';

import Toolbar from './Toolbar';
import Servers from './Servers';

export default class Multiplayer extends Component {
    render () {
        return (
            <Fragment>
                <Toolbar />
                <Servers />
            </Fragment>
        );
    }
}
