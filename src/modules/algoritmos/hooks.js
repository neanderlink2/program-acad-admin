import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { getAlgoritmosRequest } from "./actions/getAlgoritmos";
import { useParams } from "react-router-dom";

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