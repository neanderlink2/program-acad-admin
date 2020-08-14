import styled from 'styled-components';

export const Layout = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-areas: 'header header'
                         'nickname pontos';

    @media(max-width: 750px) {
        & {
            grid-template-areas: 'header'
                                 'nickname'
                                 'pontos';
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

export const PontosContainer = styled.div`
    grid-area: pontos;    
    display: flex;
    align-items: center;
`;