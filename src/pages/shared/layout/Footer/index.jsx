import React from 'react';
import { SpacedBox, Logo, Credits } from './styles';

import logoIFB from '../../../../assets/logo_ifb.png';

export const Footer = () => {
    return (
        <SpacedBox component="footer">
            <Logo src={logoIFB} alt="Logo do IFB (Instituto Federal de Brasília)" />
            <Credits>Program.Acad - {new Date().getFullYear()}</Credits>
        </SpacedBox>
    )
}