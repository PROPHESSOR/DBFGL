import React, { Component } from 'react';
import type from 'prop-types';
import DBFGL from '@/Global';

import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Wad from '../WadList/wad'; // Component
// eslint-disable-next-line no-unused-vars
import DoomFile from '@/classes/DoomFile'; // Class

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
};

export default class SelectedWads extends Component {
    static propTypes = {
        style: type.object,
    }

    constructor() {
        super();
        this.state = {
            wads: [],
        };
        DBFGL.on('singleplayer.wadlist.selected.update', this.updateWads);
    }


    componentDidMount = () => {
        this.updateWads();
    }

    componentWillUnmount() {
        DBFGL.removeListener('singleplayer.wadlist.selected.update', this.updateWads);
    }

    updateWads = () => {
        this.setState({
            wads: DBFGL.singleplayer.selected, //.map((name) => new WadClass({ name }))
        });
        console.log('Список вадов обновлен');
    }

    /**
     * @param {DoomFile} wad
     */
    remove = wad => {
        wad.selected = false;
        DBFGL.singleplayer.selected = DBFGL.singleplayer.selected.filter(selwad => selwad !== wad);
        DBFGL.emit('singleplayer.wadlist.selected.update');
    }

    onDragEnd = result => {
        if (!result.destination) return;

        const wads = reorder(
            DBFGL.singleplayer.selected,
            result.source.index,
            result.destination.index
        );

        DBFGL.singleplayer.selected = wads;
        DBFGL.emit('singleplayer.wadlist.selected.update');
    }

    render() {
        const jsxwads = this.state.wads.map((wad, i) => (<Draggable key={wad.name} index={i} draggableId={wad.name}>
            {provided => (<div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                <Wad value={i} wad={wad} onClick={this.remove} />
            </div>)}
        </Draggable>));

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <List style={this.props.style}>
                    <Subheader>Выбранные WAD&apos;ы:</Subheader>
                    <Droppable droppableId='1'>
                        {provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                {jsxwads}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </List>
            </DragDropContext >
        );
    }
}
