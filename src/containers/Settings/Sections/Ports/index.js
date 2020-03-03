import React, { Component, Fragment } from 'react';
import Config from '../../../../utils/Config';

import Section from '../../Section';
import FlatButton from 'material-ui/FlatButton';

export default class SettingsPorts extends Component {
    state = {
        ports: []
    }

    componentDidMount = () => {
        this.setState({
            ports: Object.values(Config.get('ports')),
        });
    }

    addPort () {
        console.log('addPort');
    }

    render () {
        const { ports } = this.state;
        const jsxPorts = [];

        for (const port of ports) {
            jsxPorts.push(
                <Section
                    key = { port.name + port.path }
                    subtitle = { `Настройка порта ${port.name}` }
                    title = { port.name }>
                    <ul>
                        <li>Путь к порту: {port.path}</li>
                        <li>Поддержка pk3: {port.supportPk3.toString()}</li>
                        <li>Поддержка pk7: {port.supportPk7.toString()}</li>
                        <li>Поддержка Decorate: {port.supportDecorate.toString()}</li>
                        <li>Поддержка мультиплеера: {port.supportMultiplayer.toString()}</li>
                        <li>Поддержка 3д полов: {port.support3dFloors.toString()}</li>
                        <li>Поддержка DeHacked: {port.supportDeHacked.toString()}</li>
                        <li>Поддержка Zandronum серверов: {port.supportZandronumServers.toString()}</li>
                    </ul>
                </Section>
            );
        }

        return (
            <Fragment>
                {jsxPorts}
                <FlatButton
                    primary
                    label = 'Добавить порт'
                    onClick = { this.addPort }
                />
            </Fragment>
        );
    }
}
