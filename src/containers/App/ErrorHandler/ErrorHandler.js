import React from 'react';
import types from 'prop-types';

import DBFGL from '@/Global';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class ErrorHandler extends React.Component {
    static propTypes = {
        children: types.element.isRequired,
    }

    static getDerivedStateFromError(error) {
        console.error('[ErrorHandler]', error);

        return { error: error.message };
    }

    state = {

        /**
         * @type {string|null}
         */
        error: null,
        title: 'Ошибка',
        text:  'Что-то пошло не так (x_x)',
    }

    componentDidCatch(error, info) {
        console.info('[ErrorHandler]', error, info);
    }

    restart() {
        location.reload();
    }

    render() {
        if (!this.state.error) return this.props.children;

        const { error, title, text } = this.state;

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
        </Dialog>);
    }
}
