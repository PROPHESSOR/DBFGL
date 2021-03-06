import React, { PureComponent } from 'react';
import type from 'prop-types';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import Cover from '../../../../../../theme/assets/wadcovers';

export default class Wad extends PureComponent {
  static propTypes = {
      wad:     type.object.isRequired,
      value:   type.number,
      cursor:  type.string,
      onClick: type.func.isRequired,
  }

  render() {
      const { wad, value, cursor, onClick } = this.props;
      const click = () => onClick(wad, value);

      return (
          <ListItem style={{ userSelect: 'none', cursor: cursor || 'pointer' }} leftAvatar={<Avatar src={Cover[wad.picture] || Cover.doom2} />} primaryText={wad.name} value={wad.value} onClick={click} />
      );
  }
}
