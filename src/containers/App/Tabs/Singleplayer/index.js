import React, { Component, Fragment } from 'react';
import type from 'prop-types';

import Toolbar from './Toolbar';
import WadController from './WadController';

export default class Singleplayer extends Component {
    static propTypes = {}

    state = {
        showDrop: 1,
        sortDrop: 0
    };

    onChangeShow = (event, index, value) => this.setState({ showDrop: value });
    onChangeSort = (event, index, value) => this.setState({ sortDrop: value });

    render () {
        return (
            <Fragment>
                <Toolbar
                    showDrop = { this.state.showDrop }
                    sortDrop = { this.state.sortDrop }
                    onChangeShow = { this.onChangeShow }
                    onChangeSort = { this.onChangeSort }
                />
                <WadController />
            </Fragment>
        );
    }
}
