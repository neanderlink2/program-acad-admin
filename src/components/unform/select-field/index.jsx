import React, { useRef, useEffect } from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField } from '@unform/core';

/** 
 * @param options Opções do select com um array do objeto { value, display }
 */
export const SelectField = ({ name, options = [], ...rest }) => {

    const inputRef = useRef(null);
    const { fieldName, defaultValue = rest?.defaultValue, registerField, error } = useField(name);
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'node.value'
        });
    }, [fieldName, registerField]);


    return (
        <TextField inputRef={inputRef}
            select
            name={name}
            defaultValue={defaultValue}
            error={Boolean(error)}
            helperText={error}
            variant="outlined"
            {...rest}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.display}
                </MenuItem>
            ))}
        </TextField>
    )
}