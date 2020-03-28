import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getServerInfo } from '@/utils/Servers';

import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { createBindActToProps, storeProps } from '@/store';
import { connect } from 'react-redux';

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

export default connect(
    null,
    createBindActToProps()
)(
    class ServerComponent extends PureComponent {
        static propTypes = {
            ...storeProps,
            server: PropTypes.object,
        }

        constructor(props) {
            super(props);
            this.state = {
                serverStatus: null,
            };
        }

        async componentDidMount() {
            const { act, actions, server: { ip, port }} = this.props;

            try {
                const info = await getServerInfo(this.props.server.ip, this.props.server.port);

                act(actions.multiplayer_serverlist_server_update, { index: `${ip}:${port}`, diff: info });
            } catch (error) {
                console.error(`Возникла ошибка при получении списка серверов: `, error);
            }
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
    });
