/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * В данном файле находится управление основными состояниями программы
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import React, { Component } from 'react';
import ___ from './global'; // eslint-disable-line

// Components
import Provider from 'material-ui/styles/MuiThemeProvider';
import Bar from './Bar';
import Tabs from './Tabs';
import Panel from './Panel';
import PortPanel from './PortPanel';
import StartButton from './StartButton';

import theme from './theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Styles from './styles.scss';

global.DBFGL.on('game.end', () => {
    //TODO: Maximize
    global.DBFGL.emit('window.maximize');
});

global.DBFGL.on('game.start', () => {
    //TODO: Minimize
    global.DBFGL.emit('window.minimize');
});

export default class App extends Component {
    state = {
        panel:  false,
        rpanel: false,
        tab:    'singleplayer'
    }

    /** Переключает панель
     * @param  {bool} mode - true - показать; false - скрыть
     * @returns {void}
     */
    togglePanel = (mode = !this.state.panel) => {
        this.setState({ panel: Boolean(mode) });
    }

    /** Переключает правую панель
     * @param  {bool} mode - true - показать; false - скрыть
     * @returns {void}
     */
    toggleRPanel = (mode = !this.state.rpanel) => {
        this.setState({ rpanel: Boolean(mode) });
    }

    /** Переключает табы
     * @param  {string} tab - singleplayer/multiplayer
     * @returns {void}
     */
    toggleTab = (tab) => {
        console.log(`Toggle tab: ${tab}`);
        if (tab === 'singleplayer' || tab === 'multiplayer') {
            this.setState({
                tab
            });
        } else {
            throw new TypeError('Нет такого таба!');
        }
    }

    render () {
        const { panel, rpanel } = this.state;


        return (
            <Provider muiTheme = { getMuiTheme(theme) }>
                <div className = { Styles.app } style = { { background: theme.palette.canvasColor } }>
                    <Panel open = { panel } togglePanel = { this.togglePanel } />
                    <PortPanel open = { rpanel } togglePanel = { this.toggleRPanel } />
                    <Bar togglePanel = { this.togglePanel } />
                    <Tabs toggleTab = { this.toggleTab } />
                    <StartButton onClick = { this.toggleRPanel } />
                </div>
            </Provider>
        );
    }
}
