import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects';
import { connectRouter } from 'connected-react-router'

import { accountReducer } from './account/reducer';
import { asideMenuReducer } from './aside-menu/';

export const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    account: accountReducer,
    asideMenu: asideMenuReducer
});

export const rootSaga = function* () {
    return yield all([/*accountSaga, turmaSaga, algoritmoSaga, ambienteDevSaga, detalhesUsuarioSaga*/]);
}