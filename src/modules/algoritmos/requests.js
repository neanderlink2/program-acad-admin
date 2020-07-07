import { all, call, put, takeLeading } from 'redux-saga/effects';
import { formatErrors, getRequest, postRequest, putRequest } from '../../api';
import { createAlgoritmoFalha, createAlgoritmoRequest, createAlgoritmoSucesso } from './actions/createAlgoritmo';
import { editAlgoritmoFalha, editAlgoritmoRequest, editAlgoritmoSucesso } from './actions/editAlgoritmo';
import { getAlgoritmoPorIdFalha, getAlgoritmoPorIdRequest, getAlgoritmoPorIdSucesso } from './actions/getAlgoritmoPorId';
import { getAlgoritmosFalha, getAlgoritmosRequest, getAlgoritmosSucesso } from './actions/getAlgoritmos';
import { getAlgoritmosConcluidosPorTurmaFalha, getAlgoritmosConcluidosPorTurmaRequest, getAlgoritmosConcluidosPorTurmaSucesso } from './actions/getAlgoritmosConcluidosPorTurma';
import { getLinguagensDisponiveisFalha, getLinguagensDisponiveisRequest, getLinguagensDisponiveisSucesso } from './actions/getLinguagensDisponiveis';
import { getNiveisDificuldadeFalha, getNiveisDificuldadeRequest, getNiveisDificuldadeSucesso } from './actions/getNiveisDificuldade';
import { getTestesPorAlgoritmoFalha, getTestesPorAlgoritmoRequest, getTestesPorAlgoritmoSucesso } from './actions/getTestesPorAlgoritmo';

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

function* editarAlgoritmo({ payload }) {
    const { data: payloadData, onSuccess, onFailed } = payload;
    try {
        const response = yield call(putRequest, `/v1/algoritmos`, payloadData);
        const { data } = response;
        yield put(editAlgoritmoSucesso(data));
        if (onSuccess && typeof onSuccess === "function") {
            onSuccess(data);
        }
    } catch (error) {
        yield put(editAlgoritmoFalha(formatErrors(error)));
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

function* obterAlgoritmoPorId({ payload }) {
    try {
        const response = yield call(getRequest, `/v1/algoritmos/${payload}`);
        const { data } = response;
        yield put(getAlgoritmoPorIdSucesso(data));
    } catch (error) {
        yield put(getAlgoritmoPorIdFalha(formatErrors(error)));
    }
}

function* obterTestesPorAlgoritmo({ payload }) {
    try {
        const response = yield call(getRequest, `/v1/algoritmos/${payload}/testes`);
        const { data } = response;
        yield put(getTestesPorAlgoritmoSucesso(data));
    } catch (error) {
        yield put(getTestesPorAlgoritmoFalha(formatErrors(error)));
    }
}

function* obterUsuarioConcluiramAlgoritmo({ payload }) {
    try {
        const response = yield call(getRequest, `/v1/algoritmos/${payload}/concluidos`);
        const { data } = response;
        yield put(getAlgoritmosConcluidosPorTurmaSucesso(data));
    } catch (error) {
        yield put(getAlgoritmosConcluidosPorTurmaFalha(formatErrors(error)));
    }
}

export default all([
    takeLeading(getAlgoritmosRequest.type, obterAlgoritmosPaged),
    takeLeading(createAlgoritmoRequest.type, criarAlgoritmo),
    takeLeading(getLinguagensDisponiveisRequest.type, obterLinguagensDisponiveis),
    takeLeading(getNiveisDificuldadeRequest.type, obterNiveisDificuldade),
    takeLeading(getAlgoritmoPorIdRequest.type, obterAlgoritmoPorId),
    takeLeading(getTestesPorAlgoritmoRequest.type, obterTestesPorAlgoritmo),
    takeLeading(getAlgoritmosConcluidosPorTurmaRequest.type, obterUsuarioConcluiramAlgoritmo),
    takeLeading(editAlgoritmoRequest.type, editarAlgoritmo),
]);
