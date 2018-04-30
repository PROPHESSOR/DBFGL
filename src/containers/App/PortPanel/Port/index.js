import React, { Component } from 'react';
import type from 'prop-types';
import Spawner from '../../../../utils/Spawner';

import MenuItem from 'material-ui/MenuItem';

export default class Port extends Component {
    static propTypes = {
        port: type.func.isRequired
    }

    run = () => {
        const { port } = this.props;

        console.log(`Запускаю ${port.name}...`);

        console.log(Spawner.spawn('game', port.path));
    }

    render () {
        const { port } = this.props;

        return (
            <MenuItem onClick = { this.run }>{port.name}</MenuItem>
        );
    }
}
