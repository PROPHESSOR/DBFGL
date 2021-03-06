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
        selected:         type.number, // isRequiredOrNull
        updateServerInfo: type.func.isRequired,
        onServerClick:    type.func.isRequired,
    }

    render() {
        const serverList = this.props.servers.map((server, index) =>
            <ServerComponent hovered={index === this.props.selected} server={server} key={`${server.ip}:${server.port}`} updateServerInfo={this.props.updateServerInfo} onClick={() => server.version && this.props.onServerClick(index)} />
        );

        return (
            <Table adjustForCheckbox={false}>
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
