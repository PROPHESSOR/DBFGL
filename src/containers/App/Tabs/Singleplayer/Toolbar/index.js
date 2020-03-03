import React from 'react';
import type from 'prop-types';

import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, /* ToolbarSeparator, */ ToolbarTitle } from 'material-ui/Toolbar';
import Wad from '../WadController/wad/wad';

export default class ToolbarSingleplayer extends React.Component {
    static propTypes = {
        showDrop: type.number.isRequired,
        sortDrop: type.number.isRequired,
        iwadDrop: type.string.isRequired,
        onChangeShow: type.func.isRequired,
        onChangeSort: type.func.isRequired,
        onChangeIwad: type.func.isRequired,
    }

    render() {
        const {
            showDrop, sortDrop, iwadDrop,
            onChangeShow, onChangeSort, onChangeIwad } = this.props;

        const iwads = Wad.knownIWADs.map(iwad => <MenuItem primaryText={iwad} value={iwad} />) // TODO: Только найденные

        return (
            <Toolbar>
                <ToolbarGroup firstChild >
                    <DropDownMenu value={showDrop} onChange={onChangeShow}>
                        <MenuItem primaryText='Мои коллекции' value={0} />
                        <MenuItem primaryText='Все вады' value={1} />
                        <MenuItem primaryText='История' value={2} />
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <FontIcon className='muidocs-icon-custom-sort' />
                    {/* <ToolbarSeparator /> */}
                    <RaisedButton primary label='Создать коллекцию' />
                    <ToolbarTitle text='Сортировка' />
                    <DropDownMenu value={sortDrop} onChange={onChangeSort}>
                        <MenuItem primaryText='по имени' value={0} />
                        <MenuItem primaryText='по дате' value={1} />
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <FontIcon className='muidocs-icon-custom-sort' />
                    <ToolbarTitle text='IWAD' />
                    <DropDownMenu value={iwadDrop} onChange={onChangeIwad}>
                        {iwads}
                    </DropDownMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
