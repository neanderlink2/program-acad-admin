import { Button, Card, CardContent, Container, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FlexEnd, FlexLine } from '../../components/flex-helpers/index';
import { useDocumentTitle, useUserLogin } from '../../components/hooks';
import { PasswordField } from '../../components/password-field';
import { FacebookButton } from '../../components/signin-buttons/facebook-button';
import { GitHubButton } from '../../components/signin-buttons/github-button';
import { GoogleButton } from '../../components/signin-buttons/google-button';
import { SimpleButton } from '../../components/signin-buttons/simple-button';
import { signInWithFacebook, signInWithGithub, signInWithGoogle, signInWithSimple } from '../../configs/firebaseConfig';
import { useUserLoginFailed, useUserLoginSuccess } from './hooks';
import { ModalResetPassword } from './modal-confirm-reset-password';

const LoginScreen = ({ title, user, error }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errorCode, setErrorCode] = useState(undefined);
    const [loginResult, setLoginResult] = useState(undefined);
    const [showModal, setShowModal] = useState(false);

    const { user: userFirebase } = useUserLogin();
    useDocumentTitle(title);
    useUserLoginFailed(errorCode, () => {
        setErrorCode(undefined)
    });
    useUserLoginSuccess(loginResult);

    function loginSenha() {
        signInWithSimple(email, senha)
            .then((response) => {
                setLoginResult(response.user);
            })
            .catch((e) => {
                setErrorCode(e.code);
            });
    }

    function loginFacebook() {
        signInWithFacebook()
            .then((response) => {
                setLoginResult(response.user);
            })
            .catch((e) => {
                setErrorCode(e.code);
            });
    }

    function loginGoogle() {
        signInWithGoogle()
            .then((response) => {
                setLoginResult(response.user);
            })
            .catch((e) => {
                setErrorCode(e.code);
            });
    }

    function loginGithub() {
        signInWithGithub()
            .then((response) => {
                setLoginResult(response.user);
            })
            .catch((e) => {
                setErrorCode(e.code);
            });
    }

    if (userFirebase) {
        return <Redirect to="/" />
    }

    return (
        <Container>
            <Card style={{ margin: 15 }}>
                <CardContent>
                    <Typography variant="h5" align="center">Administre a Program.Acad</Typography>
                    <Typography variant="body2">Entre utilizando suas redes sociais:</Typography>
                    <FlexLine>
                        <GoogleButton onClick={loginGoogle} />
                        <FacebookButton onClick={loginFacebook} />
                        <GitHubButton onClick={loginGithub} />
                    </FlexLine>
                    <Typography variant="body2">Ou utilize seu e-mail e senha:</Typography>
                    <TextField fullWidth
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        label="E-mail"
                        color="secondary"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)} />
                    <PasswordField fullWidth
                        margin="normal"
                        variant="outlined"
                        label="Senha"
                        color="secondary"
                        value={senha}
                        onChange={({ target }) => setSenha(target.value)} />
                    <FlexEnd>
                        <Button variant="text" style={{ marginRight: 20 }} onClick={() => setShowModal(true)}>Esqueceu sua senha?</Button>
                        <SimpleButton onClick={loginSenha} />
                    </FlexEnd>
                </CardContent>
            </Card>

            <ModalResetPassword show={showModal} onClose={() => setShowModal(false)} />
        </Container>
    )
}

export default LoginScreen;