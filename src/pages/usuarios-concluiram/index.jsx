import { Container, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/buttons/BackButton';
import { LoadingScreen } from '../../components/loading';
import { useUsuariosConcluiramAlgoritmo } from '../../modules/algoritmos/hooks';
import GridUsuarioConcluiuAlgoritmo from './grid-usuario-concluiu-algoritmo';
import { ThreeColumnGrid } from './styles';

export default function UsuarioConcluiramScreen() {
    const { idAlgoritmo, idTurma } = useParams();
    const [usuarios, loadingUsuarios, buscarUsuarios] = useUsuariosConcluiramAlgoritmo();

    useEffect(() => {
        if (idAlgoritmo) {
            buscarUsuarios(idAlgoritmo);
        }
    }, [idAlgoritmo]);

    if (loadingUsuarios) {
        return <LoadingScreen />
    }

    return (
        <Container>
            <BackButton
                route={`/turma/${idTurma}`}
            />
            <Typography variant="h4">
                Usuários completaram esse algoritmo
            </Typography>
            <Typography variant="h6"><b>{usuarios.length}</b> alunos concluíram</Typography>
            <ThreeColumnGrid>
                {
                    usuarios.map((usuario) => (
                        <GridUsuarioConcluiuAlgoritmo
                            nomeAlgoritmo={usuario.nomeAlgoritmo}
                            nickname={usuario.nicknameUsuario}
                            nomeAluno={usuario.nomeUsuario}
                            linguagemUtilizada={usuario.nomeLinguagem}
                            dataConclusao={new Date(usuario.dataConclusao)}
                        />
                    ))
                }
            </ThreeColumnGrid>
        </Container>
    )
}
