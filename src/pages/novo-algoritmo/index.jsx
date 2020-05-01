import React, { useEffect } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { Form } from '@unform/web';
import { useRef } from 'react';
import { InputField } from '../../components/unform/input-field';
import { SelectField } from '../../components/unform/select-field';
import { CheckBoxField } from '../../components/unform/checkboxes';
import { useParams } from 'react-router-dom';
import { useTurmaById } from '../../modules/turmas/hooks';
import { LoadingData } from '../../components/loading-data';
import BackButton from '../../components/buttons/BackButton';
import { Scope } from '@unform/core';
import { EditorField } from './editor';
import { SubmitButton } from '../../components/unform/submit-button';

export const NovoAlgoritmoScreen = () => {
    const { idTurma } = useParams();
    const { turma, isLoading, getTurma } = useTurmaById();
    const formRef = useRef(null);

    useEffect(() => {
        if (idTurma) {
            getTurma(idTurma);
        }
    }, [idTurma]);

    if (isLoading) {
        return (
            <LoadingData
                message="Buscando dados da turma..."
            />
        )
    }

    return (
        <Container>
            <BackButton
                route={`/turma/${idTurma}`}
            />
            <Typography variant="body1">Adicionando algoritmo para a turma <Typography variant="h4">{turma.nomeTurma}</Typography></Typography>
            <Form ref={formRef} onSubmit={(data) => {
                console.log("DATA", data);
            }}>
                <Grid container>
                    <Grid item xs={12} sm={6} style={{ paddingRight: 10 }}>
                        <InputField
                            label="Nome do algoritmo"
                            name="titulo"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ paddingLeft: 10 }}>
                        <SelectField
                            label="Nível de dificuldade"
                            name="nivelDificuldade"
                            fullWidth
                            margin="normal"
                            options={[{ value: 1, display: 'Muito fácil' }, { value: 2, display: 'Fácil' }]}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="body1">Linguagens disponíveis</Typography>
                    </Grid>
                    <Grid item xs={12} justify="space-between">
                        <Scope path="linguagens">
                            <CheckBoxField
                                name="csharp"
                                label="C#"
                                defaultValue={true}
                            />
                            <CheckBoxField
                                name="java"
                                label="Java"
                                defaultValue={true}
                            />
                            <CheckBoxField
                                name="python3"
                                label="Python"
                                defaultValue={true}
                            />
                            <CheckBoxField
                                name="nodejs"
                                label="JavaScript"
                                defaultValue={true}
                            />
                        </Scope>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <EditorField
                            name="htmlDescricao"
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <SubmitButton loading={false} loadingLabel="Salvando algoritmo...">Cadastrar algoritmo</SubmitButton>
                    </Grid>
                </Grid>
            </Form>
        </Container>
    )
}