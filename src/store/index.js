import { createStore, combineReducers } from 'redux';
import propType from 'prop-types';

import * as Singleplayer from './singleplayer';
import * as Interface from './interface';

/**
 * @typedef {{type: string, payload: any}} Action
 */

export const actions = {
    ...Singleplayer.actions,
    ...Interface.actions,
};

export const reducers = combineReducers({
    singleplayer: Singleplayer.reducer,
    interface:    Interface.reducer,
});

/**
 *
 * @param {string} action
 * @param {*} payload?
 */
export function createAction(action, payload = null) {
    if (!action) throw new Error(`[Redux] You haven't specified the action!`);
    if (!Object.values(actions).includes(action)) throw new Error(`[Redux] There's no action ${action}`);

    return {
        type: action,
        payload,
    };
}

/**
 * Usage: connect(createBindStateToProps('module1.property', 'module2.property2'))
 * @factory
 * @param  {...string} properties - Like 'singleplayer.iwad'
 * @returns {(store: {}) => {}}
 */
export function createBindStateToProps(...properties) {
    return function(store) {
        const values = {};

        for (const prop of properties) {
            const [module, property] = prop.split('.');

            values[property] = store[module][property];
        }

        return values;
    };
}

/**
 * Usage: connect(..., createBindActionToProps())
 * @factory
 * @param  {...string} properties - Like 'singleplayer.iwad'
 * @returns {(dispatch: function) => {action: function}}
 */
export function createBindActToProps() {
    return function(dispatch) {
        return {

            /**
             *
             * @param {Action} action
             * @param {*} payload?
             */
            act(action, payload=null) {
                return dispatch(createAction(action, payload));
            },
            actions,
        };
    };
}

export const storeProps = {
    act:      propType.func.isRequired,
    actions:  propType.array.isRequired,
    dispatch: propType.func.isRequired,
};

const store = createStore(reducers);

export default store;
