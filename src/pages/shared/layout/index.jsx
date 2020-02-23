import React, { Fragment } from 'react';
import Header from './Header';
import Main from './Main';
import { Footer } from './Footer';
import { AsideMenu } from './AsideMenu/index';

export const Layout = () => {
    return (
        <>
            <Header />
            <Main />
            <Footer />
            <AsideMenu />
        </>
    );
}