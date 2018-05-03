import React, { Component } from 'react';
import type from 'prop-types';

import { List, makeSelectable } from 'material-ui/List';

import Wad from './wad'; // Component
import WadClass from './wad/wad'; // Class
import getWads from './getWadsFromFs';

/* const wads = [
    new WadClass({ name: 'DOOM.WAD', picture: 'doom' }),
    new WadClass({ name: 'Doom2.wad', picture: 'doom2' })
]; */

const SelectableList = makeSelectable(List);

export default class WadController extends Component {
    static propTypes = {
        prop: type
    }

    constructor () {
        super();
        this.state = {
            selectedIndex: 0,
            wads:          []
        };
        DBFGL.on('singleplayer.wadlist.update', this.updateWads);
    }


    componentDidMount = () => {
        this.updateWads();
    }

    updateWads = () => {
        this.setState({
            wads: getWads().map((name) => new WadClass({ name }))
        });
        console.log('Список вадов обновлен');
    }

    onSelect = (event, index) => {
        console.log('onselect', index);
        this.setState({ selectedIndex: index });
    }

    render () {
        const jsxwads = this.state.wads.map((e, i) => (<Wad key = { i } value = { i } wad = { e } />));

        return (
            <SelectableList
                value = { this.state.selectedIndex }
                onChange = { this.onSelect }>
                {jsxwads}
            </SelectableList>
        );
    }
}
