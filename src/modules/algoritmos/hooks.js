import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createAlgoritmoRequest } from "./actions/createAlgoritmo";
import { editAlgoritmoRequest } from "./actions/editAlgoritmo";
import { getAlgoritmoPorIdRequest, getAlgoritmoPorIdSucesso } from "./actions/getAlgoritmoPorId";
import { getAlgoritmosRequest } from "./actions/getAlgoritmos";
import { getAlgoritmosConcluidosPorTurmaRequest, getAlgoritmosConcluidosPorTurmaSucesso } from "./actions/getAlgoritmosConcluidosPorTurma";
import { getLinguagensDisponiveisRequest } from "./actions/getLinguagensDisponiveis";
import { getNiveisDificuldadeRequest } from "./actions/getNiveisDificuldade";
import { getTestesPorAlgoritmoRequest } from "./actions/getTestesPorAlgoritmo";

export const useAlgoritmosPagedGrid = (index, term, ordenacao, direcao) => {
    const dispatch = useDispatch();
    const { idTurma } = useParams();
    const { algoritmos, isLoading } = useSelector(states => ({
        algoritmos: states.algoritmos.list.successPayload,
        isLoading: states.algoritmos.list.isRequesting
    }));

    const buscarAlgoritmos = useCallback((term, index, ordenacao, direcao) => {
        dispatch(getAlgoritmosRequest({
            filter: {
                busca: term,
                pageIndex: index,
                totalItems: 6,
                colunaOrdenacao: ordenacao,
                direcaoOrdenacao: direcao
            },
            idTurma
        }));
    }, [idTurma]);

    useEffect(() => {
        buscarAlgoritmos(term, index, ordenacao, direcao);
    }, []);

    useEffect(() => {
        buscarAlgoritmos(term, index, ordenacao, direcao);
    }, [dispatch, index, term, ordenacao, direcao]);

    return { algoritmos, isLoading };
}

export const useCriarAlgoritmo = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(states => ({
        isLoading: states.algoritmos.create.isRequesting || states.algoritmos.edit.isRequesting
    }));
    const criarAlgoritmo = useCallback((data, onSuccess, onFailed) => {
        dispatch(createAlgoritmoRequest({ data, onSuccess, onFailed }));
    }, [dispatch]);

    const editarAlgoritmo = useCallback((idAlgoritmo, data, onSuccess, onFailed) => {
        data.id = idAlgoritmo;
        dispatch(editAlgoritmoRequest({ data, onSuccess, onFailed }));
    }, [dispatch]);

    return { isLoading, criarAlgoritmo, editarAlgoritmo };
}

export const useAllLinguagensProgramacao = () => {
    const dispatch = useDispatch();

    const { isLoading, linguagens } = useSelector(states => ({
        isLoading: states.algoritmos.linguagens.isRequesting,
        linguagens: states.algoritmos.linguagens.successPayload,
    }));

    useEffect(() => {
        if (linguagens.length === 0) {
            dispatch(getLinguagensDisponiveisRequest());
        }
    }, []);

    return [linguagens, isLoading];
}

export const useSelectNiveisDificuldade = () => {
    const dispatch = useDispatch();

    const { isLoading, niveis } = useSelector(states => ({
        isLoading: states.algoritmos.niveis.isRequesting,
        niveis: states.algoritmos.niveis.successPayload,
    }));

    useEffect(() => {
        if (niveis.length === 0) {
            dispatch(getNiveisDificuldadeRequest());
        }
    }, []);

    const select = useMemo(() => (niveis.map((nivel) => ({
        value: nivel.id,
        display: nivel.name
    }))), [niveis]);

    return [select, isLoading];
}

export const useAlgoritmoPorId = () => {
    const dispatch = useDispatch();

    const { algoritmo, isLoading } = useSelector(state => ({
        algoritmo: state.algoritmos.unique.successPayload,
        isLoading: state.algoritmos.unique.isRequesting
    }));

    const buscarAlgoritmoPorId = useCallback((idAlgoritmo) => {
        dispatch(getAlgoritmoPorIdRequest(idAlgoritmo));
    }, [dispatch]);

    const limparAlgoritmo = useCallback(() => {
        dispatch(getAlgoritmoPorIdSucesso(undefined));
    }, [dispatch]);

    return [algoritmo, isLoading, buscarAlgoritmoPorId, limparAlgoritmo];
}

export const useTestesPorAlgoritmo = () => {
    const dispatch = useDispatch();

    const { testes, isLoading } = useSelector(state => ({
        testes: state.algoritmos.testes.successPayload,
        isLoading: state.algoritmos.testes.isRequesting
    }));

    const buscarTestes = useCallback((idAlgoritmo) => {
        dispatch(getTestesPorAlgoritmoRequest(idAlgoritmo));
    }, [dispatch]);

    return [testes, isLoading, buscarTestes];
}

export const useUsuariosConcluiramAlgoritmo = () => {
    const dispatch = useDispatch();

    const { usuarioConcluiram, isLoading } = useSelector(state => ({
        usuarioConcluiram: state.algoritmos.usuariosConcluiram.successPayload,
        isLoading: state.algoritmos.usuariosConcluiram.isRequesting
    }));

    const buscarUsuariosConcluiramPorId = useCallback((idAlgoritmo) => {
        dispatch(getAlgoritmosConcluidosPorTurmaRequest(idAlgoritmo));
    }, [dispatch]);

    const limparUsuariosConcluiram = useCallback(() => {
        dispatch(getAlgoritmosConcluidosPorTurmaSucesso(undefined));
    }, [dispatch]);

    return [usuarioConcluiram, isLoading, buscarUsuariosConcluiramPorId, limparUsuariosConcluiram];
}