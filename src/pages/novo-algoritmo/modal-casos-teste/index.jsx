import React, { useState, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Grid, Button, DialogActions, TextField, InputAdornment, Tooltip, IconButton, Chip } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';

export const ModalCasosTeste = ({ toggleButton = () => <></>, onSubmit = (data) => { } }) => {
    const [entrada, setEntrada] = useState('');
    const [saida, setSaida] = useState('');
    const [allEntradas, setAllEntradas] = useState([]);
    const [allSaidas, setAllSaida] = useState([]);
    const [tempoExecucao, setTempoExecucao] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const toggleModal = useCallback(() => setShowModal(!showModal), [showModal]);
    const addEntrada = useCallback((entrada) => setAllEntradas([...allEntradas, entrada]), [allEntradas]);
    const addSaida = useCallback((saida) => setAllSaida([...allSaidas, saida]), [allSaidas]);

    return (
        <>
            {toggleButton && toggleButton(toggleModal)}
            <Dialog open={showModal} onClose={toggleModal}>
                <DialogTitle>Novo caso de teste</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12} sm={6} style={{ paddingRight: 10 }}>
                            <TextField
                                autoFocus
                                variant="outlined"
                                label="Entrada"
                                fullWidth
                                margin="normal"
                                value={entrada}
                                onChange={({ target }) => setEntrada(target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Tooltip title="Adicionar entrada" placement="top">
                                                <IconButton
                                                    aria-label="Adicionar uma nova entrada"
                                                    onClick={() => {
                                                        addEntrada(entrada);
                                                        setEntrada('');
                                                    }}>
                                                    <Add />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ paddingLeft: 10 }}>
                            <TextField
                                variant="outlined"
                                name="saida"
                                label="Saída"
                                fullWidth
                                margin="normal"
                                value={saida}
                                onChange={({ target }) => setSaida(target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Tooltip title="Adicionar saída" placement="top">
                                                <IconButton
                                                    aria-label="Adicionar uma nova saída"
                                                    onClick={() => {
                                                        addSaida(saida);
                                                        setSaida('');
                                                    }}>
                                                    <Add />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} style={{ paddingRight: 10 }}>
                            {allEntradas.map((entrada, i) => {
                                return (
                                    <Chip key={`entrada-${entrada}`}
                                        variant="outlined"
                                        deleteIcon={<Close />}
                                        onDelete={() => setAllEntradas(allEntradas.filter((_, index) => index !== i))}
                                        label={entrada}
                                    />
                                );
                            })}
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: 10 }}>
                            {allSaidas.map((saida, i) => {
                                return (
                                    <Chip key={`entrada-${saida}`}
                                        variant="outlined"
                                        deleteIcon={<Close />}
                                        onDelete={() => setAllSaida(allSaidas.filter((_, index) => index !== i))}
                                        label={saida}
                                    />
                                );
                            })}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                name="tempoExecucao"
                                label="Tempo de Execução (em segundos)"
                                fullWidth
                                margin="normal"
                                type="number"
                                value={tempoExecucao}
                                onChange={({ target }) => setTempoExecucao(parseInt(target.value))}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleModal} color="primary">
                        Voltar
                    </Button>
                    <Button onClick={() => {
                        onSubmit({ entradaEsperada: allEntradas, saidaEsperada: allSaidas, tempoMaximoExecucao: tempoExecucao });
                        setEntrada('');
                        setSaida('');
                        setAllEntradas([]);
                        setAllSaida([]);
                        setTempoExecucao(1);
                        toggleModal();
                    }} color="primary" type="submit">
                        Adicionar
                        </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}