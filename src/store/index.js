import { createStore, combineReducers } from 'redux';

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
 * @param {Action} action
 * @param {*} payload?
 */
export function createAction(action, payload = null) {
    if (!actions.includes(action.type)) throw new Error(`[Redux] There's no action ${action}`);

    return {
        action,
        payload,
    };
}

const store = createStore(reducers);

export default store;
