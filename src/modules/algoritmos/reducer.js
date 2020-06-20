import { combineReducers } from 'redux';
import createAlgoritmo from './actions/createAlgoritmo';
import editAlgoritmo from './actions/editAlgoritmo';
import getAlgoritmoPorId from './actions/getAlgoritmoPorId';
import getAlgoritmos from './actions/getAlgoritmos';
import getLinguagensDisponiveis from './actions/getLinguagensDisponiveis';
import getNiveisDificuldade from './actions/getNiveisDificuldade';
import getTestesPorAlgoritmo from './actions/getTestesPorAlgoritmo';


export const algoritmosReducer = combineReducers({
    list: getAlgoritmos,
    create: createAlgoritmo,
    edit: editAlgoritmo,
    niveis: getNiveisDificuldade,
    linguagens: getLinguagensDisponiveis,
    unique: getAlgoritmoPorId,
    testes: getTestesPorAlgoritmo
});