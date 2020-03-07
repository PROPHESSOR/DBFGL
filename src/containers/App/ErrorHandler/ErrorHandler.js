import React from 'react';
import types from 'prop-types';

import DBFGL, { isNative } from '@/Global';
import Config from '@/utils/Config';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const { version } = require('../../../../package.json');

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

/**
 *
 * @param {Error} error
 * @param {{componentStack: string}} info
 * @returns {string}
 */
function getErrorTracebackToCopy(error, info) {
    const lines = [];

    lines.push('## DBFGL Error Traceback ##');
    lines.push(`DBFGL v${version}`);
    lines.push(`generated on ${Date.now()}`);
    lines.push(`DBFGL.isNative: ${isNative}`);
    lines.push(`DBFGL.os: ${DBFGL.os}`);
    lines.push(`Error message: «${error.message}»`);
    lines.push(`Error stack: «${error.stack}»`);
    lines.push(`Components stack: «${info.componentStack}»`);
    lines.push('## EOET ##');

    return lines.join('\n');
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
        info:  null,
    }

    componentDidCatch(error, info) {
        console.info('[ErrorHandler] message, info, error', [error.message, info, error]);
        this.setState({
            info,
        });
    }

    restart() {
        location.reload();
    }

    openDevtools() {
        require('electron').remote.getCurrentWebContents().openDevTools({ mode: 'bottom' });
    }

    copyTraceback = () => {
        const { error, info } = this.state;

        const text = getErrorTracebackToCopy(error, info);

        require('electron').remote.clipboard.writeText(text);
    }

    render() {
        if (!this.state.error) return this.props.children;

        const { error } = this.state;

        const { title, text } = errorInterpreter(error);

        const actions = [
            <FlatButton
                secondary
                key={1}
                label='Перезагрузить'
                onClick={this.restart}
            />,
            <FlatButton
                primary
                key={2}
                label='Скопировать детали ошибки'
                onClick={this.copyTraceback}
            />,
        ];

        return (<Dialog
            open
            modal
            title={title}
            actions={actions}
            onRequestClose={this.onCancel}>
            {text}
            <small style={{ position: 'absolute', left: 0, bottom: 0, color: 'rgba(128, 128, 128, .2)' }} onContextMenu={this.openDevtools}>DBFGL{getVersion()}</small>
        </Dialog>);
    }
}
