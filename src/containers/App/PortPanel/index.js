import React from 'react';
import DBFGL from '@/Global';

import PortClass from '@/classes/port';

// import Bar from './Bar';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Port from './Port';
import Config from '../../../utils/Config';

const knownPorts = Object.values(Config.get('ports'));

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
        const availablePorts = DBFGL.tab === 'singleplayer'
            ? knownPorts
            : knownPorts.filter(port => port.supportZandronumServers);

        const ports = availablePorts.map((el, i) => <Port key={i} port={el} />)

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
            </Drawer>
        );
    }
}
