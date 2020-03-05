import React, { Component } from 'react';
import type from 'prop-types';
import { ListItem } from 'material-ui/List';
import DBFGL from '@/Global';

import { List } from 'material-ui/List';

export default class CollectionList extends Component {
    static propTypes = {
        style: type.object,
    }

    /**
     * @param {{name: string, wads: Array<DoomFile>}} collection
     */
    onSelect = collection => { // (wad, index)
        DBFGL.singleplayer.selected.forEach(wad => wad.selected = false);
        DBFGL.singleplayer.selected = [...collection.wads];
        DBFGL.emit('singleplayer.wadlist.selected.update');
    }

    render() {
        const collectinos = DBFGL.singleplayer.collections
            .map((collection, i) => (<ListItem key={i} style={{ userSelect: 'none' }} primaryText={collection.name} onClick={() => this.onSelect(collection)} />));

        return (
            <List
                style={{ ...this.props.style, height: '-webkit-fill-available' }}
                onChange={this.onSelect}>
                {collectinos}
            </List>
        );
    }
}
