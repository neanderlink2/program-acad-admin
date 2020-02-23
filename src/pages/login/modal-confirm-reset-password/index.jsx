import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@material-ui/core';
import { sendPasswordReset } from '../../../configs/firebaseConfig';
import { useSnackbars } from '../../../components/hooks/index';

export const ModalResetPassword = ({ show, onClose }) => {
    const [email, setEmail] = useState('');

    const { info } = useSnackbars();

    function confirmSendEmail() {
        sendPasswordReset(email);
        info(`E-mail de recuperação de senha foi enviado para ${email}. Veja sua caixa de e-mail.`);
        onClose();
    }

    return (
        <Dialog
            open={show}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Enviar e-mail para recuperação de senha</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">Digite abaixo o e-mail de sua conta para recuperar</DialogContentText>
                <TextField fullWidth
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    label="E-mail"
                    color="secondary"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={confirmSendEmail} color="secondary" autoFocus>Enviar</Button>
            </DialogActions>
        </Dialog>
    );
}