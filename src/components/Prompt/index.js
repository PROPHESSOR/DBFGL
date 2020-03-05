import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'material-ui';

import DBFGL from '@/Global';

export default class Prompt extends React.Component {
    constructor() {
        super();
        this.state = {
            open:        false,
            title:       '',
            placeholder: '',
            value:       '',
        };

        DBFGL.on('notification.prompt', this.onPromptRecieved);
    }

    onPromptRecieved = ({ title, placeholder, defaultValue }) => {
        this.setState({
            title,
            placeholder,
            value: defaultValue,
            open:  true,
        });
    }

    onOk = () => {
        DBFGL.emit('notification.prompt.ok', this.state.value);
        this.setState({ open: false });
    };

    onCancel = () => {
        DBFGL.emit('notification.prompt.cancel');
        this.setState({ open: false });
    };

    onChange = (event, value) => {
        this.setState({ value });
    }

    render() {
        const actions = [
            <FlatButton
                primary
                label='Ок'
                key={1}
                onClick={this.onOk}
            />,
            <FlatButton
                secondary
                label='Отмена'
                key={2}
                onClick={this.onCancel}
            />,
        ];

        const { title, value, open, placeholder } = this.state;

        return (
            <div>
                <Dialog
                    modal
                    title={title}
                    actions={actions}
                    open={open}
                    onRequestClose={this.onCancel}>
                    <TextField
                        fullWidth
                        autoFocus
                        name='promptinput'
                        value={value}
                        placeholder={placeholder}
                        onChange={this.onChange}
                    />
                </Dialog>
            </div>
        );
    }
}
