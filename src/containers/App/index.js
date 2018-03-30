import React, { Component } from 'react';

// Components
import Provider from 'material-ui/styles/MuiThemeProvider';
import Bar from './Bar';

export default class App extends Component {
    render () {
        return (
            <Provider>
                <Bar />
                <div>It works</div>
            </Provider>
        );
    }
}
