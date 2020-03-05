import React, { Component } from 'react';

import DBFGL from '@/Global';

import Toolbar from './Toolbar';
import WadList from './WadList';
import SelectedWads from './SelectedWads';
import { getIWads } from '@/utils/getWadsFromFs';
import TabWads from './TabWads';
import TabCollections from './TabCollections';

export default class Singleplayer extends Component {
    constructor() {
        super();

        const iwads = getIWads();

        let defaultiwad = iwads.filter(iwad => iwad.name === 'doom2.wad')[0];

        if (!defaultiwad) defaultiwad = iwads[0];


        if (!defaultiwad) throw new Error('No IWADs found!');


        if (!DBFGL.singleplayer.iwad) {
            DBFGL.singleplayer.iwad = defaultiwad.path;
            DBFGL.emit('singleplayer.wadlist.iwad.update');
        }

        this.state = {
            iwads,
            showDrop: 1,
            sortDrop: 0,
            iwadDrop: defaultiwad.name,
        };
    }

    onChangeShow = (event, index, value) => this.setState({ showDrop: value });
    onChangeSort = (event, index, value) => this.setState({ sortDrop: value });
    onChangeIwad = (event, index, value) => {
        this.setState({ iwadDrop: value });
        const { iwads } = this.state;
        const [wad] = iwads.filter(iwad => iwad.name === value);

        DBFGL.singleplayer.iwad = wad.path;
        DBFGL.emit('singleplayer.wadlist.iwad.update', wad.path);
    };

    onCreateCollection = async() => {
        const name = await DBFGL.prompt({ title: 'Создание коллекции', placeholder: 'Введите имя для коллекции' });

        if (!name) return;

        DBFGL.singleplayer.collections.push({
            name,
            wads: [...DBFGL.singleplayer.selected],
        });
        DBFGL.emit('singleplayer.collections.update');
    }

    render() {
        return (
            <div
                style={{
                    height: 'calc(100vh - 110px)', // FIXME: Это что за хрень?
                }}>
                <Toolbar
                    iwads={this.state.iwads}
                    showDrop={this.state.showDrop}
                    sortDrop={this.state.sortDrop}
                    iwadDrop={this.state.iwadDrop}
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
