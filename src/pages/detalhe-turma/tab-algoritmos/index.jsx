import React, { useState } from 'react';
import { PaginatedGrid } from '../../../components/paginated-grid';
import { AlgoritmoGridItem } from './grid-item';
import { FlexLine } from '../../../components/flex-helpers';
import { useParams } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

export const TabAlgoritmos = () => {
    const [busca, setBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [ordenacao, setOrdenacao] = useState(1);
    const [direcaoOrdenacao, setDirecaoOrdenacao] = useState('asc');
    const { idTurma } = useParams();
    return (
        <>
            <FlexLine style={{ justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.5rem' }}>Algoritmos</span>
                <Fab color="primary" style={{ marginLeft: 10 }} onClick={() => {
                    //history.push(`/turma/${idTurma}/algoritmo/cadastro`);
                }}><Add /></Fab>
            </FlexLine>
            <PaginatedGrid isLoading={false}
                pagedList={{
                    "totalPages": 0,
                    "pageIndex": 0,
                    "items": [{
                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "idTurmaPertencente": "3fa84f64-5717-4562-b3fc-2c963f66afa6",
                        "nomeTurma": "Teste",
                        "pontosNessaTurma": 0,
                        "titulo": "Teste",
                        "htmlDescricao": "<h1>Testando</h1>",
                        "idNivelDificuldade": 1,
                        "nivelDificuldade": "Fácil",
                        "linguagensDisponiveis": [
                            "nodejs"
                        ],
                        "isResolvido": false,
                        "dataCriacao": "2020-03-16T12:20:53.280Z"
                    }],
                    "hasNextPage": false,
                    "hasPreviousPage": false,
                    "totalItems": 0
                }}
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