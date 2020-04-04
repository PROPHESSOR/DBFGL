import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { TableRow, TableRowColumn } from 'material-ui/Table';

/**
 * Так как шапка и тело таблицы - разные компоненты,
 * используем константу со значениями ширины колонки, px
 */
export const widths = {
    players: 25,
    name:    null,
    ip:      140, // xxx.xxx.xxx.xxx:xxxxxx
    wads:    100, // freedoom2.wad
    mode:    80, // Cooperative
};

export default class ServerComponent extends PureComponent {
    static propTypes = {
        updateServerInfo: PropTypes.func.isRequired,
        server:           PropTypes.object.isRequired,
    }

    render() {
        const { server } = this.props;
        const { ip, port } = server;
        const serverStatus = typeof server.name === 'string';

        return (
            <TableRow>
                <TableRowColumn style={{ width: widths.players }}>{serverStatus && server.numPlayers}</TableRowColumn>
                <TableRowColumn style={{ width: widths.name }}>{serverStatus ? server.name : 'Loading...'}</TableRowColumn>
                <TableRowColumn style={{ width: widths.ip }}>{`${ip}:${port}`}</TableRowColumn>
                <TableRowColumn
                    style={{ width: widths.wads, cursor: serverStatus ? 'help' : null }}
                    title={serverStatus && server.pwads.join(', ')}>
                    <i>{serverStatus && server.iwad}</i>
                </TableRowColumn>
                <TableRowColumn style={{ width: widths.mode }}>{serverStatus && server.gameMode && server.gameMode.type}</TableRowColumn>
            </TableRow>
        );
    }
}
