import React from 'react';
import type from 'prop-types';

// import Bar from './Bar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

export default class Panel extends React.Component {
    static propTypes = {
        open:        type.bool.isRequired,
        togglePanel: type.func.isRequired
    }

    render () {
        const { open, togglePanel } = this.props;


        return (
            <Drawer
                openSecondary
                docked = { false }
                open = { open }
                onRequestChange = { (mode) => togglePanel(mode) }>
                <AppBar
                    title = 'Выбор порта'
                />
                <MenuItem>GZDoom</MenuItem>
                <MenuItem>Zandronum</MenuItem>
                <MenuItem>QZDoom</MenuItem>
                <MenuItem>PrBoomPlus</MenuItem>
                <MenuItem>Retro Doom</MenuItem>
                <MenuItem>Chocolate Doom</MenuItem>
                <MenuItem>Doom</MenuItem>
                <MenuItem>Doom 2</MenuItem>
            </Drawer>
        );
    }
}
