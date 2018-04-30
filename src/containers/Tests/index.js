import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';


export default class DialogExampleScrollable extends React.Component {
    constructor () {
        super();

        this.state = {
            open: false
        };

        DBFGL.on('window.open', (name) => {
            if (name === 'test') {
                this.setState({ open: true });
            }
        });

        DBFGL.on('window.close', (name) => {
            if (name === 'test') {
                this.setState({ open: false });
            }
        });
    }

  close = () => {
      DBFGL.emit('window.close', 'test');
  };

  render () {
      const actions = <FlatButton
          primary
          label = 'Закрыть'
          onClick = { this.close }
      />;

      return (
          <Dialog
              autoScrollBodyContent
              actions = { actions }
              modal = { false }
              open = { this.state.open }
              title = 'Раздел тестирования'
              onRequestClose = { this.close }>
              <FlatButton
                  fullWidth
                  primary
                  label = 'Закрыть'
                  onClick = { this.close }
              />
              {/* <RadioButtonGroup defaultSelected = 'not_light' name = 'shipSpeed'>
                  <RadioButton
                      label = 'Option'
                      value = 'value'
                  />
              </RadioButtonGroup> */}
          </Dialog>
      );
  }
}
