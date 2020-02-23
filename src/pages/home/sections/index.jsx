import React from 'react';
import { CenterSection, SectionTitle } from '../styles';
import { Container } from '@material-ui/core';

export const Section = ({ children, title, startImage, endImage, align = "left" }) => {
    return (
        <CenterSection>
            {startImage}
            <Container style={{ textAlign: align, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <SectionTitle variant="h4" align={align}>{title}</SectionTitle>
                {children}
            </Container>
            {endImage}
        </CenterSection>
    );
}