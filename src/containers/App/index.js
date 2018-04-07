import React, { Component } from 'react';

// Components
import Provider from 'material-ui/styles/MuiThemeProvider';
import Bar from './Bar';
import Tabs from './Tabs';
import Panel from './Panel';
import StartButton from './StartButton';

import theme from './theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import Styles from './styles.scss';

export default class App extends Component {
    state = {
        panel: false
    }

    /** Переключает панель
     * @param  {bool} mode - true - показать; false - скрыть
     * @returns {void}
     */
    togglePanel = (mode) => {
        if (typeof mode !== 'boolean') {
            mode = !this.state.panel;
        }
        // console.log(`togglePanel(${mode})`);
        this.setState({ panel: Boolean(mode) });
    }

    render () {
        const { panel } = this.state;


        return (
            <Provider muiTheme = { getMuiTheme(theme) }>
                <div className = { Styles.app } style = { { background: theme.palette.canvasColor } }>
                    <Panel open = { panel } togglePanel = { this.togglePanel } />
                    <Bar togglePanel = { this.togglePanel } />
                    <Tabs />
                    <StartButton />
                </div>
            </Provider>
        );
    }
}
