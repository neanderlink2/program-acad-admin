import React, { Fragment, useState } from 'react';
import { Typography, Container } from '@material-ui/core';
import { WhiteSection, LogoProgramAcad, CenterSection, SectionText } from './styles';
import { Section } from './sections';
import { useDocumentTitle } from '../../components/hooks';
import { PaginatedGrid } from './paginated-grid';
import { TurmaGridItem } from './paginated-grid/grid-item';
import { useHistory } from 'react-router-dom';

export const HomeScreen = ({ title }) => {
    const [busca, setBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [ordenacao, setOrdenacao] = useState(1);
    const [direcaoOrdenacao, setDirecaoOrdenacao] = useState('asc');

    const history = useHistory();

    useDocumentTitle(title);

    const onEntrarClick = (idTurma) => {
        //escolherTurma(turma.id);
        history.push(`/algoritmos/${idTurma}`);
    };

    return (
        <Container>
            <Typography variant="h5">Minhas turmas</Typography>

            <PaginatedGrid isLoading={isBuscandoTurmas}
                pagedList={turmas}
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
                                onEntrarClick(item.id);
                            }} />
                    )
                }}
            />
        </Container>
    );
}