import { combineReducers } from 'redux';

import getTurmasByInstrutor from './actions/getTurmasByInstrutor';
import criarTurma from './actions/criarTurma';


export const turmasReducer = combineReducers({
    list: getTurmasByInstrutor,
    criar: criarTurma
});