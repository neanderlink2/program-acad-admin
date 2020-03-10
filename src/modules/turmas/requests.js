import { all, call, put, takeLeading } from 'redux-saga/effects';
import { getTurmasByInstrutorRequest, getTurmasByInstrutorSucesso, getTurmasByInstrutorFalha } from './actions/getTurmasByInstrutor';
import { getRequest, formatErrors } from '../../api';


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

export default all([
    takeLeading(getTurmasByInstrutorRequest.type, obterTurmasPorInstrutorPaged)
]);
