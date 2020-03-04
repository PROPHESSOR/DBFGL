import React, { Component } from 'react';
import type from 'prop-types';

import PortClass from '@/classes/port';

import DBFGL from '@/Global';
import Spawner from '@/utils/Spawner';

import MenuItem from 'material-ui/MenuItem';

/**
 * @typedef {object} ArgFormat
 * @property {string} full - "{iwad} {wads}..."
 * @property {string} iwad
 * @property {string} wads
 * @property {string} host
 * @property {string} join
 * @property {string} port
 * @property {string} flags
 * @property {string} other
 */

export default class Port extends Component {
    static propTypes = {
        port: type.func.isRequired
    }

    run = () => {
        DBFGL.emit('panel.close', 'right');

        const { port } = this.props;

        const args = [];

        /**
         * @type {ArgFormat}
         */
        const argformat = PortClass.argFormat(port.argformat);

        if (!DBFGL.singleplayer.iwad) throw new Error('No IWAD selected!');

        args.push(argformat.iwad, DBFGL.singleplayer.iwad)

        for (const wad of DBFGL.singleplayer.selected) {
            args.push(argformat.wads, wad.path);
        }

        console.log(`Запускаю ${port.name}...`, args);

        console.log(Spawner.spawn('game', port.path, args));
    }

    render () {
        const { port } = this.props;

        return (
            <MenuItem onClick = { this.run }>{port.name}</MenuItem>
        );
    }
}
