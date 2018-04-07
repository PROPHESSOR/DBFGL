import React, { Component } from 'react';
import type from 'prop-types';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import Cover from '../../../../../../theme/assets/wadcovers';

export default class Wad extends Component {
  static propTypes = {
      name:    type.string.isRequired,
      picture: type.string.isRequired,
      value:   type.number.isRequired
  }

  render () {
      return (
          <ListItem leftAvatar = { <Avatar src = { Cover[this.props.picture] } /> } primaryText = { this.props.name } value = { this.props.value } />
      );
  }
}
