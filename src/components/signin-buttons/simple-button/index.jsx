import React from 'react';
import { Button } from '@material-ui/core';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';

export const SimpleButton = ({ onClick, variant = "contained" }) => {
    return (
        <Button variant={variant} onClick={onClick} startIcon={<ExitToAppIcon />} color="secondary">Entrar</Button>
    );
}