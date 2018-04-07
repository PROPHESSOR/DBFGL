import React, { Component } from 'react';

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

export default class App extends Component {
    state = {
        panel:  false,
        rpanel: false
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

    render () {
        const { panel, rpanel } = this.state;


        return (
            <Provider muiTheme = { getMuiTheme(theme) }>
                <div className = { Styles.app } style = { { background: theme.palette.canvasColor } }>
                    <Panel open = { panel } togglePanel = { this.togglePanel } />
                    <PortPanel open = { rpanel } togglePanel = { this.toggleRPanel } />
                    <Bar togglePanel = { this.togglePanel } />
                    <Tabs />
                    <StartButton onClick = { this.toggleRPanel } />
                </div>
            </Provider>
        );
    }
}
