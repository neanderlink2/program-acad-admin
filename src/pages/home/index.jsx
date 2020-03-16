import React, { Fragment, useState } from 'react';
import { Typography, Container, Button, Fab } from '@material-ui/core';
import { WhiteSection, LogoProgramAcad, CenterSection, SectionText } from './styles';
import { useDocumentTitle } from '../../components/hooks';
import { PaginatedGrid } from '../../components/paginated-grid';
import { TurmaGridItem } from './grid-item';
import { useHistory } from 'react-router-dom';
import { useTurmaPagedGrid } from '../../modules/turmas/hooks';
import { Add } from '@material-ui/icons';

export const HomeScreen = ({ title }) => {
    const [busca, setBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [ordenacao, setOrdenacao] = useState(1);
    const [direcaoOrdenacao, setDirecaoOrdenacao] = useState('asc');

    const history = useHistory();

    useDocumentTitle(title);
    const { turmas, isLoading } = useTurmaPagedGrid(paginaAtual, busca, ordenacao, direcaoOrdenacao);

    const onEntrarClick = (idTurma) => {
        history.push(`/turma/${idTurma}`);
    };
    return (
        <Container>
            <Typography variant="h5">
                Minhas turmas
                <Fab color="primary" style={{ marginLeft: 10 }} onClick={() => {
                    history.push(`/novaturma`);
                }}><Add /></Fab>
            </Typography>

            <PaginatedGrid isLoading={isLoading}
                pagedList={turmas}
                itemsNotFoundLabel="Nenhuma turma foi encontrada..."
                onPageChange={(index) => setPaginaAtual(index)}
                renderItem={(turma) => {
                    return (
                        <TurmaGridItem key={turma.id}
                            image={turma.imagemTurma}
                            imageAlt={turma.titulo}
                            instrutor={turma.nomeInstrutor}
                            isUsuarioInscrito={turma.isUsuarioInscrito}
                            dataHoraTermino={turma.dataTermino}
                            title={turma.titulo}
                            onItemClicked={() => {
                                onEntrarClick(turma.id);
                            }} />
                    )
                }}
            />
        </Container>
    );
}