import React, { useRef, useState } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useField } from '@unform/core';
import { useEffect } from 'react';

export const CheckBoxField = ({ label, name, defaultValue }) => {
    const inputRef = useRef(null);
    const { fieldName, registerField, error } = useField(name);
    const [checked, setChecked] = useState(defaultValue || false);

    useEffect(() => {
        setChecked(defaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue]);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'control.checked',
            clearValue: () => {
                setChecked(false);
            },
        });
    }, [fieldName, registerField]);

    function changed() {
        setChecked(!checked);
    }

    return (
        <FormControlLabel
            ref={inputRef}
            control={
                <Checkbox
                    checked={checked}
                    onChange={changed}
                    name={name}
                />
            }
            label={label}
        />
    )
}