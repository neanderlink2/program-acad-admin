import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects';
import { connectRouter } from 'connected-react-router'

import { asideMenuReducer } from './aside-menu';
import { accountReducer } from './account/reducer';
import { turmasReducer } from './turmas/reducer';

import turmasSaga from './turmas/requests';


export const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    account: accountReducer,
    asideMenu: asideMenuReducer,
    turmas: turmasReducer
});

export const rootSaga = function* () {
    return yield all([turmasSaga]);
}