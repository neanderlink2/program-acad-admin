import { Card, CardContent, Typography } from '@material-ui/core'
import { Person } from '@material-ui/icons'
import React from 'react'
import LabeledLinearProgress from '../../../../components/LabeledLinearProgress'
import { HeaderContainer, Layout, NicknameContainer, PontosContainer } from './styles'

export default function GridUsuarioPontos({ nomeAluno, nickname, qtdePontos, maximoPontos }) {
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
                    <PontosContainer>
                        <Typography variant="body2" style={{ marginLeft: 10 }}>
                            {qtdePontos} de {maximoPontos} pontos
                        </Typography>
                    </PontosContainer>
                </Layout>
                <LabeledLinearProgress value={(qtdePontos / maximoPontos) * 100} />
            </CardContent>
        </Card>
    )
}
