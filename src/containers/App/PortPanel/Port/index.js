import React, { Component } from 'react';
import type from 'prop-types';

import DBFGL from '@/Global';
import Spawner from '../../../../utils/Spawner';

import MenuItem from 'material-ui/MenuItem';

export default class Port extends Component {
    static propTypes = {
        port: type.func.isRequired
    }

    run = () => {
        const { port } = this.props;

        let args = port.path;

        for (const wad of DBFGL.singleplayer.selected) {
            args += ` -file "${wad.path}"`;
        }

        console.log(`Запускаю ${port.name}...`, args);

        console.log(Spawner.spawn('game', args));
    }

    render () {
        const { port } = this.props;

        return (
            <MenuItem onClick = { this.run }>{port.name}</MenuItem>
        );
    }
}
