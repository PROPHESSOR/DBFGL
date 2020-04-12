import React, { PureComponent } from 'react';
import types from 'prop-types';

import DBFGL from '@/Global';

import Toolbar from './Toolbar';
import TabWads from './TabWads';
import TabCollections from './TabCollections';
import Config from '@/utils/Config';
import { connect } from 'react-redux';
import { createBindStateToProps, createBindActToProps, storeProps } from '@/store';

export default connect(
    createBindStateToProps(
        'singleplayer.iwads', 'singleplayer.wadlist', 'singleplayer.selected',
        'singleplayer.iwad', 'singleplayer.collections'),
    createBindActToProps(),
)(
    class Singleplayer extends PureComponent {
        static propTypes = {
            ...storeProps,
            iwads:       types.array.isRequired,
            wadlist:     types.array.isRequired,
            selected:    types.array.isRequired,
            collections: types.array.isRequired,
            iwad:        types.object,
        }

        constructor(props) {
            super(props);

            const { iwads, iwad, act, actions } = this.props;

            let defaultiwad = iwads.filter(curiwad => curiwad.name === 'doom2.wad')[0];

            if (!defaultiwad) defaultiwad = iwads[0];

            if (!defaultiwad) throw new Error('No IWADs found!');

            if (!iwad) act(actions.singleplayer_wadlist_iwad_update, defaultiwad);

            this.state = {
                showDrop: 1,
                sortDrop: 0,
            };

            DBFGL.on('singleplayer.update', () => {
                act(actions.singleplayer_wadlist_selected_update);
                act(actions.singleplayer_wadlist_update);
            });
        }

        onChangeShow = (event, index, value) => this.setState({ showDrop: value });
        onChangeSort = (event, index, value) => this.setState({ sortDrop: value });
        onChangeIwad = (event, index, value) => {
            const { act, actions } = this.props;

            act(actions.singleplayer_wadlist_iwad_update, value);
        };

        onCreateCollection = async() => {
            const name = await DBFGL.prompt({ title: 'Создание коллекции', placeholder: 'Введите имя для коллекции' });

            if (!name) return;

            const { iwad, collections, selected, act, actions } = this.props;

            act(actions.singleplayer_wadlist_collections_update, [...collections, {
                name,
                iwad,
                wads: [...selected],
            }]);

            Config.set('collections', collections.map(collection => ({
                name: collection.name,
                iwad: collection.iwad.name,
                wads: collection.wads.map(wadfile => wadfile.path),
            })));

            Config.save();
        }

        render() {
            const { iwads, iwad } = this.props;

            return (
                <div
                    style={{
                        height: 'calc(100vh - 110px)', // FIXME: Это что за хрень? (Исправляет высоту скроллинга)
                    }}>
                    <Toolbar
                        iwads={iwads}
                        showDrop={this.state.showDrop}
                        sortDrop={this.state.sortDrop}
                        iwadDrop={iwad ? iwad.name : 'Unknown'}
                        onChangeShow={this.onChangeShow}
                        onChangeSort={this.onChangeSort}
                        onChangeIwad={this.onChangeIwad}
                        onCreateCollection={this.onCreateCollection}
                    />
                    {
                        this.state.showDrop === 0
                            ? <TabCollections />
                            : <TabWads />
                    }
                </div>
            );
        }
    }
);
