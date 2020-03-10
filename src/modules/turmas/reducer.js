import getTurmasByInstrutor from './actions/getTurmasByInstrutor';
import { combineReducers } from 'redux';

export const turmasReducer = combineReducers({
    list: getTurmasByInstrutor
});