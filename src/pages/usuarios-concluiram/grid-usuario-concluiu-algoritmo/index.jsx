import { Card, CardContent, Chip, Typography } from '@material-ui/core'
import { CalendarToday, Person } from '@material-ui/icons'
import { format } from 'date-fns'
import React from 'react'
import { DataContainer, HeaderContainer, Layout, LinguagemContainer, NicknameContainer } from './styles'

export default function GridUsuarioConcluiuAlgoritmo({ nomeAlgoritmo, nickname, nomeAluno, dataConclusao, linguagemUtilizada }) {
    return (
        <Card>
            <CardContent>
                <Layout>
                    <HeaderContainer>
                        <Typography variant="h5">{nickname}</Typography>
                    </HeaderContainer>
                    <NicknameContainer>
                        <Person />
                        <Typography style={{ marginLeft: 10 }} variant="body1">{nomeAluno}</Typography>
                    </NicknameContainer>
                    <DataContainer>
                        <CalendarToday />
                        <Typography variant="body2" style={{ marginLeft: 10 }}>
                            {format(dataConclusao, "dd/MM/yyyy 'às' HH:mm")}
                        </Typography>
                    </DataContainer>
                    <LinguagemContainer>
                        <Chip color="secondary" label={linguagemUtilizada} />
                    </LinguagemContainer>
                </Layout>
            </CardContent>
        </Card>
    )
}
