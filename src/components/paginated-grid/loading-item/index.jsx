import React from 'react';
import { Grid, CardContent, Card } from '@material-ui/core';
import { PlaceholderLoading, PlaceholderContent } from '../styles';
import { FlexLine } from '../../flex-helpers';

export const LoadingItem = () => {
    return (
        <Grid item xs={12} sm={6} lg={4} style={{ padding: 5 }}>
            <Card>
                <CardContent>
                    <PlaceholderLoading style={{ height: 150 }}>
                        <PlaceholderContent />
                    </PlaceholderLoading>
                    <PlaceholderLoading>
                        <PlaceholderContent />
                    </PlaceholderLoading>
                    <PlaceholderLoading>
                        <PlaceholderContent />
                    </PlaceholderLoading>
                    <FlexLine style={{ justifyContent: 'space-between' }}>
                        <PlaceholderLoading style={{ maxWidth: '50%' }}>
                            <PlaceholderContent />
                        </PlaceholderLoading>
                    </FlexLine>
                </CardContent>
            </Card>
        </Grid>
    );
}