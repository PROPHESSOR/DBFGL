/* eslint-disable camelcase, default-case */

/**
 * @typedef {{
    mode: number;
    type: string;
    instagib: boolean;
    buckshot: boolean;
 }} GameMode
 */

/**
 * @typedef {{
    ip: string;
    port: number;
    name: string;
    numPlayers: number;
    pwads: Array<string>;
    gameType: GameMode;
    iwad: string;
    version: string;
 }} ServerInstance
 */

const store = {

    /**
     * @type {Array<ServerInstance>}
     */
    serverlist: [],
    selected:   null,
};

export const actions = {
    multiplayer_serverlist_update:        'multiplayer.serverlist.update',
    multiplayer_serverlist_add:           'multiplayer.serverlist.add',
    multiplayer_serverlist_server_update: 'multiplayer.serverlist.server.update', //{ipport, data}
    multiplayer_serverlist_select:        'multiplayer.serverlist.select',
};

/**
 *
 * @param {Array<ServerInstance>} serverlist
 */
function sortServerlist(serverlist) {
    return serverlist.sort((a, b) => (b.numPlayers || -1) - (a.numPlayers || -1));
}

/**
 *
 * @param {import('./index').Action} action
 */
// eslint-disable-next-line complexity
export function reducer(state = store, action) {

    const { type, payload } = action;

    switch (type) {
        case actions.multiplayer_serverlist_update:
            if (!(payload instanceof Array)) throw new Error('You must specify an array to update serverlist');

            return { ...state, serverlist: sortServerlist(payload), selected: null };

        case actions.multiplayer_serverlist_add:
            if (!payload || payload instanceof Array) throw new Error('You must specify a server to add');

            return { ...state, serverlist: sortServerlist([...state.serverlist, payload]) };

        case actions.multiplayer_serverlist_server_update: {
            const { index, diff } = payload;

            if (!(typeof index === 'string' && index.includes('.') && index.includes(':') && diff)) throw new Error(`You must specify 'index' ("ip:port") and 'diff' values!`);

            return { ...state, serverlist: sortServerlist(state.serverlist.map(server => `${server.ip}:${server.port}` === index ? { ...server, ...diff } : server)) };
        }

        case actions.multiplayer_serverlist_select:
            if (!(typeof payload === 'number')) throw new Error('Selected server id must be a number!');
            if (payload < 0 || payload >= state.serverlist.length) throw new Error(`Selected id must be > 0 and < ${state.serverlist.length}!`);

            return { ...state, selected: payload };
    }

    return state;
}
