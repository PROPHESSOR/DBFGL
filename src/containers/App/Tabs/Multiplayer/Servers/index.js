import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

// import Server from './Server'; //TODO:
import ServerClass from './Server/Server';
import pingServers from '../../../../../utils/Servers';

const servers = [
    new ServerClass({ ping: 128, players: ['PROPHESSOR'], name: 'Test server', ip: [127, 0, 0, 1], mode: 'Invasion' }),
    new ServerClass({ ping: 128, players: ['PROPHESSOR'], name: 'Test server 2', ip: [127, 0, 0, 2], mode: 'Cooperative' })
];

export default class ServerList extends Component {
    state = {
        servers: []
    }

    componentWillMount () {
        pingServers(this.newServerCallback.bind(this), this.doneCallback.bind(this));
    }

    newServerCallback (ip, port) {
        this.setState((prevState) => ({
            servers: prevState.servers.concat(new ServerClass({ ping: 128, players: ['PROPHESSOR'], name: 'Unknown', ip: `${ip.join('.')}:${port}` }))
        }));
    }

    doneCallback () {
        console.log('done');
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
            <Table adjustForCheckbox = { false }>
                <TableHeader adjustForCheckbox = { false } displaySelectAll = { false }>
                    <TableRow>
                        <TableHeaderColumn>Состояние</TableHeaderColumn>
                        <TableHeaderColumn>Флаг</TableHeaderColumn>
                        <TableHeaderColumn>Название</TableHeaderColumn>
                        <TableHeaderColumn>IP</TableHeaderColumn>
                        <TableHeaderColumn>Порт</TableHeaderColumn>
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
