import { all, call, put, takeLeading } from 'redux-saga/effects';
import { getRequest, formatErrors, postRequest } from '../../api';
import { getAlgoritmosRequest, getAlgoritmosSucesso, getAlgoritmosFalha } from './actions/getAlgoritmos';

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

export default all([
    takeLeading(getAlgoritmosRequest.type, obterAlgoritmosPaged)
]);
