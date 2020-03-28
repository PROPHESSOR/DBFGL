import React, { PureComponent } from 'react';
import type from 'prop-types';
import DBFGL from '@/Global';

import Toolbar from './Toolbar';
import Servers from './Servers';
import { connect } from 'react-redux';
import { createBindStateToProps, createBindActToProps, storeProps } from '@/store';
import { getServers } from '@/utils/Servers';

export default connect(
    createBindStateToProps('multiplayer.serverlist'),
    createBindActToProps()
)(
    class Multiplayer extends PureComponent {
        static propTypes = {
            ...storeProps,
            serverlist: type.array.isRequired,
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

                act(actions.multiplayer_serverlist_update, servers.map(server => ({
                    ip:   server[0].join('.'),
                    port: server[1],
                })));

                if (!silent) DBFGL.toast('Обновление серверов завершено!');
            } catch (error) {
                if (error.message === 'Too fast requests') return DBFGL.toast('Необходимо подождать перед следующим обновлением!');

                return DBFGL.toast(`Возникла ошибка при получении списка серверов: ${error.message}`);
            } finally {
                if (!silent) DBFGL.preloader();
            }
        }

        render() {
            const { serverlist } = this.props;

            return (
                <div
                    style={{
                        height: 'calc(100vh - 110px)',
                    }}>
                    <Toolbar />
                    <Servers servers={serverlist} />
                </div>
            );
        }
    });
