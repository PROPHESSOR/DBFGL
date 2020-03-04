import React, { Component } from 'react';
import type from 'prop-types';

import DBFGL from '@/Global';

import { List } from 'material-ui/List';

import Wad from './wad'; // Component
// import WadClass from './wad/wad'; // Class
import { getPWads } from '@/utils/getWadsFromFs';

/* const wads = [
    new WadClass({ name: 'DOOM.WAD', picture: 'doom' }),
    new WadClass({ name: 'Doom2.wad', picture: 'doom2' })
]; */

export default class WadController extends Component {
    static propTypes = {
        folder: 'iwads',
        style:  type.object,
    }

    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
            wads:          [],
        };
        DBFGL.on('singleplayer.wadlist.update', this.updateWads);
    }


    componentDidMount = () => {
        this.updateWads();
    }

    updateWads = () => {
        this.setState({
            wads: getPWads(), //.map((name) => new WadClass({ name }))
        });
        console.log('Список вадов обновлен');
    }

    onSelect = wad => { // (wad, index)
        // console.log('onselect', wad, index);
        DBFGL.singleplayer.selected.push(wad);
        DBFGL.emit('singleplayer.wadlist.selected.update');
    }

    render() {
        const jsxwads = this.state.wads.map((e, i) => (<Wad key={i} value={i} wad={e} onClick={this.onSelect} />));

        return (
            <List
                click={this.onSelect}
                style={this.props.style}
                value={this.state.selectedIndex}
                onChange={this.onSelect}>
                {jsxwads}
            </List>
        );
    }
}
