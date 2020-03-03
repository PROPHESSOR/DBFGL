import React from 'react';
import DBFGL from '@/Global';

import PortClass from './port';

// import Bar from './Bar';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Port from './Port';
import Config from '../../../utils/Config';



const knownPorts = Object.values(Config.get('ports'))
    .map(port => new PortClass({
        name: port.name,
        description: port.description,
        path: port.path,
        argformat: port.argformat,
    }));

export default class Panel extends React.Component {
    constructor() {
        super();

        this.state = {
            open: false
        };

        DBFGL.on('panel.open', (panel) => {
            if (panel === 'right') {
                this.setState({ open: true });
            }
        });
        DBFGL.on('panel.close', (panel) => {
            if (panel === 'right') {
                this.setState({ open: false });
            }
        });
    }

    togglePanel = (mode) => {
        if (mode) {
            DBFGL.emit('panel.open', 'right');
        } else {
            DBFGL.emit('panel.close', 'right');
        }
    }
    render() {
        const ports = knownPorts.map((el, i) => <Port key={i} port={el} />);

        return (
            <Drawer
                openSecondary
                docked={false}
                open={this.state.open}
                onRequestChange={this.togglePanel}>
                <AppBar
                    showMenuIconButton={false}
                    title='Выбор порта'
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
