import React, { Component, Fragment } from 'react';
import Config from '../../../../utils/Config';
import DBFGL from '@/Global';

import FlatButton from 'material-ui/FlatButton';
import SPort from './Port';

export default class SettingsPorts extends Component {
    state = {
        ports: [],
    }

    componentDidMount = () => {
        this.setState({
            ports: Config.get('ports'),
        });
    }

    addPort() {
        console.log('addPort');
    }

    changePort = (index, diff) => {
        this.setState({
            ports: this.state.ports.map((port, idx) => idx === index ? { ...this.state.ports[idx], ...diff } : port),
        });
    }

    savePorts = () => {
        Config.set('ports', this.state.ports);
        Config.save();
        DBFGL.emit('notification.toast', 'Настройки портов успешно сохранены!');
        DBFGL.emit('window.close', 'settings');
    }

    render() {
        const { ports } = this.state;
        const jsxPorts = [];

        for (const [index, port] of ports.entries()) {
            jsxPorts.push(
                <SPort port={port} key={port.name + index} onChange={diff => this.changePort(index, diff)} />
            );
        }

        return (
            <Fragment>
                {jsxPorts}
                <FlatButton
                    primary
                    fullWidth
                    disabled
                    label='Добавить порт'
                    onClick={this.addPort}
                />
                <FlatButton
                    primary
                    fullWidth
                    label='Сохранить'
                    onClick={this.savePorts}
                />
            </Fragment>
        );
    }
}
