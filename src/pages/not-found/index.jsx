import React from 'react';
import { Container, CardContent, Card, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDocumentTitle, useUserData } from '../../components/hooks';
import { LoadingScreen } from '../../components/loading';

export const NotFoundScreen = ({ title }) => {
    useDocumentTitle(title);
    const history = useHistory();

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center">Opa, parece que um conteúdo não pôde ser encontrado...</Typography>
                    <Typography variant="body2">
                        Parece que você está tentando acessar uma página que não foi encontrada ou não existe.
                    </Typography>
                    <Button variant="text" onClick={() => {
                        history.push('/');
                    }}>Voltar ao início</Button>
                </CardContent>
            </Card>
        </Container>
    )
}