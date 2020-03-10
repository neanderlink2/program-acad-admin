import React from 'react';
import { PlaceholderLoading, PlaceholderContent } from '../styles';
import { Grid, CardContent, Card } from '@material-ui/core';
import { FlexLine } from '../../../../components/flex-helpers/index';

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