import React, { PureComponent } from 'react';
import type from 'prop-types';

import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Wad from '../WadList/wad'; // Component
// eslint-disable-next-line no-unused-vars
import DoomFile from '@/classes/DoomFile'; // Class
import { connect } from 'react-redux';
import { createBindStateToProps, createBindActToProps, storeProps } from '@/store';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
};

export default connect(
    createBindStateToProps('singleplayer.selected'),
    createBindActToProps(),
)(
    class SelectedWads extends PureComponent {
        static propTypes = {
            ...storeProps,
            selected: type.array.isRequired,
            style:    type.object,
        }

        /**
         * @param {DoomFile} wad
         */
        remove = wad => {
            const { act, actions, selected } = this.props;

            act(actions.singleplayer_wadlist_selected_update,
                selected.filter(selwad => selwad !== wad));
        }

        onDragEnd = result => {
            if (!result.destination) return;

            const { selected, act, actions } = this.props;

            const wads = reorder(
                selected,
                result.source.index,
                result.destination.index
            );

            act(actions.singleplayer_wadlist_selected_update, wads);
        }

        render() {
            const jsxwads = this.props.selected.map((wad, i) => (<Draggable key={wad.name} index={i} draggableId={wad.name}>
                {provided => (<div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <Wad wad={wad} cursor='move' onClick={this.remove} />
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
);
