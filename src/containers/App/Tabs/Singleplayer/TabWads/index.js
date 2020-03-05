import React, { Fragment } from 'react';
import WadList from '../WadList';
import SelectedWads from '../SelectedWads';

export default class TabWads extends React.Component {
    render() {
        return (<Fragment>
            <WadList
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
