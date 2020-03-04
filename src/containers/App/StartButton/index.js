import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import DBFGL from '@/Global';

import Styles from './styles.scss';

export default class StartButton extends Component {
    onClick = () => {
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
