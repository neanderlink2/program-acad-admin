import { Avatar } from '@material-ui/core';
import styled from 'styled-components';

export const FotoTurma = styled(Avatar)`
    width: 150px;
    height: 150px;
`;

export const ContainerDadosTurma = styled.div`
    display: flex;
    flex: 1;
`;

export const DadosWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 15px;
    margin-right: 15px;
`;

export const LinhaDadosInferior = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
`;