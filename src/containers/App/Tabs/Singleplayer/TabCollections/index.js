import React, { Fragment } from 'react';
import SelectedWads from '../SelectedWads';

export default class TabCollections extends React.Component {
    render() {
        return (<Fragment>
            <big style={{ color: 'white' }}>Здесь будут коллекции</big>
            <SelectedWads
                style={{
                    marginLeft: '50%',
                }}
            />
        </Fragment>);
    }
}
