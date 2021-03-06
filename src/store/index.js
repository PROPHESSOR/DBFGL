import { createStore, combineReducers } from 'redux';
import propType from 'prop-types';

import * as Singleplayer from './singleplayer';
import * as Multiplayer from './multiplayer';
import * as Interface from './interface';

/**
 * @typedef {{type: string, payload: any}} Action
 */

export const actions = {
    ...Singleplayer.actions,
    ...Multiplayer.actions,
    ...Interface.actions,
};

export const reducers = combineReducers({
    singleplayer: Singleplayer.reducer,
    multiplayer:  Multiplayer.reducer,
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

            if (!module || !property) throw new Error(`[Redux] Wrong path ${prop}`);

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
            dispatch,
        };
    };
}

export const storeProps = {
    act:      propType.func.isRequired,
    actions:  propType.object.isRequired,
    dispatch: propType.func.isRequired,
};

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
