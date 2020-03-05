import React, { Fragment } from 'react';
import WadController from '../WadController';
import SelectedWads from '../SelectedWads';

export default class TabWads extends React.Component {
    render() {
        return (<Fragment>
            <WadController
                style={{
                    float: 'left',
                }}
            />
            <SelectedWads
                style={{
                    marginLeft: '50%',
                }}
            />
        </Fragment>);
    }
}
