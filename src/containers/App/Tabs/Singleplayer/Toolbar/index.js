import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, /* ToolbarSeparator, */ ToolbarTitle } from 'material-ui/Toolbar';

export default class ToolbarSingleplayer extends React.Component {

    state = {
        showDrop: 3,
        sortDrop: 1
    };

    handleChange = (event, index, value) => this.setState({ value });

    render () {
        return (
            <Toolbar>
                <ToolbarGroup firstChild >
                    <DropDownMenu value = { this.state.showDrop } onChange = { this.handleChange }>
                        <MenuItem primaryText = 'Мои коллекции' value = { 1 } />
                        <MenuItem primaryText = 'Все вады' value = { 2 } />
                        <MenuItem primaryText = 'История' value = { 3 } />
                        {/* <MenuItem primaryText = 'Complete Voice' value = { 4 } />
                     <MenuItem primaryText = 'Complete Text' value = { 5 } />
                     <MenuItem primaryText = 'Active Voice' value = { 6 } />
                     <MenuItem primaryText = 'Active Text' value = { 7 } /> */}
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <FontIcon className = 'muidocs-icon-custom-sort' />
                    {/* <ToolbarSeparator /> */}
                    <RaisedButton primary label = 'Создать коллекцию' />
                    <ToolbarTitle text = 'Сортировка' />
                    <DropDownMenu value = { this.state.sortDrop } onChange = { this.handleChange }>
                        <MenuItem primaryText = 'по имени' value = { 1 } />
                        <MenuItem primaryText = 'по дате' value = { 2 } />
                    </DropDownMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
