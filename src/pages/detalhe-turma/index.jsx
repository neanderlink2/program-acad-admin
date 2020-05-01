import React, { useState } from 'react';
import { Container, Tab, Tabs, Button } from '@material-ui/core';
import TabPanel, { tabPanelProps } from '../../components/tab-panel';
import { TabAlgoritmos } from './tab-algoritmos';
import { TabUsuariosInscritos } from './tab-inscritos';
import { TabDadosTurma } from './tab-dados-turma';
import { Assignment, People, Class, ArrowBack } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import BackButton from '../../components/buttons/BackButton';

export const DetalheTurmaScreen = () => {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <Container>
            <BackButton route="/" />
            <Tabs value={tabIndex} onChange={(evt, newValue) => setTabIndex(newValue)}>
                <Tab icon={<Assignment />} label="Algoritmos" {...tabPanelProps(0)} />
                <Tab icon={<People />} label="Usuários inscritos" {...tabPanelProps(1)} />
                <Tab icon={<Class />} label="Dados da turma" {...tabPanelProps(2)} />
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
                <TabAlgoritmos />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <TabUsuariosInscritos />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                <TabDadosTurma />
            </TabPanel>
        </Container>
    )
}