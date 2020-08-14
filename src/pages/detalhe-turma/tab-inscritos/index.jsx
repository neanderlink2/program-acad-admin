import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Tooltip } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingData } from '../../../components/loading-data';
import { useUsuariosInscritos } from '../../../modules/turmas/hooks';

export const TabUsuariosInscritos = () => {
    const { idTurma } = useParams();
    const { inscritos, isLoading, atualizarInscritos, confirmarSolicitacaoAcesso } = useUsuariosInscritos(idTurma);

    const onInscricaoClick = (email, aceito) => {
        confirmarSolicitacaoAcesso(email, aceito, () => {
            if (aceito) {
                toast.success("Inscrição confirmada com sucesso.");
            } else {
                toast.success("Inscrição recusada com sucesso.");
            }
            atualizarInscritos();
        }, (error) => {
            toast.error("Houve um problema durante a confirmação da inscrição.");
        })
    }

    if (isLoading) {
        return (
            <LoadingData
                message="Buscando usuários inscritos..."
            />
        )
    }
    return (
        <List>
            {inscritos.map((inscrito) => {
                const data = parseISO(inscrito.dataInscricao);
                return (
                    <ListItem>
                        <ListItemText
                            primary={inscrito.nome}
                            secondary={`${inscrito.email}, em ${format(data, "dd/MM/yyyy 'às' HH:mm")}`}
                        />
                        {inscrito.isAceito === undefined || inscrito.isAceito === null ? (
                            <>
                                <ListItemSecondaryAction style={{ marginRight: 50 }} onClick={() => onInscricaoClick(inscrito.email, true)}>
                                    <IconButton>
                                        <Check />
                                    </IconButton>
                                </ListItemSecondaryAction>
                                <ListItemSecondaryAction onClick={() => onInscricaoClick(inscrito.email, false)}>
                                    <IconButton>
                                        <Close />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </>
                        )
                            :
                            <ListItemSecondaryAction>
                                <Tooltip placement="top" title={inscrito.isAceito ? "Usuário autorizado" : "Usuário não possui acesso"}>
                                    {inscrito.isAceito ? <Check style={{ color: 'green' }} /> : <Close style={{ color: 'red' }} />}
                                </Tooltip>
                            </ListItemSecondaryAction>
                        }
                    </ListItem>
                )
            })}
        </List>
    );
}