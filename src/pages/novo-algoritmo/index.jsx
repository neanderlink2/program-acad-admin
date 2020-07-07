import { Chip, CircularProgress, Container, Fab, Grid, Typography } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import { Scope } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import BackButton from '../../components/buttons/BackButton';
import { LoadingData } from '../../components/loading-data';
import { CheckBoxField } from '../../components/unform/checkboxes';
import { InputField } from '../../components/unform/input-field';
import { NivelDificuldadeSelect } from '../../components/unform/select-field/nivel-dificuldade-select';
import { SubmitButton } from '../../components/unform/submit-button';
import { useAlgoritmoPorId, useAllLinguagensProgramacao, useCriarAlgoritmo, useTestesPorAlgoritmo } from '../../modules/algoritmos/hooks';
import { useTurmaById } from '../../modules/turmas/hooks';
import { EditorField } from './editor';
import { ModalCasosTeste } from './modal-casos-teste';
import { algoritmoFormSchema } from './schema';
import { TesteChipLabel } from './teste-chip-label';

export const NovoAlgoritmoScreen = () => {
    const { idTurma, idAlgoritmo } = useParams();
    const history = useHistory();
    const { turma, isLoading, getTurma } = useTurmaById();
    const formRef = useRef(null);

    const [casosTeste, setCasosTeste] = useState([]);
    const [linguagens, isLoadingLinguagens] = useAllLinguagensProgramacao();

    const { isLoading: isCreatingAlgoritmo, criarAlgoritmo, editarAlgoritmo } = useCriarAlgoritmo();
    const [algoritmo, isLoadingAlgoritmo, buscarAlgoritmo, limparAlgoritmo] = useAlgoritmoPorId();
    const [casosTesteAlgoritmo, isLoadingTestes, buscarTestes] = useTestesPorAlgoritmo();    

    const editandoAlgoritmo = useMemo(
        () => !!idAlgoritmo,
        [idAlgoritmo]);

    useEffect(() => {
        if (idTurma) {
            getTurma(idTurma);
        }
    }, [idTurma]);

    useEffect(() => {
        if (idAlgoritmo) {
            buscarAlgoritmo(idAlgoritmo);
            buscarTestes(idAlgoritmo);
        } else {
            limparAlgoritmo();
        }
    }, [idAlgoritmo]);

    useEffect(() => {
        if (casosTesteAlgoritmo) {
            setCasosTeste(casosTesteAlgoritmo)
        }
    }, [casosTesteAlgoritmo]);

    async function handleSubmit(data) {
        try {
            formRef.current.setErrors({});
            data.idTurma = idTurma;
            data.nivelDificuldade = parseInt(data.nivelDificuldade);
            data.linguagensPermitidas = Object.keys(data.linguagens).filter(key => data.linguagens[key]);
            data.casosTeste = casosTeste;
            delete data.linguagens;

            if (data) {
                await algoritmoFormSchema.validate(data, { abortEarly: false });
            }

            if (editandoAlgoritmo) {
                editarAlgoritmo(idAlgoritmo, data, () => {
                    toast.success("Informações atualizadas com sucesso!");
                    history.push(`/turma/${idTurma}`);
                });
            } else {
                data.dataCriacao = new Date();
                criarAlgoritmo(data, () => {
                    toast.success("Algoritmo publicado com sucesso!");
                    history.push(`/turma/${idTurma}`);
                });
            }

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

    if (isLoading || isLoadingAlgoritmo) {
        return (
            <LoadingData
                message={`Buscando dados da ${isLoadingAlgoritmo ? 'atividade...' : 'turma...'}`}
            />
        )
    }

    return (
        <Container>
            <BackButton
                route={`/turma/${idTurma}`}
            />
            <Typography variant="body1">
                {editandoAlgoritmo ? 'Editando ' : 'Adicionando '}
                algoritmo para a turma <Typography variant="h4">{turma?.nomeTurma}</Typography>
            </Typography>
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
                            defaultValue={algoritmo?.titulo}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ paddingLeft: 10 }}>
                        <NivelDificuldadeSelect
                            label="Nível de dificuldade"
                            name="nivelDificuldade"
                            fullWidth
                            margin="normal"
                            defaultValue={algoritmo?.idNivelDificuldade}
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
                                        defaultValue={!!algoritmo?.linguagensDisponiveis.includes(ling.apiIdentifier) ?? true}
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
                            initialValue={algoritmo?.htmlDescricao}
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
                        {isLoadingTestes ?
                            <CircularProgress />
                            :
                            casosTeste.map((teste, i) => (
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
                        <SubmitButton
                            loading={isCreatingAlgoritmo}
                            icon={editandoAlgoritmo ? <Edit style={{ marginRight: 10 }} /> : <Add style={{ marginRight: 10 }} />}
                            loadingLabel="Salvando..."
                        >
                            {editandoAlgoritmo ? 'Salvar alterações' : 'Publicar algoritmo'}
                        </SubmitButton>
                    </Grid>
                </Grid>
            </Form>
        </Container>
    )
}