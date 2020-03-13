import { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getTurmasByInstrutorRequest } from "./actions/getTurmasByInstrutor";
import { criarTurmaRequest } from "./actions/criarTurma";

export const useTurmaPagedGrid = (index, term, ordenacao, direcao) => {
    const dispatch = useDispatch();

    const { turmas, isLoading } = useSelector(states => ({
        turmas: states.turmas.list.successPayload,
        isLoading: states.turmas.list.isRequesting
    }));

    const buscarTurmas = useCallback((term, index, ordenacao, direcao) => {
        dispatch(getTurmasByInstrutorRequest({
            busca: term,
            pageIndex: index,
            totalItems: 6,
            colunaOrdenacao: ordenacao,
            direcaoOrdenacao: direcao
        }));
    })

    useEffect(() => {
        buscarTurmas(term, index, ordenacao, direcao);
    }, [])

    useEffect(() => {
        buscarTurmas(term, index, ordenacao, direcao);
    }, [dispatch, index, term, ordenacao, direcao]);

    return { turmas, isLoading };
}

export const useCriacaoTurma = () => {
    const dispatch = useDispatch();

    const { isRequesting } = useSelector(states => ({
        ...states.turmas.criar
    }))

    const cadastrarTurma = useCallback((turma, onSuccess, onFailed) => {
        dispatch(criarTurmaRequest({ turma, onSuccess, onFailed }));
    }, [dispatch]);

    return { cadastrarTurma, isRequesting };
}