import React, { useState } from 'react';
import { PaginatedGrid } from '../../../components/paginated-grid';
import { AlgoritmoGridItem } from './grid-item';
import { FlexLine } from '../../../components/flex-helpers';
import { useParams, useHistory } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useAlgoritmosPagedGrid } from '../../../modules/algoritmos/hooks';

export const TabAlgoritmos = () => {
    const history = useHistory();
    const [busca, setBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [ordenacao, setOrdenacao] = useState(1);
    const [direcaoOrdenacao, setDirecaoOrdenacao] = useState('asc');
    const { idTurma } = useParams();

    const { algoritmos, isLoading } = useAlgoritmosPagedGrid(paginaAtual, busca, ordenacao, direcaoOrdenacao);

    return (
        <>
            <FlexLine style={{ justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.5rem' }}>Algoritmos</span>
                <Fab color="primary" style={{ marginLeft: 10 }} onClick={() => {
                    history.push(`/turma/${idTurma}/algoritmo`);
                }}><Add /></Fab>
            </FlexLine>
            <PaginatedGrid isLoading={isLoading}
                pagedList={algoritmos}
                itemsNotFoundLabel="Nenhum algoritmo foi encontrado..."
                onPageChange={(index) => setPaginaAtual(index)}
                renderItem={(algoritmo) => {
                    return (
                        <AlgoritmoGridItem key={algoritmo.id}
                            descricao={algoritmo.htmlDescricao}
                            linguagensDisponiveis={algoritmo.linguagensDisponiveis}
                            nivelDificuldade={algoritmo.nivelDificuldade}
                            title={algoritmo.titulo}
                            onEditClick={() => {
                                console.log("Algoritmo clicado.");
                            }}
                        />
                    )
                }}
            />
        </>
    );
}