/**
 * Copyright (c) 2018 PROPHESSOR
 *
 * В данном файле находится управление основными состояниями программы
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DBFGL from '@/Global';

import store from '@/store';

// Components
import ThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Bar from './Bar';
import Tabs from './Tabs';
import Panel from './Panel';
import PortPanel from './PortPanel';
import StartButton from './StartButton';

import theme from './theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Toasts from '../../components/Toasts';
import Alert from '@/components/Alert';
import Confirm from '@/components/Confirm';
import Prompt from '@/components/Prompt';

import Styles from './styles.scss';

// Windows
import WindowTests from '../Tests';
import WindowSettings from '../Settings';
import WindowAbout from '../About';
import ErrorHandler from './ErrorHandler/ErrorHandler';

DBFGL.on('game.end', () => {
    //TODO: Maximize
    DBFGL.emit('window.maximize');
});

DBFGL.on('game.start', () => {
    //TODO: Minimize
    DBFGL.emit('window.minimize');
});

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ThemeProvider muiTheme={getMuiTheme(theme)}>
                    <ErrorHandler>
                        <div className={Styles.app} style={{ background: theme.palette.canvasColor }}>
                            <Panel />
                            <PortPanel />
                            <Bar />
                            <Tabs />
                            <StartButton />
                            <Toasts />
                            <Alert />
                            <Confirm />
                            <Prompt />
                            <WindowTests />
                            <WindowSettings />
                            <WindowAbout />
                        </div>
                    </ErrorHandler>
                </ThemeProvider>
            </Provider>
        );
    }
}
