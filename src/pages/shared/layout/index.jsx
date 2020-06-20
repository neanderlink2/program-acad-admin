import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { AsideMenu } from './AsideMenu/index';
import { Footer } from './Footer';
import Header from './Header';
import Main from './Main';
import { LoadingContainer } from './styles';

export const Layout = () => {
    const autenticando = useSelector(states => (
        !states.account.auth.verificouAutenticacao
    ));

    if (autenticando) {
        return (
            <LoadingContainer>
                <CircularProgress />
                <span>Aguarde um instante...</span>
            </LoadingContainer>
        )
    }

    return (
        <>
            <Header />
            <Main />
            <Footer />
            <AsideMenu />
        </>
    );
}