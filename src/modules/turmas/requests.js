import { all, call, put, takeLeading } from 'redux-saga/effects';
import { getTurmasByInstrutorRequest, getTurmasByInstrutorSucesso, getTurmasByInstrutorFalha } from './actions/getTurmasByInstrutor';
import { getRequest, formatErrors, postRequest, putRequest } from '../../api';
import { criarTurmaSucesso, criarTurmaFalha, criarTurmaRequest } from './actions/criarTurma';
import { getTurmaByIdSucesso, getTurmaByIdFalha, getTurmaByIdRequest } from './actions/getTurmaById';
import { getInscritosByTurmaSucesso, getInscritosByTurmaFalha, getInscritosByTurmaRequest } from './actions/getInscritosByTurma';
import { confirmarInscricaoSucesso, confirmarInscricaoFalha, confirmarInscricaoRequest } from './actions/confirmarInscricao';

function* obterTurmasPorInstrutorPaged({ payload }) {
    try {
        const response = yield call(getRequest, `/v1/turmas/instrutor`, payload);
        const { data } = response;
        yield put(getTurmasByInstrutorSucesso(data));
    } catch (error) {
        console.log(error);
        yield put(getTurmasByInstrutorFalha(formatErrors(error)));
    }
}

function* criarTurma({ payload }) {
    const { turma, onSuccess, onFailed } = payload;
    try {
        const body = {
            "emailInstrutor": turma.emailInstrutor,
            "dataCriacao": new Date(),
            "nomeTurma": turma.nomeTurma,
            "capacidadeAlunos": parseInt(turma.capacidadeAlunos),
            "dataHoraTermino": turma.dataHoraTermino,
            "urlImagem": turma.urlImagem
        }
        const response = yield call(postRequest, `/v1/turmas`, body);
        const { data } = response;
        yield put(criarTurmaSucesso(data));

        if (onSuccess && typeof onSuccess === "function") {
            onSuccess();
        }
    } catch (error) {
        console.log(error);
        yield put(criarTurmaFalha(formatErrors(error)));

        if (onFailed && typeof onFailed === "function") {
            onFailed(error, formatErrors(error));
        }
    }
}

function* obterTurmaById({ payload }) {
    try {
        const response = yield call(getRequest, `/v1/turmas/${payload}`);
        const { data } = response;
        yield put(getTurmaByIdSucesso(data));
    } catch (error) {
        console.log(error);
        yield put(getTurmaByIdFalha(formatErrors(error)));
    }
}

function* obterUsuariosInscritos({ payload }) {
    try {
        const response = yield call(getRequest, `/v1/turmas/${payload}/inscritos`);
        const { data } = response;
        yield put(getInscritosByTurmaSucesso(data));
    } catch (error) {
        console.log(error);
        yield put(getInscritosByTurmaFalha(formatErrors(error)));
    }
}

function* confirmarInscrito({ payload }) {
    const { idTurma, emailUsuario, isAceito, onSuccess, onFailed } = payload;
    try {
        const response = yield call(putRequest, `/v1/turmas/${idTurma}/acesso`, null, { emailUsuario, isAceito });
        const { data } = response;
        yield put(confirmarInscricaoSucesso(data));

        if (onSuccess && typeof onSuccess === "function") {
            onSuccess();
        }
    } catch (error) {
        yield put(confirmarInscricaoFalha(formatErrors(error)));
        if (onFailed && typeof onFailed === "function") {
            onFailed(error);
        }
    }
}

export default all([
    takeLeading(getTurmasByInstrutorRequest.type, obterTurmasPorInstrutorPaged),
    takeLeading(getTurmaByIdRequest.type, obterTurmaById),
    takeLeading(getInscritosByTurmaRequest.type, obterUsuariosInscritos),
    takeLeading(criarTurmaRequest.type, criarTurma),
    takeLeading(confirmarInscricaoRequest.type, confirmarInscrito)
]);
