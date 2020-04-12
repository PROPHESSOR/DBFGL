import React, { PureComponent } from 'react';

// Components
import { AppBar } from 'material-ui';

export default class Bar extends PureComponent {
    render() {
        return (
            <AppBar
                showMenuIconButton={false}
                title='Дополнительно'
            />
        );
    }
}
