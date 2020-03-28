import React, { PureComponent } from 'react';
import type from 'prop-types';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
} from 'material-ui/Table';

import ServerComponent, { widths } from './Server';

export default class ServerList extends PureComponent {
    static propTypes = {
        servers:          type.array.isRequired,
        updateServerInfo: type.func.isRequired,
    }

    render() {
        const serverList = this.props.servers.map(server =>
            <ServerComponent server={server} key={`${server.ip}:${server.port}`} updateServerInfo={this.props.updateServerInfo} />
        );

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
                <TableBody displayRowCheckbox={false}>{serverList}</TableBody>
            </Table>
        );
    }
}
