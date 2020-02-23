import React, { Fragment } from 'react';
import { Typography, Container } from '@material-ui/core';
import { WhiteSection, LogoProgramAcad, CenterSection, SectionText } from './styles';
import { Section } from './sections';
import { useDocumentTitle } from '../../components/hooks';

export const HomeScreen = ({ title }) => {
    useDocumentTitle(title);

    return (
        <>
            <span>Tela de início</span>
        </>
    );
}