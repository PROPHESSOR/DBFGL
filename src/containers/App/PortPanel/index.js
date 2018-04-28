import React from 'react';
import type from 'prop-types';
import Spawner from '../../../utils/Spawner';

// import Bar from './Bar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

export default class Panel extends React.Component {
    static propTypes = {
        open:        type.bool.isRequired,
        togglePanel: type.func.isRequired
    }

    run (event) {
        const port = event.target.innerText.toLowerCase();

        console.log(`Запускаю ${port}...`);
        console.log(Spawner.spawn('port', port));
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
                    showMenuIconButton = { false }
                    title = 'Выбор порта'
                />
                <MenuItem onClick = { this.run }>GZDoom</MenuItem>
                <MenuItem onClick = { this.run }>Zandronum</MenuItem>
                <MenuItem onClick = { this.run }>QZDoom</MenuItem>
                <MenuItem onClick = { this.run }>PrBoomPlus</MenuItem>
                <MenuItem onClick = { this.run }>Retro Doom</MenuItem>
                <MenuItem onClick = { this.run }>Chocolate Doom</MenuItem>
                <MenuItem onClick = { this.run }>Doom</MenuItem>
                <MenuItem onClick = { this.run }>Doom 2</MenuItem>
            </Drawer>
        );
    }
}
