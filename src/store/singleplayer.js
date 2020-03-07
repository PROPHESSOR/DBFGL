/* eslint-disable camelcase, default-case */

const store = {
    singleplayer: { // singleplayer.js

        /**
         * @type {Array<import('@/classes/DoomFile').default>}
         */
        selected: [],

        /**
         * @type {Array<import('@/Global').Collection}
         */
        collections: [],

        /**
         * @type {import('@/classes/DoomFile').default}
         */
        iwad: null,
    },
};

export const actions = {
    singleplayer_wadlist_selected_update: 'singleplayer.wadlist.selected.update',
    singleplayer_wadlist_iwad_update:     'singleplayer.wadlist.iwad.update',
    singleplayer_wadlist_update:          'singleplayer.wadlist.update',
    singleplayer_collections_update:      'singleplayer.collections.update',
};

/**
 *
 * @param {import('./index').Action} action
 */
export function reducer(state = store, action) {
    switch (action.type) {
        case actions.singleplayer_collections_update:
            return { ...state, collections: action.payload };

        default:
            break;
    }

    return state;
}
