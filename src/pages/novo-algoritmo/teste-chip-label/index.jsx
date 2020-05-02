import React from 'react';
import { Container } from './styles';
import { Settings, ArrowRight } from '@material-ui/icons';
import { Tooltip, Badge } from '@material-ui/core';

export const TesteChipLabel = ({ entradas = [], saidas = [], tempoExecucao }) => {
    return (
        <Container>
            <span style={{ marginRight: 5 }}>{entradas?.join(' | ')}</span>
            <ArrowRight style={{ marginRight: 5 }} />
            <Tooltip title={`Deve ser executado em ${tempoExecucao} seg.`}>
                <Badge badgeContent={`${tempoExecucao}s`} color="secondary">
                    <Settings style={{ marginRight: 5 }} />
                </Badge>
            </Tooltip>
            <ArrowRight />
            <span style={{ marginLeft: 5 }}>{saidas?.join(' | ')}</span>
        </Container>
    );
}