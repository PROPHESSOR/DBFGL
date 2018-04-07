import React from 'react';
import type from 'prop-types';

import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, /* ToolbarSeparator, */ ToolbarTitle } from 'material-ui/Toolbar';

export default class ToolbarSingleplayer extends React.Component {
    static propTypes = {
        showDrop:     type.number.isRequired,
        sortDrop:     type.number.isRequired,
        onChangeShow: type.func.isRequired,
        onChangeSort: type.func.isRequired
    }

    render () {
        const { showDrop, sortDrop, onChangeShow, onChangeSort } = this.props;

        return (
            <Toolbar>
                <ToolbarGroup firstChild >
                    <DropDownMenu value = { showDrop } onChange = { onChangeShow }>
                        <MenuItem primaryText = 'Мои коллекции' value = { 0 } />
                        <MenuItem primaryText = 'Все вады' value = { 1 } />
                        <MenuItem primaryText = 'История' value = { 2 } />
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <FontIcon className = 'muidocs-icon-custom-sort' />
                    {/* <ToolbarSeparator /> */}
                    <RaisedButton primary label = 'Создать коллекцию' />
                    <ToolbarTitle text = 'Сортировка' />
                    <DropDownMenu value = { sortDrop } onChange = { onChangeSort }>
                        <MenuItem primaryText = 'по имени' value = { 0 } />
                        <MenuItem primaryText = 'по дате' value = { 1 } />
                    </DropDownMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
