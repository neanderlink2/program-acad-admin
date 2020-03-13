import React, { useRef, useState } from 'react';
import { Container, Grid, Fab, Typography, LinearProgress, CircularProgress } from '@material-ui/core';
import { Form } from '@unform/web';
import { Add } from '@material-ui/icons';

import { ImageUpload } from './image-upload';
import { InputField } from '../../components/unform/input-field';
import { uploadImage } from '../../configs/firebaseConfig';
import { parse } from 'date-fns';
import { toast } from 'react-toastify';
import { useCriacaoTurma } from '../../modules/turmas/hooks';
import { useUserData } from '../../components/hooks';
import * as Yup from 'yup';
import { cadastrarNovaTurma, turmaFormSchema } from './actions';

export const TurmaForm = () => {
    const formRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadPercent, setUploadPercent] = useState(0);

    const { user } = useUserData();

    const { cadastrarTurma, isRequesting } = useCriacaoTurma();

    const cadastrarNovaTurma = async (formData, emailInstrutor) => {
        try {
            formRef.current.setErrors({});
            if (formData) {
                await turmaFormSchema.validate(formData, { abortEarly: false });
            }

            const imagemRef = formRef.current.getFieldRef('imagem');

            if (!imagemRef.files || imagemRef.files.length <= 0) {
                toast.warn("Selecione uma imagem");
                return;
            }

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

                    const turma = {
                        ...formData,
                        emailInstrutor,
                        dataCriacao: new Date(),
                        dataHoraTermino: parse(`${formData.dataTermino} ${formData.horaTermino}`, "dd/MM/yyyy HH:mm", new Date()),
                        urlImagem: fileUrl
                    };

                    cadastrarTurma(turma, () => {
                        toast.success("Nova turma criada com sucesso!");
                    }, () => {
                        toast.error("Houve um problema durante o cadastro dessa turma.");
                    });
                }
            );
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

    return (
        <Container>
            <Typography variant="h4">Crie uma nova turma</Typography>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12} sm={6} style={{ display: 'flex', padding: 10, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <InputField
                            label="Nome da turma"
                            variant="outlined"
                            name="nomeTurma"
                            fullWidth
                            margin="normal"
                        />
                        <InputField
                            label="Data de encerramento"
                            variant="outlined"
                            name="dataTermino"
                            fullWidth
                            margin="normal"
                            mask="99/99/9999"
                        />
                        <InputField
                            label="Hora de encerramento"
                            variant="outlined"
                            name="horaTermino"
                            fullWidth
                            margin="normal"
                            mask="99:99"
                        />
                        <InputField
                            label="Máximo de alunos"
                            variant="outlined"
                            name="capacidadeAlunos"
                            fullWidth
                            margin="normal"
                            type="number"
                            defaultValue={0}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ImageUpload inputName="imagem" />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 15, marginBottom: 15 }}>
                        {
                            isUploading ?
                                <>
                                    <LinearProgress variant="determinate" value={uploadPercent} />
                                    <span>Fazendo upload da imagem...</span>
                                </>
                                :
                                <Fab disabled={isRequesting} variant="extended" style={{ width: '100%' }} color="primary" type="submit">
                                    {
                                        isRequesting ?
                                            <><CircularProgress size={16} style={{ marginRight: 10 }} /> Salvando turma...</>
                                            :
                                            <><Add style={{ marginRight: 10 }} /> Cadastrar turma</>
                                    }
                                </Fab>
                        }
                    </Grid>
                </Grid>
            </Form>
        </Container>
    )
}