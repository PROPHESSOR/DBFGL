import React, { Component, Fragment } from 'react';
import type from 'prop-types';

import Toolbar from './Toolbar';
import Servers from './Servers';

export default class Multiplayer extends Component {
  static propTypes = {}

  render () {
      return (
          <Fragment>
              <Toolbar />
              <Servers />
          </Fragment>
      );
  }
}
