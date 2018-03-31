import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';

import Styles from './styles.scss';

const StartButton = () => (
    <div>
        <FloatingActionButton
            className = { Styles.startbutton }>
            <span>&#9658;</span>
            {/* <ContentAdd /> */}
        </FloatingActionButton>
    </div>
);

export default StartButton;
