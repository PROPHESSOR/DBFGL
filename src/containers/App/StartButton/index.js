import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import Styles from './styles.scss';

const StartButton = (props) => (
    <FloatingActionButton
        className = { Styles.startbutton }
        onClick = { props.onClick }>
        <span>&#9658;</span>
    </FloatingActionButton>
); // TODO: Icon

export default StartButton;
