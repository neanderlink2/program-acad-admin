import { TextField } from '@material-ui/core';
import { useField } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';

export const InputField = ({ name, mask, type, accept = '*', ...rest }) => {
    const inputRef = useRef(null);
    const { fieldName, defaultValue = rest?.defaultValue, registerField, error } = useField(name);
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
            clearValue(ref) {
                setValue('');
            },
            setValue(ref, value) {
                ref.value = value;
                setValue(value);
            }
        });
    }, [fieldName, registerField]);


    return (
        Boolean(mask) ?
            (
                <InputMask mask={mask} value={value} onChange={({ target }) => setValue(target.value)}>
                    <TextField inputRef={inputRef}
                        name={name}
                        type={type}
                        defaultValue={defaultValue}
                        error={Boolean(error)}
                        helperText={error}
                        variant="outlined"
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
                    variant="outlined"
                    value={value}
                    onChange={({ target }) => setValue(target.value)}
                    {...rest}
                />
            )

    )
}