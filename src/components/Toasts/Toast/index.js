import React from 'react';
import type from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

// import palette from '../../../containers/App/9';


export default class Toast extends React.PureComponent {
    static propTypes = {
        message: type.string.isRequired,
    }

    state = {
        open: true,
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const { message } = this.props;

        return (
            <Snackbar
                style={{ border: '1px solid gray' }}
                autoHideDuration={4000}
                message={message}
                open={this.state.open}
                onActionClick={this.handleRequestClose}
                onRequestClose={this.handleRequestClose}
            />
        );
    }
}
