import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        background: {
            default: '#f0f0f0',
            paper: '#d2d2d2'
        },
        primary: {
            light: '#62727b',
            main: '#37474f',
            dark: '#102027',
            contrastText: '#fff',
        },
        secondary: {
            light: '#666ad1',
            main: '#303f9f',
            dark: '#001970',
            contrastText: '#fff'
        },
        type: 'light'
    },
    typography: {
        fontFamily: 'Abel, Roboto, sans-serif'
    }
});