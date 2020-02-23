import { useReducer } from 'react';

export const SHOW_MENU = '@asideMenu/SHOW_MENU';
export const HIDE_MENU = '@asideMenu/HIDE_MENU';

const initialState = {
    showAsideMenu: false
};


export function asideMenuReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_MENU:
            return {
                ...state,
                showAsideMenu: true
            };
        case HIDE_MENU:
            return {
                ...state,
                showAsideMenu: false
            };
        default:
            return state;
    }
}