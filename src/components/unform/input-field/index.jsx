import React, { useEffect, useRef } from 'react';
import { TextField } from '@material-ui/core';
import { useField } from '@unform/core';
import InputMask from 'react-input-mask';

export const InputField = ({ name, mask, type, accept = '*', ...rest }) => {

    const inputRef = useRef(null);
    const { fieldName, defaultValue = rest.defaultValue, registerField, error } = useField(name);
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);


    return (
        Boolean(mask) ?
            (
                <InputMask mask={mask} >
                    <TextField inputRef={inputRef}
                        name={name}
                        type={type}
                        defaultValue={defaultValue}
                        error={Boolean(error)}
                        helperText={error}
                        {...rest}
                    />
                </InputMask>
            )
            :
            (
                <TextField inputRef={inputRef}
                    InputProps={{ inputProps: { accept } }}
                    name={name}
                    type={type}
                    defaultValue={defaultValue}
                    error={Boolean(error)}
                    helperText={error}
                    {...rest}
                />
            )

    )
}