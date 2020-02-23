import React from 'react';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { BlackButton } from '../styles';

export const GitHubButton = ({ onClick, variant = "contained" }) => {
    return (
        <BlackButton variant={variant} onClick={onClick} startIcon={<GitHubIcon />} >GitHub</BlackButton>
    );
}