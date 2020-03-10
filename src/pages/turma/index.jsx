import React from 'react';
import { Container, TextField, Grid } from '@material-ui/core';
import { ImageUpload } from './image-upload';

export const TurmaForm = () => {
    return (
        <Container>
            <span>Formulário da turma</span>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Nome da turma"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        label="Data de encerramento"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ImageUpload />
                </Grid>
            </Grid>

        </Container>
    )
}