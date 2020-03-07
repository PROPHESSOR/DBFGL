import React, { Component } from 'react';
import { connect } from 'react-redux';
import type from 'prop-types';
import { ListItem } from 'material-ui/List';
import DBFGL from '@/Global';

import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { createBindStateToProps, createBindActToProps, storeProps } from '@/store';

export default connect(
    createBindStateToProps('singleplayer.collections'),
    createBindActToProps(),
)(
    class CollectionList extends Component {
        static propTypes = {
            ...storeProps,
            collections: type.array.isRequired,
            style:       type.object,
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
            const { act, actions } = this.props;

            // act(actions.singleplayer_selected_clear);
            // DBFGL.singleplayer.selected.forEach(wad => wad.selected = false);
            act(actions.singleplayer_selected_update, [...collection.wads]);
            // DBFGL.singleplayer.selected = [...collection.wads];
            // DBFGL.emit('singleplayer.wadlist.selected.update');

            if (collection.iwad) {
                // DBFGL.singleplayer.iwad = collection.iwad.path;
                // DBFGL.emit('singleplayer.wadlist.iwad.update');
                act(actions.singleplayer_iwad_update, collection.iwad);
            }
        }

        forceUpdate = () => super.forceUpdate();

        render() {
            const collectinos = this.props.collections
                .map((collection, i) => (<ListItem key={i} style={{ userSelect: 'none' }} primaryText={collection.name} onClick={() => this.onSelect(collection)} />));

            return (
                <List
                    style={{ ...this.props.style, height: '-webkit-fill-available' }}>
                    <Subheader>Коллекции:</Subheader>
                    {collectinos}
                </List>
            );
        }
    });
