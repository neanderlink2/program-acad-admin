import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Fab, Chip } from '@material-ui/core';
import { Form } from '@unform/web';
import { useRef } from 'react';
import { InputField } from '../../components/unform/input-field';
import { NivelDificuldadeSelect } from '../../components/unform/select-field/nivel-dificuldade-select';
import { CheckBoxField } from '../../components/unform/checkboxes';
import { useParams, useHistory } from 'react-router-dom';
import { useTurmaById } from '../../modules/turmas/hooks';
import { LoadingData } from '../../components/loading-data';
import BackButton from '../../components/buttons/BackButton';
import { Scope } from '@unform/core';
import { EditorField } from './editor';
import { SubmitButton } from '../../components/unform/submit-button';
import { ModalCasosTeste } from './modal-casos-teste';
import { Add, Delete, Settings } from '@material-ui/icons';
import { TesteChipLabel } from './teste-chip-label';
import { useCriarAlgoritmo, useAllLinguagensProgramacao } from '../../modules/algoritmos/hooks';
import * as Yup from 'yup';
import { algoritmoFormSchema } from './schema';
import { toast } from 'react-toastify';

export const NovoAlgoritmoScreen = () => {
    const { idTurma } = useParams();
    const history = useHistory();
    const { turma, isLoading, getTurma } = useTurmaById();
    const formRef = useRef(null);

    const [casosTeste, setCasosTeste] = useState([]);
    const [linguagens, isLoadingLinguagens] = useAllLinguagensProgramacao();

    const { isLoading: isCreatingAlgoritmo, criarAlgoritmo } = useCriarAlgoritmo();

    useEffect(() => {
        if (idTurma) {
            getTurma(idTurma);
        }
    }, [idTurma]);

    async function handleSubmit(data) {
        try {
            formRef.current.setErrors({});
            data.idTurma = idTurma;
            data.dataCriacao = new Date();
            data.nivelDificuldade = parseInt(data.nivelDificuldade);
            data.linguagensPermitidas = Object.keys(data.linguagens).filter(key => data.linguagens[key]);
            data.casosTeste = casosTeste;
            delete data.linguagens;

            if (data) {
                await algoritmoFormSchema.validate(data, { abortEarly: false });
            }

            criarAlgoritmo(data, () => {
                toast.success("Algoritmo publicado com sucesso!");
                history.push(`/turma/${idTurma}`);
            })
        } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                err.errors.forEach(error => {
                    validationErrors[err.path] = error;
                });
                formRef.current.setErrors(validationErrors);
            }
        }
    }

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
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h5">Informações do algoritmo</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ paddingRight: 10 }}>
                        <InputField
                            label="Nome do algoritmo"
                            name="titulo"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ paddingLeft: 10 }}>
                        <NivelDificuldadeSelect
                            label="Nível de dificuldade"
                            name="nivelDificuldade"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h5">Linguagens disponíveis</Typography>
                    </Grid>
                    <Grid item xs={12} justify="space-between">
                        <Scope path="linguagens">
                            {
                                linguagens.map((ling) => (
                                    <CheckBoxField
                                        name={ling.apiIdentifier}
                                        label={ling.name}
                                        defaultValue={true}
                                    />
                                ))
                            }
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
                    <Grid item xs={12} style={{ marginTop: 10, marginBottom: 10 }}>
                        <Typography variant="h5">
                            <span style={{ marginRight: 10 }}>Casos de Teste</span>
                            <ModalCasosTeste toggleButton={(toggle) => <Fab color="primary" onClick={toggle}><Add /></Fab>}
                                onSubmit={(data) => setCasosTeste([...casosTeste, data])} />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {casosTeste.map((teste, i) => (
                            <Chip key={`teste-${i}`}
                                label={<TesteChipLabel
                                    entradas={teste.entradaEsperada}
                                    saidas={teste.saidaEsperada}
                                    tempoExecucao={teste.tempoMaximoExecucao}
                                />}
                                style={{ margin: 10 }}
                                deleteIcon={<Delete />}
                                onDelete={() => setCasosTeste(casosTeste.filter((_, index) => index !== i))}
                            />
                        ))}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <SubmitButton loading={isCreatingAlgoritmo} loadingLabel="Salvando algoritmo...">Publicar algoritmo</SubmitButton>
                    </Grid>
                </Grid>
            </Form>
        </Container>
    )
}