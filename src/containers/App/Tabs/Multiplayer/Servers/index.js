import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import DBFGL from '@/Global';

// import Server from './Server'; //TODO:
import ServerClass from '@/classes/Server';
import ServerComponent from './Server';
import { pingServers, fetchServerStatus } from '@/utils/Servers';

/* const servers = [
    new ServerClass({ ping: 128, players: ['PROPHESSOR'], name: 'Test server', ip: [127, 0, 0, 1], mode: 'Invasion' }),
    new ServerClass({ ping: 128, players: ['PROPHESSOR'], name: 'Test server 2', ip: [127, 0, 0, 2], mode: 'Cooperative' })
]; */

export default class ServerList extends Component {
    constructor() {
        super();
        this.state = {
            servers: [],
        };

        DBFGL.on('tab.change', tab => {
            if (tab === 'multiplayer') {
                console.info('Обновляю сервера...');
                pingServers()
                    .then(servers => {
                        this.setState({
                            servers: servers.map(server => ({
                                ip:   server[0].join('.'),
                                port: server[1],
                            })),
                        }, () => console.info('Обновление серверов завершено!'));
                    })
                    .catch(error => {
                        console.error(`Возникла ошибка при получении списка серверов: `, error);
                    });
            }
        });
    }

    render() {
        return (
            <Table
                adjustForCheckbox={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Состояние</TableHeaderColumn>
                        <TableHeaderColumn>Флаг</TableHeaderColumn>
                        <TableHeaderColumn>Название</TableHeaderColumn>
                        <TableHeaderColumn>IP</TableHeaderColumn>
                        <TableHeaderColumn>Вады</TableHeaderColumn>
                        <TableHeaderColumn>Режим</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {
                        this.state.servers.map(server =>
                            <ServerComponent server={server} key={`${server.ip}:${server.port}`} />
                        )
                    }
                </TableBody>
            </Table>
        );
    }
}
