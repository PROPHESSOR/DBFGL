import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getServerInfo } from '@/utils/Servers';

import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

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

export default class ServerComponent extends Component {
    static propTypes = {
        server: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            serverStatus: null,
        };
    }

    async componentDidMount() {
        try {
            const serverStatus = await getServerInfo(this.props.server.ip, this.props.server.port);

            this.setState({ serverStatus }); // eslint-disable-line
        } catch (error) {
            console.error(`Возникла ошибка при получении списка серверов: `, error);
        }
    }

    render() {
        const { serverStatus } = this.state;
        const { ip, port } = this.props.server;

        return (
            <TableRow>
                <TableRowColumn style={{ width: widths.players }}>{serverStatus && serverStatus.numPlayers}</TableRowColumn>
                <TableRowColumn style={{ width: widths.name }}>{serverStatus ? serverStatus.name : 'Loading...'}</TableRowColumn>
                <TableRowColumn style={{ width: widths.ip }}>{`${ip}:${port}`}</TableRowColumn>
                <TableRowColumn
                    style={{ width: widths.wads, cursor: serverStatus ? 'help' : null }}
                    title={serverStatus && serverStatus.pwads.join(', ')}>
                    <i>{serverStatus && serverStatus.iwad}</i>
                </TableRowColumn>
                <TableRowColumn style={{ width: widths.mode }}>{serverStatus && serverStatus.gameType && serverStatus.gameType.type}</TableRowColumn>
            </TableRow>
        );
    }
}
