import React from 'react';
import { Facebook as FacebookIcon } from '@material-ui/icons';
import { RoyalBlueButton } from '../styles';

export const FacebookButton = ({ onClick, variant = "contained" }) => {
    return (
        <RoyalBlueButton variant={variant} onClick={onClick} startIcon={<FacebookIcon />} >Facebook</RoyalBlueButton>
    );
}