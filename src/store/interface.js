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
    switch (action) {
        case actions.interface_tab_change:
            return {
                tab: action.payload,
            };
    }


    return state;
}
