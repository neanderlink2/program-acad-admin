import React from 'react';
import { Add } from '@material-ui/icons';
import { CircularProgress, Fab } from '@material-ui/core';

export const SubmitButton = ({ children, loading, loadingLabel }) => {
    return (
        <Fab disabled={loading} variant="extended" style={{ width: '100%' }} color="primary" type="submit">
            {
                loading ?
                    <><CircularProgress size={16} style={{ marginRight: 10 }} /> {loadingLabel ? loadingLabel : children}</>
                    :
                    <><Add style={{ marginRight: 10 }} /> {children}</>
            }
        </Fab>
    )
}