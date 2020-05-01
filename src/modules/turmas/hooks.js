import { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getTurmasByInstrutorRequest } from "./actions/getTurmasByInstrutor";
import { criarTurmaRequest } from "./actions/criarTurma";
import { getInscritosByTurmaRequest } from "./actions/getInscritosByTurma";
import { confirmarInscricaoRequest } from "./actions/confirmarInscricao";
import { getTurmaByIdRequest } from "./actions/getTurmaById";

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

export const useUsuariosInscritos = (idTurma) => {
    const dispatch = useDispatch();

    const { inscritos, isLoading } = useSelector(states => ({
        inscritos: states.turmas.inscritos.successPayload,
        isLoading: states.turmas.inscritos.isRequesting,
    }));

    const atualizarInscritos = useCallback(() => {
        if (idTurma) {
            dispatch(getInscritosByTurmaRequest(idTurma));
        }
    }, [idTurma]);

    const confirmarSolicitacaoAcesso = useCallback((emailUsuario, isAceito, onSuccess, onFailed) => {
        if (idTurma) {
            dispatch(confirmarInscricaoRequest({ idTurma, emailUsuario, isAceito, onSuccess, onFailed }));
        }
    }, [idTurma]);

    useEffect(() => {
        atualizarInscritos();
    }, [atualizarInscritos]);

    return { inscritos, isLoading, atualizarInscritos, confirmarSolicitacaoAcesso };
}

export const useTurmaById = () => {
    const dispatch = useDispatch();

    const { turma, isLoading } = useSelector(states => ({
        turma: states.turmas.unique.successPayload,
        isLoading: states.turmas.unique.isRequesting,
    }));

    const getTurma = useCallback((idTurma) => {
        dispatch(getTurmaByIdRequest(idTurma));
    }, [dispatch]);

    return { getTurma, turma, isLoading };
}