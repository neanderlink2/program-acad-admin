import styled from 'styled-components';

export const TopAsideMenu = styled.div`
    display: flex;
    flex: 0.3;
    min-width: 300px;
    min-height: 100px;
    align-items: flex-start;
    justify-content: flex-end;    
    flex-direction: column;
    color: white;
    text-shadow: 0 0 4px #000;
    padding: 5px;
    background-size: cover;
    background-position: center center;
    & h3 {
        margin: 0;
    }
`;