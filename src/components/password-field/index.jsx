import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';


export const PasswordField = ({ showVisibility = true, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <TextField
            {...props}
            type={showPassword ? 'text' : 'password'}
            onPaste={(evt) => {
                if (props.onPaste) {
                    props.onPaste(evt);
                }
                evt.preventDefault();
            }}
            InputProps={{
                endAdornment:
                    showVisibility ?
                        (
                            <InputAdornment position="end">
                                <IconButton aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                        :
                        null
            }}
        />
    )
}