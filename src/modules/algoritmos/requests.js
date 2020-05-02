import { all, call, put, takeLeading } from 'redux-saga/effects';
import { getRequest, formatErrors, postRequest } from '../../api';
import { getAlgoritmosRequest, getAlgoritmosSucesso, getAlgoritmosFalha } from './actions/getAlgoritmos';
import { createAlgoritmoSucesso, createAlgoritmoFalha, createAlgoritmoRequest } from './actions/createAlgoritmo';
import { getLinguagensDisponiveisSucesso, getLinguagensDisponiveisFalha, getLinguagensDisponiveisRequest } from './actions/getLinguagensDisponiveis';
import { getNiveisDificuldadeSucesso, getNiveisDificuldadeFalha, getNiveisDificuldadeRequest } from './actions/getNiveisDificuldade';

function* obterAlgoritmosPaged({ payload }) {
    try {
        const { filter, idTurma } = payload;
        const response = yield call(getRequest, `/v1/algoritmos/turma/${idTurma}`, filter);
        const { data } = response;
        yield put(getAlgoritmosSucesso(data));
    } catch (error) {
        console.log(error);
        yield put(getAlgoritmosFalha(formatErrors(error)));
    }
}

function* criarAlgoritmo({ payload }) {
    const { data: payloadData, onSuccess, onFailed } = payload;
    try {
        const response = yield call(postRequest, `/v1/algoritmos`, payloadData);
        const { data } = response;
        yield put(createAlgoritmoSucesso(data));
        if (onSuccess && typeof onSuccess === "function") {
            onSuccess(data);
        }
    } catch (error) {
        yield put(createAlgoritmoFalha(formatErrors(error)));
        if (onFailed && typeof onFailed === "function") {
            onFailed(error);
        }
    }
}

function* obterLinguagensDisponiveis() {
    try {
        const response = yield call(getRequest, `/v1/turmas/linguagens-programacao`);
        const { data } = response;
        yield put(getLinguagensDisponiveisSucesso(data));
    } catch (error) {
        yield put(getLinguagensDisponiveisFalha(formatErrors(error)));
    }
}

function* obterNiveisDificuldade() {
    try {
        const response = yield call(getRequest, `/v1/turmas/niveis-dificuldade`);
        const { data } = response;
        yield put(getNiveisDificuldadeSucesso(data));
    } catch (error) {
        yield put(getNiveisDificuldadeFalha(formatErrors(error)));
    }
}

export default all([
    takeLeading(getAlgoritmosRequest.type, obterAlgoritmosPaged),
    takeLeading(createAlgoritmoRequest.type, criarAlgoritmo),
    takeLeading(getLinguagensDisponiveisRequest.type, obterLinguagensDisponiveis),
    takeLeading(getNiveisDificuldadeRequest.type, obterNiveisDificuldade),
]);
