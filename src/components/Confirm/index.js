import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import DBFGL from '@/Global';

export default class Confirm extends React.Component {
    constructor() {
        super();
        this.state = {
            open:  false,
            title: '',
            text:  '',
        };

        DBFGL.on('notification.confirm', this.onConfirmRecieved);
    }

    componentWillUnmount() {
        DBFGL.removeListener('notification.confirm', this.onConfirmRecieved);
    }

    onConfirmRecieved = ({ title, text }) => {
        this.setState({
            title,
            text,
            open: true,
        });
    }

    onOk = () => {
        DBFGL.emit('notification.confirm.ok');
        this.setState({ open: false });
    };

    onCancel = () => {
        DBFGL.emit('notification.confirm.cancel');
        this.setState({ open: false });
    };

    render() {
        const actions = [
            <FlatButton
                primary
                keyboardFocused
                label='Ок'
                key={1}
                onClick={this.onOk}
            />,
            <FlatButton
                secondary
                keyboardFocused
                label='Отмена'
                key={2}
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
