import React from 'react';
import type from 'prop-types';

import Bar from './Bar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class Panel extends React.Component {
    static propTypes = {
        open:        type.bool.isRequired,
        togglePanel: type.func.isRequired
    }

    render () {
        const { open, togglePanel } = this.props;


        return (
            <Drawer
                open = { open }>
                <Bar
                    togglePanel = { togglePanel }
                />
                <MenuItem>Menu Item</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
            </Drawer>
        );
    }
}
