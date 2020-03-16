import { combineReducers } from 'redux';

import getAlgoritmos from './actions/getAlgoritmos';

export const algoritmosReducer = combineReducers({
    list: getAlgoritmos
});