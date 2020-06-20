import React from 'react';
import { InlineContainer } from '../../pages/detalhe-turma/tab-inscritos/styles';
import { LoadingScreen } from '../loading';


export const LoadingData = ({ message }) => (
    <InlineContainer style={{ justifyContent: 'center', flexDirection: 'column' }}>
        <LoadingScreen />
        {message && <span>{message}</span>}
    </InlineContainer>
)