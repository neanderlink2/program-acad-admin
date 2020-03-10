import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Chip, CardMedia } from '@material-ui/core';
import { FlexLine } from '../../../components/flex-helpers/index';
import { ExitToApp } from '@material-ui/icons';
import { format } from 'date-fns';

export const TurmaGridItem = ({ image, imageAlt, title, dataHoraTermino, instrutor, onItemClicked }) => {
    const date = new Date(dataHoraTermino);
    const dataFormatada = `${format(date, 'dd/MM/yyyy')} às ${format(date, 'hh:mm')}`;
    return (
        <Grid item xs={12} sm={6} lg={4} style={{ padding: 5 }}>
            <Card>
                <CardMedia
                    image={image}
                    title={imageAlt}
                    style={{ height: 150 }}
                />
                <CardContent>
                    <Typography variant="h5" component="h2">{title}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">Ministrado por {instrutor}</Typography>
                    <FlexLine style={{ justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="textSecondary">Encerra em {dataFormatada}</Typography>
                        <Button color="secondary" variant="contained" startIcon={<ExitToApp />} onClick={onItemClicked}> Gerenciar</Button>
                    </FlexLine>
                </CardContent>
            </Card>
        </Grid>
    );
}