import React, { Component } from 'react';
import type from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import { Tabs, Tab } from 'material-ui/Tabs';

import DBFGL from '@/Global';

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

        const val = value ? 'multiplayer' : 'singleplayer';

        return DBFGL.emit('tab.change', val);
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
                slideStyle = { {
                    overflow: 'inherit'
                } }>
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
