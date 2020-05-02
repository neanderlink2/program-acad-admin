import React from 'react';
import { SelectField } from '..';
import { useSelectNiveisDificuldade } from '../../../../modules/algoritmos/hooks';
import { CircularProgress } from '@material-ui/core';

export const NivelDificuldadeSelect = ({ name, ...rest }) => {
    const [data, isLoading] = useSelectNiveisDificuldade();
    if (isLoading) {
        return <CircularProgress />
    }
    return (
        <SelectField
            name={name}
            options={data}
            {...rest}
        />
    )
}