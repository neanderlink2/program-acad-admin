import { Container, Fab, Tab, Tabs, Typography } from '@material-ui/core';
import { Assignment, Casino, Edit, People } from '@material-ui/icons';
import { format, parse } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BackButton from '../../components/buttons/BackButton';
import { LoadingScreen } from '../../components/loading';
import TabPanel, { tabPanelProps } from '../../components/tab-panel';
import { useTurmaById } from '../../modules/turmas/hooks';
import { ContainerDadosTurma, DadosWrapper, FotoTurma, LinhaDadosInferior } from './styles';
import { TabAlgoritmos } from './tab-algoritmos';
import { TabUsuariosInscritos } from './tab-inscritos';
import TabPontuacao from './tab-pontuacao';

export const DetalheTurmaScreen = () => {
    const { idTurma } = useParams();
    const [tabIndex, setTabIndex] = useState(0);
    const history = useHistory();

    const { turma, isLoading, getTurma } = useTurmaById();

    useEffect(() => {
        getTurma(idTurma);
    }, [idTurma]);

    if (isLoading && !turma) {
        return <LoadingScreen />
    }

    return (
        <Container>
            <BackButton route="/" />

            <ContainerDadosTurma>
                <FotoTurma src={turma?.urlImagem} />
                <DadosWrapper>
                    <Typography variant="h2">
                        {turma?.nomeTurma}
                        <Fab color="primary" style={{ marginLeft: 10 }} onClick={() => history.push(`/turma/${idTurma}/edicao`)}>
                            <Edit />
                        </Fab>
                    </Typography>
                    <LinhaDadosInferior>
                        <Typography variant="body2">Instruído por Prof. {turma?.nomeInstrutor}</Typography>
                        <Typography variant="body2">
                            Finaliza em
                            {turma?.dataHoraTermino ? format(parse(turma.dataHoraTermino, "yyyy-MM-dd'T'HH:mm:ss", new Date()), "' 'dd/MM/yyyy 'às' HH:mm") : ''}
                        </Typography>
                        <Typography variant="body2">
                            Máximo de {turma?.capacidadeAlunos} alunos
                        </Typography>
                    </LinhaDadosInferior>
                </DadosWrapper>
            </ContainerDadosTurma>


            <Tabs value={tabIndex} onChange={(evt, newValue) => setTabIndex(newValue)}>
                <Tab icon={<Assignment />} label="Algoritmos" {...tabPanelProps(0)} />
                <Tab icon={<People />} label="Usuários inscritos" {...tabPanelProps(1)} />
                <Tab icon={<Casino />} label="Pontuação da turma" {...tabPanelProps(2)} />
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
                <TabAlgoritmos />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <TabUsuariosInscritos />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                <TabPontuacao />
            </TabPanel>
        </Container>
    )
}