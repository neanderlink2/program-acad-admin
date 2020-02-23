import authHandler from './actions/authHandler';
import { combineReducers } from 'redux';

export const accountReducer = combineReducers({
    auth: authHandler
});