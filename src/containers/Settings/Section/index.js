import React, { PureComponent } from 'react';
import type from 'prop-types';

import { Card, CardHeader, CardText } from 'material-ui/Card';

export default class Section extends PureComponent {
  static propTypes = {
      title:    type.string.isRequired,
      children: type.object,
      subtitle: type.string,
  }

  state = {
      expanded: false,
  }

  handleExpandChange = () => {
      this.setState({ expanded: !this.state.expanded });
  }

  render() {
      const { children, title, subtitle } = this.props;

      return (
          <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
              <CardHeader
                  actAsExpander
                  showExpandableButton
                  subtitle={subtitle}
                  title={title}
              />

              <CardText expandable>
                  {children}
              </CardText>

          </Card>
      );
  }
}
