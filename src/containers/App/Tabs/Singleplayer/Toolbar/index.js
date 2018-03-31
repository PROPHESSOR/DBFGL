import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

export default class ToolbarSingleplayer extends React.Component {

 state = {
     value: 3
 };

 handleChange = (event, index, value) => this.setState({ value });

 render () {
     return (
         <Toolbar>
             <ToolbarGroup firstChild >
                 <DropDownMenu value = { this.state.value } onChange = { this.handleChange }>
                     <MenuItem primaryText = 'All Broadcasts' value = { 1 } />
                     <MenuItem primaryText = 'All Voice' value = { 2 } />
                     <MenuItem primaryText = 'All Text' value = { 3 } />
                     <MenuItem primaryText = 'Complete Voice' value = { 4 } />
                     <MenuItem primaryText = 'Complete Text' value = { 5 } />
                     <MenuItem primaryText = 'Active Voice' value = { 6 } />
                     <MenuItem primaryText = 'Active Text' value = { 7 } />
                 </DropDownMenu>
             </ToolbarGroup>
             <ToolbarGroup>
                 <ToolbarTitle text = 'Options' />
                 <FontIcon className = 'muidocs-icon-custom-sort' />
                 <ToolbarSeparator />
                 <RaisedButton primary label = 'Create Broadcast' />
                 <IconMenu
                     iconButtonElement = {
                         <IconButton touch >
                             <NavigationExpandMoreIcon />
                         </IconButton>
                     }>
                     <MenuItem primaryText = 'Download' />
                     <MenuItem primaryText = 'More Info' />
                 </IconMenu>
             </ToolbarGroup>
         </Toolbar>
     );
 }
}
