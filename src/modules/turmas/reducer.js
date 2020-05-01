import { combineReducers } from 'redux';

import getTurmasByInstrutor from './actions/getTurmasByInstrutor';
import getInscritosByTurma from './actions/getInscritosByTurma';
import confirmarInscricao from './actions/confirmarInscricao';
import criarTurma from './actions/criarTurma';
import getTurmaById from './actions/getTurmaById';


export const turmasReducer = combineReducers({
    list: getTurmasByInstrutor,
    inscritos: getInscritosByTurma,
    criar: criarTurma,
    confirmarInscrito: confirmarInscricao,
    unique: getTurmaById
});