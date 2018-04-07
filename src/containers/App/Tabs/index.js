import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';

import { Tabs, Tab } from 'material-ui/Tabs';

import Singleplayer from './Singleplayer';
import Multiplayer from './Multiplayer';

export default class TabsExampleSimple extends Component {
    state = {
        slideIndex: 0
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value
        });
    };

    render () {
        return (<div>
            <Tabs
                value = { this.state.slideIndex }
                onChange = { this.handleChange }>
                <Tab label = 'Одиночная игра' value = { 0 } />
                <Tab label = 'Мультиплеер' value = { 1 } />
            </Tabs>
            <SwipeableViews
                index = { this.state.slideIndex }
                onChangeIndex = { this.handleChange }>
                <div>
                    <Singleplayer />
                </div>
                <div>
                    <Multiplayer />
                </div>
            </SwipeableViews>
        </div>
        );
    }
}
