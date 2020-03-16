import React, { useState } from 'react';
import { Container, Tab, Tabs } from '@material-ui/core';
import TabPanel, { tabPanelProps } from '../../components/tab-panel';
import { TabAlgoritmos } from './tab-algoritmos';
import { TabUsuariosInscritos } from './tab-inscritos';
import { TabDadosTurma } from './tab-dados-turma';
import { Assignment, People, Class } from '@material-ui/icons';

export const DetalheTurmaScreen = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Container>
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