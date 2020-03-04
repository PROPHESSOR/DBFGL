import React, { Component } from 'react';
import type from 'prop-types';
import DBFGL from '@/Global';

import { List } from 'material-ui/List';

import Wad from '../WadController/wad'; // Component
// import WadClass from './wad/wad'; // Class

export default class SelectedWads extends Component {
    static propTypes = {
        style: type.object,
    }

    constructor() {
        super();
        this.state = {
            wads: [],
        };
        DBFGL.on('singleplayer.wadlist.selected.update', this.updateWads);
    }


    componentDidMount = () => {
        this.updateWads();
    }

    updateWads = () => {
        this.setState({
            wads: DBFGL.singleplayer.selected, //.map((name) => new WadClass({ name }))
        });
        console.log('Список вадов обновлен');
    }

    remove = wad => {
        DBFGL.singleplayer.selected = DBFGL.singleplayer.selected.filter(selwad => selwad !== wad);
        DBFGL.emit('singleplayer.wadlist.selected.update');
    }

    render() {
        const jsxwads = this.state.wads.map((e, i) => (<Wad key={i} value={i} wad={e} onClick={this.remove} />));

        return (
            <List
                style={this.props.style}>
                {jsxwads}
            </List>
        );
    }
}
