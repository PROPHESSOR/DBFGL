import React, { Component } from 'react';
import type from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import { Tabs, Tab } from 'material-ui/Tabs';

import Singleplayer from './Singleplayer';
import Multiplayer from './Multiplayer';

export default class TabsExampleSimple extends Component {
    static propTypes = {
        toggleTab: type.func.isRequired
    }

    state = {
        slideIndex: 0
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value
        });

        return this.props.toggleTab(value ? 'multiplayer' : 'singleplayer');
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
