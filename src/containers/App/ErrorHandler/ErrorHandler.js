import React from 'react';
import types from 'prop-types';

import DBFGL from '@/Global';
import Config from '@/utils/Config';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 *
 * @param {Error} error
 * @returns {{title: string, text: string}}
 */
function errorInterpreter(error) {
    const output = {
        title: 'Ошибка!',
        text:  'Что-то пошло не так (x_x)',
    };

    if (error.message === 'No IWADs found!') {
        output.title = 'Не найдено ни одного IWAD файла!';
        output.text = `Поместите IWAD файлы (например, doom2.wad или freedoom.wad) в папку ${Config.get('wads:folders')[0].replace('{appdata}', DBFGL.appData)}!`;
    }

    return output;
}

export default class ErrorHandler extends React.Component {
    static propTypes = {
        children: types.element.isRequired,
    }

    static getDerivedStateFromError(error) {
        console.error('[ErrorHandler]', error);

        return { error };
    }

    state = {

        /**
         * @type {string|null}
         */
        error: null,
    }

    componentDidCatch(error, info) {
        console.info('[ErrorHandler] message, info, error', [error.message, info, error]);
    }

    restart() {
        location.reload();
    }

    openDevtools() {
        require('electron').remote.getCurrentWebContents().openDevTools({ mode: 'bottom' });
    }

    render() {
        if (!this.state.error) return this.props.children;

        const { error } = this.state;

        const { title, text } = errorInterpreter(error);

        const version = DBFGL.isNative ? ` v${require('../../../../package.json').version}` : '';

        return (<Dialog
            open
            modal
            title={title}
            actions={[
                <FlatButton
                    primary
                    // keyboardFocused
                    key={1}
                    label='Перезагрузить'
                    onClick={this.restart}
                />,
            ]}
            onRequestClose={this.onCancel}>
            {text}
            <small style={{ position: 'absolute', left: 0, bottom: 0, color: 'rgba(128, 128, 128, .2)' }} onContextMenu={this.openDevtools}>DBFGL{version}</small>
        </Dialog>);
    }
}
