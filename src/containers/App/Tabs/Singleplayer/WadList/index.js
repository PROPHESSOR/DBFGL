import React, { PureComponent } from 'react';
import type from 'prop-types';

import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import Wad from './wad'; // Component
// eslint-disable-next-line no-unused-vars
import DoomFile from '@/classes/DoomFile'; // Class
import { connect } from 'react-redux';
import { createBindStateToProps, createBindActToProps, storeProps } from '@/store';

export default connect(
    createBindStateToProps('singleplayer.wadlist', 'singleplayer.selected'),
    createBindActToProps()
)(
    class WadList extends PureComponent {
        static propTypes = {
            ...storeProps,
            wadlist:  type.array.isRequired,
            selected: type.array.isRequired,
            style:    type.object,
        }

        /**
         * @param {DoomFile} wad
         */
        onSelect = wad => { // (wad, index)
            const { act, actions } = this.props;

            act(actions.singleplayer_wadlist_selected_add, wad);
        }

        render() {
            const selected = new Set(this.props.selected);

            const jsxwads = this.props.wadlist
                .filter(wad => !selected.has(wad))
                .map(wad => (<Wad key={wad.name} wad={wad} onClick={this.onSelect} />));

            return (
                <List
                    style={{ ...this.props.style, height: '-webkit-fill-available' }}>
                    <Subheader>Все WAD&apos;ы:</Subheader>
                    {jsxwads}
                </List>
            );
        }
    }
);
