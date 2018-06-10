import React, { Component } from 'react';
import type from 'prop-types';

import { List } from 'material-ui/List';

import Wad from '../WadController/wad'; // Component
// import WadClass from './wad/wad'; // Class

export default class SelectedWads extends Component {
    static propTypes = {
        folder: 'iwads',
        style:  type.object
    }

    constructor () {
        super();
        this.state = {
            selectedIndex: 0,
            wads:          []
        };
        DBFGL.on('singleplayer.wadlist.selected.update', this.updateWads);
    }


    componentDidMount = () => {
        this.updateWads();
    }

    updateWads = () => {
        this.setState({
            wads: DBFGL.singleplayer.selected//.map((name) => new WadClass({ name }))
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
            <List
                style = { this.props.style }
                value = { this.state.selectedIndex }
                onChange = { this.onSelect }>
                {jsxwads}
            </List>
        );
    }
}
