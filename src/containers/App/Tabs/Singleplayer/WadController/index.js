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

    state = {
        selectedIndex: 0,
        wads:          []
    }

    componentDidMount = () => {
        this.setState({ wads: getWads().map((filename) => new WadClass({ name: filename })) });
    }

    onSelect = (event, index) => {
        console.log('onselect', index);
        this.setState({ selectedIndex: index });
    }

    render () {
        const jsxwads = this.state.wads.map((e, i) => (<Wad key = { i } name = { e.name } picture = { e.picture } value = { i } />));

        return (
            <SelectableList
                value = { this.state.selectedIndex }
                onChange = { this.onSelect }>
                {jsxwads}
            </SelectableList>
        );
    }
}
