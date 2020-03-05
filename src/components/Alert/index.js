import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import DBFGL from '@/Global';

export default class Alert extends React.Component {
    constructor() {
        super();
        this.state = {
            open:  false,
            title: '',
            text:  '',
        };

        DBFGL.on('notification.alert', this.onAlertRecieved);
    }

    componentWillUnmount() {
        DBFGL.removeListener('notification.alert', this.onAlertRecieved);
    }

    onAlertRecieved = ({ title, text }) => {
        this.setState({
            title,
            text,
            open: true,
        });
    }

    onCancel = () => {
        DBFGL.emit('notification.alert.closed');
        this.setState({ open: false });
    };

    render() {
        const actions = [
            <FlatButton
                primary
                keyboardFocused
                label='Ок'
                key={1}
                onClick={this.onCancel}
            />,
        ];

        const { title, text, open } = this.state;

        return (
            <div>
                <Dialog
                    modal
                    title={title}
                    actions={actions}
                    open={open}
                    onRequestClose={this.onCancel}>
                    {text}
                </Dialog>
            </div>
        );
    }
}
