import React, { Component, Fragment } from 'react';

import DBFGL from '@/Global';

import Alert from './Alert';

export default class AlertBox extends Component {
    constructor() {
        super();
        this.state = {
            alerts: [],
        };

        DBFGL.on('notification.alert', message => {
            this.setState({
                alerts: [...this.state.alerts, message],
            });
        });
    }

    render() {
        const alerts = this.state.alerts.map((message, i) => <Alert key={i} message={message} />);

        return (
            <Fragment>
                {alerts}
            </Fragment>
        );
    }
}
