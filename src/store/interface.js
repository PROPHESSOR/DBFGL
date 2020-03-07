/* eslint-disable camelcase, default-case */

const store = {

    /**
     * @type {"singleplayer"|"multiplayer"}
     */
    tab: 'singleplayer',
};

export const actions = {
    interface_tab_change: 'interface.tab.change',
};


export function reducer(state = store, action) {
    const { type, payload } = action;

    switch (type) {
        case actions.interface_tab_change:
            return {
                tab: payload,
            };
    }


    return state;
}
