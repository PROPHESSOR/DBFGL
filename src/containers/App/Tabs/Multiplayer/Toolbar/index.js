import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

export default class ToolbarMultiplayer extends React.Component {

 state = {
     value: 3
 };

 handleChange = (event, index, value) => this.setState({ value });

 render () {
     return (
         <Toolbar>
             <ToolbarGroup firstChild >
                 <DropDownMenu value = { this.state.value } onChange = { this.handleChange }>
                     <MenuItem primaryText = 'Все сервера' value = { 1 } />
                     <MenuItem primaryText = 'Cooperative' value = { 2 } />
                     <MenuItem primaryText = 'Survival' value = { 3 } />
                     <MenuItem primaryText = 'Deathmatch' value = { 4 } />
                     <MenuItem primaryText = 'Duel' value = { 5 } />
                     <MenuItem primaryText = 'Invasion' value = { 6 } />
                     <MenuItem primaryText = 'CTF' value = { 7 } />
                 </DropDownMenu>
             </ToolbarGroup>
             <ToolbarGroup>
                 <FontIcon className = 'muidocs-icon-custom-sort' />
                 {/* <ToolbarSeparator /> */}
                 <RaisedButton primary label = 'Создать сервер' />
                 <ToolbarTitle text = 'Отображение: ' />
                 <IconMenu
                     iconButtonElement = {
                         <IconButton touch >
                             <NavigationExpandMoreIcon />
                         </IconButton>
                     }>
                     <MenuItem primaryText = 'Все' />
                     <MenuItem primaryText = 'Коротко' />
                 </IconMenu>
             </ToolbarGroup>
         </Toolbar>
     );
 }
}
