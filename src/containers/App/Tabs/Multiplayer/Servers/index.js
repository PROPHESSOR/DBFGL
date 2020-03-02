import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

import DBFGL from '@/Global';

// import Server from './Server'; //TODO:
import ServerClass from './Server/Server';
import pingServers from '../../../../../utils/Servers';

/* const servers = [
    new ServerClass({ ping: 128, players: ['PROPHESSOR'], name: 'Test server', ip: [127, 0, 0, 1], mode: 'Invasion' }),
    new ServerClass({ ping: 128, players: ['PROPHESSOR'], name: 'Test server 2', ip: [127, 0, 0, 2], mode: 'Cooperative' })
]; */

export default class ServerList extends Component {
    constructor () {
        super();
        this.state = {
            servers: []
        };

        DBFGL.on('tab.change', (tab) => {
            if (tab === 'multiplayer') {
                console.info('Обновляю сервера...');
                pingServers()
                    .then((servers) => {
                        const serverList = servers.map((server) => new ServerClass({
                            ping:    128,
                            name:    'Unknown',
                            players: ['PROPHESSOR'],
                            ip:      `${server[0].join('.')}:${server[1]}`
                        }));

                        this.setState({
                            servers: serverList
                        }, () => console.info('Обновление серверов завершено!'));
                    })
                    .catch((error) => {
                        console.error(`Возникла ошибка при получении списка серверов: `, error);
                    });
            }
        });
    }

    render () {
        const a = this.state.servers.map((e, i) =>
            (
                <TableRow key = { i }>
                    <TableRowColumn>{e.ping}|{e.players.length}</TableRowColumn>
                    <TableRowColumn>{e.country}</TableRowColumn>
                    <TableRowColumn>{e.name}</TableRowColumn>
                    <TableRowColumn>{e.ip}</TableRowColumn>
                    <TableRowColumn>{e.wads}</TableRowColumn>
                    <TableRowColumn>{e.mode}</TableRowColumn>
                </TableRow>
            )
        );


        return (
            <Table
                adjustForCheckbox = { false }>
                <TableHeader adjustForCheckbox = { false } displaySelectAll = { false }>
                    <TableRow>
                        <TableHeaderColumn>Состояние</TableHeaderColumn>
                        <TableHeaderColumn>Флаг</TableHeaderColumn>
                        <TableHeaderColumn>Название</TableHeaderColumn>
                        <TableHeaderColumn>IP</TableHeaderColumn>
                        <TableHeaderColumn>Вады</TableHeaderColumn>
                        <TableHeaderColumn>Режим</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox = { false }>
                    {a}
                </TableBody>
            </Table>
        );
    }
}
