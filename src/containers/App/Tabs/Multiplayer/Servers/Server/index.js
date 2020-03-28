import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchServerStatus } from '@/utils/Servers';

import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

/**
 * Так как шапка и тело таблицы - разные компоненты,
 * используем константу со значениями ширины колонки, px
 */
export const widths = {
    players: 25,
    name:    null,
    ip:      140, // xxx.xxx.xxx.xxx:xxxxxx
    wads:    100, // freedoom2.wad
    mode:    64,
};

export default class ServerComponent extends Component {
  propTypes = {
      server: PropTypes.object,
  }

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
              <TableRowColumn style={{ width: widths.players }}>0</TableRowColumn>
              <TableRowColumn style={{ width: widths.name }}>{this.state.serverStatus === null ? 'Loading...' : this.state.serverStatus.name}</TableRowColumn>
              <TableRowColumn style={{ width: widths.ip }}>{`${this.props.server.ip}:${this.props.server.port}`}</TableRowColumn>
              <TableRowColumn style={{ width: widths.wads }}><i>smthnd.wad</i></TableRowColumn>
              <TableRowColumn style={{ width: widths.mode }}>Unknown</TableRowColumn>
          </TableRow>
      );
  }
}
