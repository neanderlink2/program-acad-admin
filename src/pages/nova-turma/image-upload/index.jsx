import React, { useRef } from 'react';
import { Container } from '@material-ui/core';

import placeholder from '../../../assets/image_placeholder.svg';
import { InputField } from '../../../components/unform/input-field';
import { ImageField } from './styles';

export const ImageUpload = ({ inputName }) => {
    const imageRef = useRef(null);

    return (
        <label>
            <ImageField ref={imageRef} src={placeholder} />
            <InputField name={inputName}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={({ target }) => {
                    const files = target.files;
                    const url = URL.createObjectURL(files[0]);
                    imageRef.current.src = url;
                }}
            />
        </label>
    )
}