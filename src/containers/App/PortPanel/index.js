import React from 'react';
import type from 'prop-types';

import PortClass from './port';

// import Bar from './Bar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Port from './Port';

const tmp = [
    new PortClass({
        'name':        'GZDoom',
        'description': '(G)ZDoom',
        'path':        'gzdoom3',
        'argformat':   'gzdoom'
    })
];

export default class Panel extends React.Component {
    static propTypes = {
        open:        type.bool.isRequired,
        togglePanel: type.func.isRequired
    }

    render () {
        const { open, togglePanel } = this.props;

        const ports = tmp.map((el, i) => <Port key = { i } port = { el } />);

        return (
            <Drawer
                openSecondary
                docked = { false }
                open = { open }
                onRequestChange = { (mode) => togglePanel(mode) }>
                <AppBar
                    showMenuIconButton = { false }
                    title = 'Выбор порта'
                />

                {ports}
                {/*<MenuItem onClick = { this.run }>GZDoom</MenuItem>
                <MenuItem onClick = { this.run }>Zandronum</MenuItem>
                <MenuItem onClick = { this.run }>QZDoom</MenuItem>
                <MenuItem onClick = { this.run }>PrBoomPlus</MenuItem>
                <MenuItem onClick = { this.run }>Retro Doom</MenuItem>
                <MenuItem onClick = { this.run }>Chocolate Doom</MenuItem>
                <MenuItem onClick = { this.run }>Doom</MenuItem>
                <MenuItem onClick = { this.run }>Doom 2</MenuItem> */}
            </Drawer>
        );
    }
}
