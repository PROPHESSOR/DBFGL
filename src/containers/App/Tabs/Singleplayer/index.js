import React, { Component } from 'react';

import DBFGL from '@/Global';

import Toolbar from './Toolbar';
import WadController from './WadController';
import SelectedWads from './SelectedWads';

export default class Singleplayer extends Component {
    constructor () {
        super();
        this.state = {
            showDrop: 1,
            sortDrop: 0,
            iwadDrop: 'doom2.wad',

            // Split
        };
        DBFGL.on('singleplayer.split', (split) => {
            //
        });
    }

    onChangeShow = (event, index, value) => this.setState({ showDrop: value });
    onChangeSort = (event, index, value) => this.setState({ sortDrop: value });
    onChangeIwad = (event, index, value) => this.setState({ iwadDrop: value });

    render () {
        return (
            <div
                style = { {
                    height: 'calc(100vh - 110px)' // FIXME: Это что за хрень?
                } }>
                <Toolbar
                    showDrop = { this.state.showDrop }
                    sortDrop = { this.state.sortDrop }
                    iwadDrop = {this.state.iwadDrop}
                    onChangeShow = { this.onChangeShow }
                    onChangeSort = { this.onChangeSort }
                    onChangeIwad = { this.onChangeIwad }
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
