import { Button, Card, CardContent, Chip, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Edit, ListAlt } from '@material-ui/icons';
import React from 'react';
import Truncate from 'react-text-truncate';
import { FlexLine } from '../../../../components/flex-helpers';
import { linguagensEnum } from '../../../../utils/linguagensEnum';
import { ActionButtons } from './styles';

export const AlgoritmoGridItem = ({ title, linguagensDisponiveis, descricao, nivelDificuldade, onEditClick, onListClick }) => {
    const descricaoRaw = removeHtmlTags(descricao);
    return (
        <Grid item xs={12} sm={6} lg={4} style={{ padding: 5 }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center" component="h2">{title}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">Dificuldade: {nivelDificuldade}</Typography>
                    <FlexLine style={{ justifyContent: 'flex-start' }}>
                        {
                            linguagensDisponiveis.map((linguagem) => {
                                return (
                                    <Chip variant="outlined" label={linguagensEnum[linguagem]} style={{ margin: 5 }} />
                                )
                            })
                        }
                    </FlexLine>
                    <Typography variant="body2" color="textSecondary" component="div">
                        <Truncate
                            line={2}
                            element="span"
                            truncateText="..."
                            text={descricaoRaw}
                        />
                    </Typography>
                    <ActionButtons>
                        <Button fullWidth color="secondary" variant="contained" startIcon={<Edit />} onClick={onEditClick}> Alterar</Button>
                        <Tooltip title="Usuários que concluíram" placement="top">
                            <IconButton color="primary" variant="outlined" onClick={onListClick}>
                                <ListAlt />
                            </IconButton>
                        </Tooltip>
                    </ActionButtons>
                </CardContent>
            </Card>
        </Grid>
    );
}

const removeHtmlTags = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}