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

export default class Settings extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            open:       false,
            wadFolders: Config.get('wads:folders'),
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
        Config.set('wads:folders', this.state.wadFolders);
        Config.save();
        DBFGL.emit('window.close', 'settings');
        DBFGL.emit('notification.toast', 'Настройки успешно сохранены!');
    }

    addWadFolder = () => {
        this.setState({
            wadFolders: [...this.state.wadFolders, ''],
        });
    }

    onWadFolderChange = (cindex, text) => {
        this.setState({
            wadFolders: this.state.wadFolders
                .map((folder, index) => index === cindex ? text : folder),
        });
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

        const wadFolders = this.state.wadFolders
            .map(folder => folder.replace('{appdata}', DBFGL.appData))
            .map((folder, index) => <TextField fullWidth name={`wadfolder${index}`} value={folder} key={index} inputStyle={{ color: 'white' }} onChange={(_, text) => this.onWadFolderChange(index, text)} />); // FIXME: Use theme colors

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
                        <FlatButton
                            primary
                            key='addwadfolder'
                            label='Добавить папку'
                            onClick={this.addWadFolder}
                        />
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
                    <span>TODO: Write me!</span>
                </Section>
            </Dialog>
        );
    }
}
