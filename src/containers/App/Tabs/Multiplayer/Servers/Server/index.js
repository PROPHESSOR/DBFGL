import React, { Component } from 'react';

import {
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

export default class Servers extends Component {
    render () {
        return (
            <TableRow>
                <TableRowColumn>2</TableRowColumn>
                <TableRowColumn>Randal White</TableRowColumn>
                <TableRowColumn>Unemployed</TableRowColumn>
            </TableRow>
        );
    }
}
