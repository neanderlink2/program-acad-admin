import { Typography, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

export const TituloTopo = styled(Typography)({
    marginLeft: 20,
    flexGrow: 1,
    transition: '0.2s',
    '&:hover': {
        cursor: 'pointer',
        textShadow: '0px 0px 5px #fff',
        fontSize: '1.4rem'
    }
});

export const BotaoTopo = styled(Button)({
    marginLeft: 10,
    marginRight: 10
});