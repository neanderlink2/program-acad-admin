import { CircularProgress, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';

export const SubmitButton = ({ children, loading, loadingLabel, icon = <Add style={{ marginRight: 10 }} />, }) => {
    return (
        <Fab disabled={loading} variant="extended" style={{ width: '100%' }} color="primary" type="submit">
            {
                loading ?
                    <><CircularProgress size={16} style={{ marginRight: 10 }} /> {loadingLabel ? loadingLabel : children}</>
                    :
                    <>{icon} {children}</>
            }
        </Fab>
    )
}