import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import store, { history } from '../configs/middlewares';
import { Layout } from './shared/layout';
import programAcadTheme from '../configs/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = ({ children }) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={programAcadTheme}>
                    <SnackbarProvider>
                        <CssBaseline />
                        <ToastContainer />
                        <Layout />
                    </SnackbarProvider>
                </ThemeProvider>
            </ConnectedRouter>
        </Provider>
    );
}

export default App;