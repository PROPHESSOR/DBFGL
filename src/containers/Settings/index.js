import React from 'react';
import Config from '../../utils/Config';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Section from './Section';

export default class DialogExampleScrollable extends React.Component {
    constructor () {
        super();

        this.state = {
            open: false
        };

        DBFGL.on('window.open', (name) => {
            if (name === 'settings') {
                this.setState({ open: true });
            }
        });

        DBFGL.on('window.close', (name) => {
            if (name === 'settings') {
                this.setState({ open: false });
            }
        });
    }

    close = () => {
        DBFGL.emit('window.close', 'settings');
    };

    save = () => {
        // TODO:
    }

    render () {
        const actions = [
            <FlatButton
                primary
                key = '0'
                label = 'Закрыть'
                onClick = { this.close }
            />,
            <FlatButton
                primary
                key = '1'
                label = 'Сохранить'
                onClick = { this.save }
            />
        ];

        return (
            <Dialog
                autoScrollBodyContent
                actions = { actions }
                modal = { false }
                open = { this.state.open }
                title = 'Настройки'
                onRequestClose = { this.close }>
                <Section
                    subtitle = 'Первая папка используется, так же, для скачивания новых вадов'
                    title = 'Папки для поиска wad файлов'>
                TODO: Write me!
                </Section>
            </Dialog>
        );
    }
}
