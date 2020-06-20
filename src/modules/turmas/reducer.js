import { combineReducers } from 'redux';
import confirmarInscricao from './actions/confirmarInscricao';
import criarTurma from './actions/criarTurma';
import editarTurma from './actions/editarTurma';
import getInscritosByTurma from './actions/getInscritosByTurma';
import getTurmaById from './actions/getTurmaById';
import getTurmasByInstrutor from './actions/getTurmasByInstrutor';



export const turmasReducer = combineReducers({
    list: getTurmasByInstrutor,
    inscritos: getInscritosByTurma,
    criar: criarTurma,
    editar: editarTurma,
    confirmarInscrito: confirmarInscricao,
    unique: getTurmaById
});