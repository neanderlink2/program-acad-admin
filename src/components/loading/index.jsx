import React from 'react';
import { FlexLine } from '../flex-helpers/index';
import { CircularProgress } from '@material-ui/core';

export const LoadingScreen = ({ loadingProps, containerProps }) => {
    return (
        <FlexLine {...containerProps}>
            <CircularProgress color="secondary" size={48} {...loadingProps} style={{ margin: 25 }} />
        </FlexLine>
    )
}