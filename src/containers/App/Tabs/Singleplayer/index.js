import React, { Component } from 'react';
import type from 'prop-types';

import Toolbar from './Toolbar';

export default class Singleplayer extends Component {
    static propTypes = {}

    state = {
        showDrop: 0,
        sortDrop: 0
    };

    onChangeShow = (event, index, value) => this.setState({ showDrop: value });
    onChangeSort = (event, index, value) => this.setState({ sortDrop: value });

    render () {
        return (
            <Toolbar
                showDrop = { this.state.showDrop }
                sortDrop = { this.state.sortDrop }
                onChangeShow = { this.onChangeShow }
                onChangeSort = { this.onChangeSort }
            />
        );
    }
}
