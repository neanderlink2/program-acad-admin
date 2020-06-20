import { Button, Card, CardContent, Container, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDocumentTitle } from '../../components/hooks';

export const LoginRequiredScreen = ({ title }) => {
    useDocumentTitle(title);
    const history = useHistory();

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center">Ops, tivemos um problema.</Typography>
                    <Typography variant="body2">
                        Parece que você está tentando acessar uma página protegida, mas ainda não está autenticado ou não possui acesso de Administrador.
                        Deseja entrar em uma conta?
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={() => {
                        history.push('/login');
                    }}>Sim, entrar na conta</Button>
                    <Button variant="text" onClick={() => {
                        history.push('/');
                    }}>Não, voltar ao início</Button>
                </CardContent>
            </Card>
        </Container>
    )
}