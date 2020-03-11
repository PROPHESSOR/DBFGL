import React, { Component } from 'react';
import type from 'prop-types';

import PortClass from '@/classes/port';

import DBFGL from '@/Global';
import Spawner from '@/utils/Spawner';

import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { createBindStateToProps, createBindActToProps, storeProps } from '@/store';

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

export default connect(
    createBindStateToProps('singleplayer.iwad', 'singleplayer.selected'),
    createBindActToProps(),
)(
    class Port extends Component {
        static propTypes = {
            ...storeProps,
            port:     type.object.isRequired,
            selected: type.array.isRequired,
            iwad:     type.object,
        }

        run = () => {
            DBFGL.emit('panel.close', 'right');

            const { port, iwad, selected } = this.props;

            const args = [];

            /**
             * @type {ArgFormat}
             */
            const argformat = PortClass.argFormat(port.argformat);

            if (!iwad) throw new Error('No IWAD selected!');


            args.push(argformat.iwad, iwad.path);

            for (const wad of selected) args.push(argformat.wads, wad.path);


            console.log(`Запускаю ${port.name}...`, args);

            console.log(Spawner.spawn('game', port.path, args));
        }

        render() {
            const { port } = this.props;

            return (
                <MenuItem onClick={this.run}>{port.name}</MenuItem>
            );
        }
    }
);
