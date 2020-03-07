import DoomFile from '@/classes/DoomFile';
import { getIWads, getZDoomLaunchFilesWithoutIWads } from '@/utils/getWadsFromFs';
import Config from '@/utils/Config';

/* eslint-disable camelcase, default-case */

const store = {

    /**
     * @type {Array<DoomFile>}
     */
    selected: [],

    /**
     * @type {Array<DoomFile>}
     */
    wadlist: getZDoomLaunchFilesWithoutIWads(),

    /**
     * @type {Array<DoomFile>}
     */
    iwads: getIWads(),

    /**
     * @type {Array<import('@/Global').Collection}
     */
    collections: [],

    /**
     * @type {DoomFile}
     */
    iwad: null,
};

{
    // Import collections
    console.log('Importing collections...');

    /**
     * @type {Array<import('@/Global.js').CollectionJSON>}
     */
    const collections = Config.get('collections');
    const { iwads } = store;

    store.collections = collections
        .map(collection => ({
            name: collection.name,
            iwad: iwads.filter(iwad => iwad.name === collection.iwad).pop(),
            wads: collection.wads.map(wadpath => new DoomFile(wadpath)),
        }));
}

export const actions = {
    singleplayer_wadlist_selected_add:    'singleplayer.wadlist.selected.add',
    singleplayer_wadlist_selected_update: 'singleplayer.wadlist.selected.update',
    singleplayer_wadlist_iwad_update:     'singleplayer.wadlist.iwad.update',
    singleplayer_wadlist_update:          'singleplayer.wadlist.update',
    singleplayer_wadlist_iwads_update:    'singleplayer.wadlist.iwads.update',
    singleplayer_collections_update:      'singleplayer.collections.update',
};

/**
 *
 * @param {import('./index').Action} action
 */
// eslint-disable-next-line complexity
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

                return { ...state, iwad: iwads[0] };
            }

            throw new Error(`Unknown payload ${payload}`);

        case actions.singleplayer_wadlist_selected_add:
            if (!payload) throw new Error('No wad to add!');

            if (payload instanceof DoomFile) return { ...state, selected: [...state.selected, payload]};

            if (typeof payload === 'string') {
                const files = getZDoomLaunchFilesWithoutIWads().filter(file => file.path === payload || file.name === payload);

                if (!files.length) throw new Error(`No such doomfile found! ${payload}`);

                return { ...state, selected: [...state.selected, files[0]]};
            }

            throw new Error(`Unknown payload ${payload}`);

        case actions.singleplayer_wadlist_selected_update:
            if (!payload) return { ...state, selected: []};

            if (payload instanceof Array) return { ...state, selected: [...payload]};

            throw new Error(`Unknown payload ${payload}`);

        case actions.singleplayer_wadlist_update:
            if (!payload) throw new Error('You tried to remove wadlist!');

            if (payload instanceof Array) return { ...state, wadlist: [...payload]};

            throw new Error(`Unknown payload ${payload}`);

        case actions.singleplayer_wadlist_iwads_update:
            if (!payload) throw new Error('You tried to remove iwad list!');

            if (payload instanceof Array) return { ...state, iwads: [...payload]};

            throw new Error(`Unknown payload ${payload}`);
    }

    return state;
}
