import React, { PureComponent } from 'react';
import types from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import DBFGL from '@/Global';

import Styles from './styles.scss';
import { connect } from 'react-redux';
import { createBindStateToProps } from '@/store';

export default connect(createBindStateToProps('multiplayer.selected'))(
    class StartButton extends PureComponent {
        static propTypes = {
            selected: types.number, // isRequiredOrNull
        }

        onClick = () => {
            if (DBFGL.tab === 'multiplayer' && this.props.selected === null) return DBFGL.toast('Выберите сервер для подключения!');
            DBFGL.emit('panel.open', 'right');
        }

        render() {
            return (
                <FloatingActionButton
                    className={Styles.startbutton}
                    onClick={this.onClick}>
                    <span>&#9658;</span>
                </FloatingActionButton>);
        }
    }
);
