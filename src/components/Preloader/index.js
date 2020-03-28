import React from 'react';
import Dialog from 'material-ui/Dialog';

import DBFGL from '@/Global';

export default class Preloader extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            text: '',
        };

        DBFGL.on('notification.preloader', this.onPreloaderRecieved);
    }

    onPreloaderRecieved = text => {
        if (text) {
            this.setState({
                text,
                open: true,
            });
        } else {
            this.setState({
                open: false,
            });
        }
    }

    render() {
        const { text, open } = this.state;

        return (
            <div>
                <Dialog
                    modal
                    title='Пожалуйста, подождите'
                    open={open}>
                    {text}
                </Dialog>
            </div>
        );
    }
}
