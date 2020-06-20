import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { FlexLine } from '../flex-helpers/index';

export const LoadingScreen = ({ loadingProps, containerProps, children }) => {
    return (
        <FlexLine {...containerProps}>
            <CircularProgress color="secondary" size={48} {...loadingProps} style={{ margin: 25 }} />
            {children}
        </FlexLine>
    )
}