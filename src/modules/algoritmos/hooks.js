import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
import { getAlgoritmosRequest } from "./actions/getAlgoritmos";
import { useParams } from "react-router-dom";
import { createAlgoritmoRequest } from "./actions/createAlgoritmo";
import { getLinguagensDisponiveisRequest } from "./actions/getLinguagensDisponiveis";
import { getNiveisDificuldadeRequest } from "./actions/getNiveisDificuldade";

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
        isLoading: states.algoritmos.create.isRequesting
    }));
    const criarAlgoritmo = useCallback((data, onSuccess, onFailed) => {
        dispatch(createAlgoritmoRequest({ data, onSuccess, onFailed }));
    }, [dispatch]);

    return { isLoading, criarAlgoritmo };
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