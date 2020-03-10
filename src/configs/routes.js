import React, { ComponentType, ElementType } from 'react';
import { HomeScreen } from '../pages/home'
import LoginScreen from '../pages/login';
import { TurmaForm } from '../pages/turma';

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
    },
    {
        path: '/turma/cadastro',
        component: TurmaForm,
        title: 'Crie uma nova turma',
        onlyAuthenticated: true
    }
];