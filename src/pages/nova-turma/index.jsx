import { Button, Container, Grid, LinearProgress, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Form } from '@unform/web';
import { format, parse } from 'date-fns';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useUserLogin } from '../../components/hooks';
import { LoadingScreen } from '../../components/loading';
import { InputField } from '../../components/unform/input-field';
import { SubmitButton } from '../../components/unform/submit-button';
import { uploadImage } from '../../configs/firebaseConfig';
import { useCriacaoTurma, useTurmaById } from '../../modules/turmas/hooks';
import { turmaFormSchema } from './actions';
import { ImageUpload } from './image-upload';


export const TurmaForm = () => {
    const { idTurma } = useParams();
    const formRef = useRef(null);
    const history = useHistory();
    const [isUploading, setIsUploading] = useState(false);
    const [uploadPercent, setUploadPercent] = useState(0);
    const { user } = useUserLogin();
    const { cadastrarTurma, editarTurma, isLoading: criandoTurma } = useCriacaoTurma();
    const editandoTurma = useMemo(() => !!idTurma, [idTurma]);
    const { getTurma, limparTurma, turma, isLoading } = useTurmaById();

    useEffect(() => {
        if (idTurma) {
            getTurma(idTurma);
        } else {
            limparTurma();
            formRef.current.reset();
        }
    }, [idTurma, formRef]);

    const cadastrarNovaTurma = async (formData, emailInstrutor) => {
        try {
            formRef.current.setErrors({});
            if (formData) {
                await turmaFormSchema.validate(formData, { abortEarly: false });
            }
            
            const imagemRef = formRef.current.getFieldRef('imagem');

            if ((!imagemRef.files || imagemRef.files.length <= 0) && !editandoTurma) {
                toast.warn("Selecione uma imagem.");
                return;
            }

            if (imagemRef.files[0]) {
                setIsUploading(true);
                uploadImage("turmas", `${formData.nomeTurma.toLowerCase()}`, imagemRef.files[0],
                    (snapShot) => {
                        setUploadPercent((snapShot.bytesTransferred / snapShot.totalBytes) * 100);
                        console.log(snapShot);
                    },
                    (err) => {
                        setIsUploading(false);
                        setUploadPercent(0);
                        console.log(err);
                    },
                    (fileUrl) => {
                        setIsUploading(false);
                        setUploadPercent(0);

                        const turmaPayload = {
                            ...formData,
                            emailInstrutor,
                            dataCriacao: new Date(),
                            dataHoraTermino: parse(`${formData.dataTermino} ${formData.horaTermino}`, "dd/MM/yyyy HH:mm", new Date()),
                            urlImagem: fileUrl
                        };
                        if (editandoTurma) {
                            editarTurma(idTurma, turmaPayload, () => {
                                toast.success("Turma atualizada com sucesso!");
                            }, (error, formatedErrors) => {
                                if (formatedErrors?.length > 0) {
                                    toast.warn(`Opa, alguma coisa deu errado. Detalhes: ${formatedErrors.join('\n')}`);
                                } else {
                                    toast.error("Houve um problema durante o cadastro dessa turma.");
                                }
                            });
                        } else {
                            cadastrarTurma(turmaPayload, () => {
                                toast.success("Nova turma criada com sucesso!");
                            }, (error, formatedErrors) => {
                                if (formatedErrors?.length > 0) {
                                    toast.warn(`Opa, alguma coisa deu errado. Detalhes: ${formatedErrors.join('\n')}`);
                                } else {
                                    toast.error("Houve um problema durante o cadastro dessa turma.");
                                }
                            });
                        }
                    }
                );
            } else {
                const turmaPayload = {
                    ...formData,
                    dataHoraTermino: parse(`${formData.dataTermino} ${formData.horaTermino}`, "dd/MM/yyyy HH:mm", new Date()),
                };

                editarTurma(idTurma, turmaPayload, () => {
                    toast.success("Turma atualizada com sucesso!");
                }, (error, formatedErrors) => {
                    if (formatedErrors?.length > 0) {
                        toast.warn(`Opa, alguma coisa deu errado. Detalhes: ${formatedErrors.join('\n')}`);
                    } else {
                        toast.error("Houve um problema durante o cadastro dessa turma.");
                    }
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
    };

    async function handleSubmit(data) {
        cadastrarNovaTurma(data, user.email);
    }

    if (isLoading) {
        return (
            <LoadingScreen containerProps={{ style: { flexDirection: 'column' } }}>
                <span>Buscando turma...</span>
            </LoadingScreen>
        )
    }

    return (
        <Container>
            <Button startIcon={<ArrowBack />} onClick={() => history.goBack()}>Minhas turmas</Button>
            <Typography variant="h4">{editandoTurma ? 'Atualização de dados da turma' : 'Crie uma nova turma'}</Typography>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12} sm={6} style={{ display: 'flex', padding: 10, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <InputField
                            label="Nome da turma"
                            variant="outlined"
                            name="nomeTurma"
                            fullWidth
                            margin="normal"
                            defaultValue={editandoTurma ? turma?.nomeTurma : ''}
                        />
                        <InputField
                            label="Data de encerramento"
                            variant="outlined"
                            name="dataTermino"
                            fullWidth
                            margin="normal"
                            mask="99/99/9999"
                            defaultValue={editandoTurma && !!turma?.dataHoraTermino ? format(parse(turma.dataHoraTermino, "yyyy-MM-dd'T'HH:mm:ss", new Date()), "dd/MM/yyyy") : ''}
                        />
                        <InputField
                            label="Hora de encerramento"
                            variant="outlined"
                            name="horaTermino"
                            fullWidth
                            margin="normal"
                            mask="99:99"
                            defaultValue={editandoTurma && !!turma?.dataHoraTermino ? format(parse(turma.dataHoraTermino, "yyyy-MM-dd'T'HH:mm:ss", new Date()), "HH:mm") : ''}
                        />
                        <InputField
                            label="Máximo de alunos"
                            variant="outlined"
                            name="capacidadeAlunos"
                            fullWidth
                            margin="normal"
                            type="number"
                            defaultValue={editandoTurma ? turma?.capacidadeAlunos ?? 0 : 0}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ImageUpload inputName="imagem" defaultImage={turma?.urlImagem} />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 15, marginBottom: 15 }}>
                        {
                            isUploading ?
                                <>
                                    <LinearProgress variant="determinate" value={uploadPercent} />
                                    <span>Fazendo upload da imagem...</span>
                                </>
                                :
                                <SubmitButton loading={criandoTurma} loadingLabel="Salvando turma...">
                                    {editandoTurma ? 'Atualizar turma' : 'Cadastrar turma'}
                                </SubmitButton>
                        }
                    </Grid>
                </Grid>
            </Form>
        </Container>
    )
}