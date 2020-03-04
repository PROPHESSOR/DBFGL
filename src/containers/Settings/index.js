import React from 'react';
// import Config from '../../utils/Config';
import DBFGL from '@/Global';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Section from './Section';

// Sections
import SPorts from './Sections/Ports';
import Config from '../../utils/Config';
import { TextField } from 'material-ui';

export default class Settings extends React.Component {
    constructor() {
        super();

        this.state = {
            open: false,
        };

        DBFGL.on('window.open', name => {
            if (name === 'settings') this.setState({ open: true });

        });

        DBFGL.on('window.close', name => {
            if (name === 'settings') this.setState({ open: false });

        });
    }

    close = () => {
        DBFGL.emit('window.close', 'settings');
    };

    save = () => {
        console.warn('Сохранение настроек через форму пока не реализовано!');
        // TODO:
    }

    render() {
        const actions = [
            <FlatButton
                primary
                key='0'
                label='Закрыть'
                onClick={this.close}
            />,
            <FlatButton
                primary
                key='1'
                label='Сохранить'
                onClick={this.save}
            />,
        ];

        const wadFolders = Config.get('wads:folders')
            .map(folder => folder.replace('{appdata}', DBFGL.appData))
            .map(folder => <TextField readOnly disabled value={folder} inputStyle={{ color: 'white' }} />); // FIXME: Use theme colors

        return (
            <Dialog
                autoScrollBodyContent
                actions={actions}
                modal={false}
                open={this.state.open}
                title='Настройки'
                onRequestClose={this.close}>
                <Section
                    subtitle='Первая папка используется, так же, для скачивания новых вадов'
                    title='Папки для поиска wad файлов'>
                    <div>
                        {wadFolders}
                    </div>
                </Section>
                <Section
                    subtitle=''
                    title='Настройка портов'>
                    <SPorts />
                </Section>
                <Section
                    subtitle='Время ожидания сервера, задержки анимаций и прочее'
                    title='Настройка констант'>
                TODO: Write me!
                </Section>
            </Dialog>
        );
    }
}
