import React, { Component } from 'react';
import type from 'prop-types';
import { ListItem } from 'material-ui/List';
import DBFGL from '@/Global';

import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export default class CollectionList extends Component {
    static propTypes = {
        style: type.object,
    }

    constructor() {
        super();

        DBFGL.on('singleplayer.collections.update', this.forceUpdate);
    }

    componentWillUnmount() {
        DBFGL.removeListener('singleplayer.collections.update', this.forceUpdate);
    }

    /**
     * @param {import('@/Global').Collection} collection
     */
    onSelect = collection => { // (wad, index)
        DBFGL.singleplayer.selected.forEach(wad => wad.selected = false);
        DBFGL.singleplayer.selected = [...collection.wads];
        DBFGL.emit('singleplayer.wadlist.selected.update');

        if (collection.iwad) {
            DBFGL.singleplayer.iwad = collection.iwad.path;
            DBFGL.emit('singleplayer.wadlist.iwad.update');
        }
    }

    forceUpdate = () => super.forceUpdate();

    render() {
        const collectinos = DBFGL.singleplayer.collections
            .map((collection, i) => (<ListItem key={i} style={{ userSelect: 'none' }} primaryText={collection.name} onClick={() => this.onSelect(collection)} />));

        return (
            <List
                style={{ ...this.props.style, height: '-webkit-fill-available' }}>
                <Subheader>Коллекции:</Subheader>
                {collectinos}
            </List>
        );
    }
}
