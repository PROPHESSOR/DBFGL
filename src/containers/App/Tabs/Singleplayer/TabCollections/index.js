import React, { Fragment } from 'react';
import SelectedWads from '../SelectedWads';
import CollectionList from '../CollectionList';

export default class TabCollections extends React.PureComponent {
    render() {
        return (<Fragment>
            <CollectionList
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
