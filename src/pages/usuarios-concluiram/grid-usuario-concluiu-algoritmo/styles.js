import styled from 'styled-components';

export const Layout = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-areas: 'header header'
                         'nickname nickname'
                         'data linguagem';

    @media(max-width: 750px) {
        & {
            grid-template-areas: 'header'
                                 'nickname'
                                 'data'
                                 'linguagem';
        }
    }                     
`;

export const HeaderContainer = styled.div`
    grid-area: header;    
`;

export const NicknameContainer = styled.div`
    grid-area: nickname;    
    display: flex;
    align-items: center;
`;

export const DataContainer = styled.div`
    grid-area: data;    
    display: flex;
    align-items: center;
`;

export const LinguagemContainer = styled.div`
    grid-area: linguagem; 
    display: flex; 
    justify-content: flex-end;  
`;