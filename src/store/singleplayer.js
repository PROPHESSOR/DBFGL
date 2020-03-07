import DoomFile from '@/classes/DoomFile';
import { getIWads } from '@/utils/getWadsFromFs';

/* eslint-disable camelcase, default-case */

const store = {

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
};

export const actions = {
    singleplayer_wadlist_selected_add:    'singleplayer.wadlist.selected.add',
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
    const { type, payload } = action;

    switch (type) {
        case actions.singleplayer_collections_update:
            return { ...state, collections: payload };

        case actions.singleplayer_wadlist_iwad_update:
            if (!payload) throw new Error('You tried to remove iwad!');

            if (payload instanceof DoomFile) return { ...state, iwad: payload };
            if (typeof payload === 'string') {
                const iwads = getIWads().filter(iwad => iwad.path === payload || iwad.name === payload);

                if (!iwads.length) throw new Error(`No such iwad found! ${payload}`);
            }

            throw new Error(`Unknown payload ${payload}`);

    }

    return state;
}
