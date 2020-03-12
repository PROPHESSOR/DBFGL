import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchServerStatus } from '@/utils/Servers';

import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class ServerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverStatus: null,
        };
    }

    componentDidMount() {
        fetchServerStatus(this.props.server.ip, this.props.server.port)
            .then(serverStatus => {
                this.setState({
                    serverStatus,
                });
            })
            .catch(error => {
                console.error(`Возникла ошибка при получении списка серверов: `, error);
            });
    }

    render() {
        return (
            <TableRow>
                <TableRowColumn>0</TableRowColumn>
                <TableRowColumn>0</TableRowColumn>
                <TableRowColumn>{this.state.serverStatus === null ? 'Loading...' : this.state.serverStatus.name}</TableRowColumn>
                <TableRowColumn>{`${this.props.server.ip}:${this.props.server.port}`}</TableRowColumn>
                <TableRowColumn>0</TableRowColumn>
                <TableRowColumn>0</TableRowColumn>
            </TableRow>
        );
    }
}

ServerComponent.propTypes = {
    server: PropTypes.object,
};
