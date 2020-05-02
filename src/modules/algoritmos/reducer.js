import { combineReducers } from 'redux';

import getAlgoritmos from './actions/getAlgoritmos';
import createAlgoritmo from './actions/createAlgoritmo';
import getNiveisDificuldade from './actions/getNiveisDificuldade';
import getLinguagensDisponiveis from './actions/getLinguagensDisponiveis';

export const algoritmosReducer = combineReducers({
    list: getAlgoritmos,
    create: createAlgoritmo,
    niveis: getNiveisDificuldade,
    linguagens: getLinguagensDisponiveis
});