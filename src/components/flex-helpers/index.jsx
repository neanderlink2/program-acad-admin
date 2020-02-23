import styled from 'styled-components';

export const FlexLine = styled.div({
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
});

export const FlexEnd = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center'
});