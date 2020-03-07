import React, { Component } from 'react';
import type from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import { Tabs, Tab } from 'material-ui/Tabs';

import Singleplayer from './Singleplayer';
import Multiplayer from './Multiplayer';
import { connect } from 'react-redux';
import { createBindStateToProps, createBindActToProps, storeProps } from '@/store';

const indexToString = index => index === 0 ? 'singleplayer' : 'multiplayer';
const stringToIndex = string => string === 'singleplayer' ? 0 : 1;

export default connect(
    createBindStateToProps('interface.tab'),
    createBindActToProps(),
)(
    class DBFGLTabs extends Component {
        static propTypes = {
            ...storeProps,
            tab:       type.number.isRequired,
            toggleTab: type.func,
        }

        handleChange = index => this.props.act(this.props.actions.interface_tab_change, indexToString(index));

        render() {
            const { tab } = this.props;
            const index = stringToIndex(tab);

            return (<div>
                <Tabs
                    value={index}
                    onChange={this.handleChange}>
                    <Tab label='Одиночная игра' value={0} />
                    <Tab label='Мультиплеер' value={1} />
                </Tabs>
                <SwipeableViews
                    index={index}
                    slideStyle={{
                        overflow: 'auto',
                    }}>
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
);
