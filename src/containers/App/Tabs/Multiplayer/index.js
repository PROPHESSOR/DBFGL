import React, { PureComponent } from 'react';
import type from 'prop-types';
import DBFGL from '@/Global';

import Toolbar from './Toolbar';
import Servers from './Servers';
import { connect } from 'react-redux';
import { createBindStateToProps, createBindActToProps, storeProps } from '@/store';
import { getServers, getServerInfo } from '@/utils/Servers';

export default connect(
    createBindStateToProps('multiplayer.serverlist', 'multiplayer.selected'),
    createBindActToProps()
)(
    class Multiplayer extends PureComponent {
        static propTypes = {
            ...storeProps,
            serverlist: type.array.isRequired,
            selected:   type.number.isRequired,
        }

        constructor() {
            super();

            DBFGL.on('multiplayer.update', () => this.updateServers());
        }

        componentWillMount() {
            this.updateServers(true);
        }

        async updateServers(silent = false) {
            const { act, actions } = this.props;

            if (!silent) DBFGL.preloader('Обновляю список серверов...');

            act(actions.multiplayer_serverlist_update, []);

            try {
                const servers = await getServers();

                const promises = [];

                const availableServers = [];

                for (const sid in servers) {
                    const server = servers[sid];

                    console.log('server', server);

                    promises.push(getServerInfo(server.ip, server.port)
                        .then(info => availableServers.push({ ...servers[sid], ...info }))
                        .catch(error => console.error('getServerInfo error', sid, server, error)
                        ));
                }

                await Promise.all(promises);
                act(actions.multiplayer_serverlist_update, availableServers);

                if (!silent) DBFGL.toast('Обновление серверов завершено!');
            } catch (error) {
                if (error.message === 'Too fast requests') return DBFGL.toast('Необходимо подождать перед следующим обновлением!');

                return DBFGL.toast(`Возникла ошибка при получении списка серверов: ${error.message}`);
            } finally {
                if (!silent) DBFGL.preloader();
            }
        }

        updateServerInfo = (index, diff) => {
            const { act, actions } = this.props;

            act(actions.multiplayer_serverlist_server_update, { index, diff });
        }

        onServerClick = index => {
            const { act, actions } = this.props;

            act(actions.multiplayer_serverlist_select, index);
        }

        render() {
            const { serverlist, selected } = this.props;

            return (
                <div
                    style={{
                        height: 'calc(100vh - 110px)',
                    }}>
                    <Toolbar />
                    <Servers servers={serverlist} selected={selected} updateServerInfo={this.updateServerInfo} onServerClick={this.onServerClick} />
                </div>
            );
        }
    });
