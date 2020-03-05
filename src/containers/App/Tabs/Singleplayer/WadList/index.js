import React, { Component } from 'react';
import type from 'prop-types';

import DBFGL from '@/Global';

import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import Wad from './wad'; // Component
// eslint-disable-next-line no-unused-vars
import DoomFile from '@/classes/DoomFile'; // Class
import { getZDoomLaunchFilesWithoutIWads } from '@/utils/getWadsFromFs';

export default class WadList extends Component {
    static propTypes = {
        style: type.object,
    }

    constructor() {
        super();
        this.state = {
            selectedIndex: 0,

            /**
             * @type {Array<DoomFile>}
             */
            wads: [],
        };
        DBFGL.on('singleplayer.wadlist.update', this.updateWads);
        DBFGL.on('singleplayer.wadlist.selected.update', this.forceUpdate); // FIXME: Используется для отлавливания изменений в WadClass.selected
    }

    componentDidMount = () => {
        this.updateWads();
    }

    componentWillUnmount() {
        DBFGL.removeListener('singleplayer.wadlist.update', this.updateWads);
        DBFGL.removeListener('singleplayer.wadlist.selected.update', this.forceUpdate);
    }

    updateWads = () => {
        this.setState({ // FIXME: Мне кажется, или здесь дикий перерасход ресурсов? :/
            wads: getZDoomLaunchFilesWithoutIWads(), //.map((name) => new WadClass({ name }))
        });
        console.log('Список вадов обновлен');
    }

    forceUpdate = () => super.forceUpdate();

    /**
     * @param {DoomFile} wad
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
                style={{ ...this.props.style, height: '-webkit-fill-available' }}
                value={this.state.selectedIndex} // FIXME: Зачем?
                onChange={this.onSelect}>
                <Subheader>Все WAD&apos;ы:</Subheader>
                {jsxwads}
            </List>
        );
    }
}
