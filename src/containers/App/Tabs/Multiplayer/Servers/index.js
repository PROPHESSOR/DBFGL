import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
} from 'material-ui/Table';

import DBFGL from '@/Global';

// import Server from './Server'; //TODO:
import ServerComponent, { widths } from './Server';
import { getServers } from '@/utils/Servers';

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

        DBFGL.on('multiplayer.update', () => this.updateServers());
    }

    componentWillMount() {
        this.updateServers(true);
    }

    async updateServers(silent = false) {
        if (!silent) DBFGL.preloader('Обновляю список серверов...');

        try {
            const servers = await getServers();

            this.setState({
                servers: servers.map(server => ({
                    ip:   server[0].join('.'),
                    port: server[1],
                })),
            });

            if (!silent) DBFGL.toast('Обновление серверов завершено!');
        } catch (error) {
            if (error.message === 'Too fast requests') return DBFGL.toast('Необходимо подождать перед следующим обновлением!');

            return DBFGL.toast(`Возникла ошибка при получении списка серверов: ${error.message}`);
        } finally {
            if (!silent) DBFGL.preloader();
        }
    }

    render() {
        return (
            <Table
                adjustForCheckbox={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn style={{ width: widths.players }}>Игроки</TableHeaderColumn>
                        <TableHeaderColumn style={{ width: widths.name }}>Название</TableHeaderColumn>
                        <TableHeaderColumn style={{ width: widths.ip }}>IP</TableHeaderColumn>
                        <TableHeaderColumn style={{ width: widths.wads }}>Вады</TableHeaderColumn>
                        <TableHeaderColumn style={{ width: widths.mode }}>Режим</TableHeaderColumn>
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
