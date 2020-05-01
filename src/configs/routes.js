import React, { ComponentType, ElementType } from 'react';
import { HomeScreen } from '../pages/home'
import LoginScreen from '../pages/login';
import { TurmaForm } from '../pages/nova-turma';
import { DetalheTurmaScreen } from '../pages/detalhe-turma';
import { NovoAlgoritmoScreen } from '../pages/novo-algoritmo';

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
        path: '/turma/:idTurma',
        component: DetalheTurmaScreen,
        title: 'Detalhes da turma',
        onlyAuthenticated: true
    },
    {
        path: '/turma/:idTurma/algoritmo',
        component: NovoAlgoritmoScreen,
        title: 'Algoritmo',
        onlyAuthenticated: true
    },
    {
        path: '/novaturma',
        component: TurmaForm,
        title: 'Crie uma nova turma',
        onlyAuthenticated: true
    }
];