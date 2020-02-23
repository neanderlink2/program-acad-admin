import React from 'react';
import { WhiteButton } from '../styles';
import logoGoogle from '../../../assets/google-signin-logo.svg';

export const GoogleButton = ({ onClick, variant = "contained" }) => {
    return (
        <WhiteButton variant={variant} onClick={onClick} startIcon={<img src={logoGoogle} alt="Logo GOOGLE" />} >Google</WhiteButton>
    );
}