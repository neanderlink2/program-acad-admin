import React, { ComponentType, ElementType } from 'react';
import { HomeScreen } from '../pages/home'
import LoginScreen from '../pages/login';

export const routes = [
    {
        path: '/login',
        component: LoginScreen,
        title: 'Bem-vindo à Program.Acad',
        onlyAuthenticated: false
    },
    {
        path: '/',
        component: HomeScreen,
        title: 'Bem-vindo à Program.Acad',
        onlyAuthenticated: true
    }
];