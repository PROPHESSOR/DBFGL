/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * В данном файле находится управление основными состояниями программы
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import React, { Component } from 'react';
import DBFGL from '@/Global';

// Components
import Provider from 'material-ui/styles/MuiThemeProvider';
import Bar from './Bar';
import Tabs from './Tabs';
import Panel from './Panel';
import PortPanel from './PortPanel';
import StartButton from './StartButton';

import theme from './theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AlertBox from '../../components/Alertbox';

import Styles from './styles.scss';

// Windows
import WindowTests from '../Tests';
import WindowSettings from '../Settings';
import WindowAbout from '../About';

DBFGL.on('game.end', () => {
    //TODO: Maximize
    DBFGL.emit('window.maximize');
});

DBFGL.on('game.start', () => {
    //TODO: Minimize
    DBFGL.emit('window.minimize');
});

export default class App extends Component {
    render () {
        return (
            <Provider muiTheme = { getMuiTheme(theme) }>
                <div className = { Styles.app } style = { { background: theme.palette.canvasColor } }>
                    <Panel />
                    <PortPanel />
                    <Bar />
                    <Tabs />
                    <StartButton />
                    <AlertBox />
                    <WindowTests />
                    <WindowSettings />
                    <WindowAbout />
                </div>
            </Provider>
        );
    }
}
