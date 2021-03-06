import React, { PureComponent, Fragment } from 'react';

import DBFGL from '@/Global';

import Toast from './Toast';

export default class Toasts extends PureComponent {
    constructor() {
        super();
        this.state = {
            toasts: [],
        };

        DBFGL.on('notification.toast', message => {
            this.setState({
                toasts: [...this.state.toasts, message],
            });
        });
    }

    render() {
        const toasts = this.state.toasts.map((message, i) => <Toast key={i} message={message} />);

        return (
            <Fragment>
                {toasts}
            </Fragment>
        );
    }
}
