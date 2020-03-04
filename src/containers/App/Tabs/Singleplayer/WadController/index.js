import React, { Component } from 'react';
import type from 'prop-types';

import DBFGL from '@/Global';

import { List } from 'material-ui/List';

import Wad from './wad'; // Component
// eslint-disable-next-line no-unused-vars
import WadClass from '@/classes/wad'; // Class
import { getPWads } from '@/utils/getWadsFromFs';

export default class WadController extends Component {
    static propTypes = {
        folder: 'iwads',
        style:  type.object,
    }

    constructor() {
        super();
        this.state = {
            selectedIndex: 0,

            /**
             * @type {Array<WadClass>}
             */
            wads: [],
        };
        DBFGL.on('singleplayer.wadlist.update', this.updateWads);
        DBFGL.on('singleplayer.wadlist.selected.update', () => this.forceUpdate()); // FIXME: Используется для отлавливания изменений в WadClass.selected
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

    /**
     * @param {WadClass} wad
     */
    onSelect = wad => { // (wad, index)
        // console.log('onselect', wad, index);
        wad.selected = true;
        DBFGL.singleplayer.selected.push(wad);
        DBFGL.emit('singleplayer.wadlist.selected.update');
    }

    render() {
        const jsxwads = this.state.wads
            .filter(wad => !wad.selected)
            .map((wad, i) => (<Wad key={wad.name} value={i} wad={wad} onClick={this.onSelect} />));

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
