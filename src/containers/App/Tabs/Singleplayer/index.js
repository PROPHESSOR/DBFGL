import React, { Component } from 'react';

import Toolbar from './Toolbar';
import WadController from './WadController';
import SelectedWads from './SelectedWads';

export default class Singleplayer extends Component {
    constructor () {
        super();
        this.state = {
            showDrop: 1,
            sortDrop: 0

            // Split
        };
        DBFGL.on('singleplayer.split', (split) => {
            //
        });
    }

    onChangeShow = (event, index, value) => this.setState({ showDrop: value });
    onChangeSort = (event, index, value) => this.setState({ sortDrop: value });

    render () {
        return (
            <div
                style = { {
                    height: 'calc(100vh - 110px)'
                } }>
                <Toolbar
                    showDrop = { this.state.showDrop }
                    sortDrop = { this.state.sortDrop }
                    onChangeShow = { this.onChangeShow }
                    onChangeSort = { this.onChangeSort }
                />
                <WadController
                    style = { {
                        float: 'left'
                    } }
                />
                <SelectedWads
                    style = { {
                        marginLeft: '50%'
                    } }
                />
            </div>
        );
    }
}
