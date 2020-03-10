import React, { Fragment, useMemo } from 'react';
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';
import { LoadingItem } from './loading-item';

export const PaginatedGrid = ({ pagedList, itemsNotFoundLabel = "Nenhum item foi encontrado...", isLoading = false, renderItem = (item) => { }, onPageChange = (index) => { } }) => {
    const pagination = useMemo(() => {
        if (pagedList) {
            let pagination = [];
            for (let i = 0; i < pagedList.totalPages; i++) {
                pagination.push(<Button key={i} variant={i === pagedList.pageIndex ? "contained" : "outlined"} color="secondary" onClick={() => {
                    onPageChange(i);
                }}>{i + 1}</Button>)
            }
            return pagination;
        }
    }, [pagedList, onPageChange]);

    return (
        <Grid container>
            {
                isLoading ?
                    <Fragment><LoadingItem /><LoadingItem /><LoadingItem /></Fragment>
                    :
                    pagedList && pagedList.items.length <= 0 ?
                        <Typography component="small">{itemsNotFoundLabel}</Typography>
                        :
                        pagedList && pagedList.items.map((item) => {
                            return renderItem(item);
                        })
            }
            <Grid item xs={12} style={{ padding: 10, textAlign: 'right' }}>
                {
                    isLoading ?
                        null
                        :
                        <ButtonGroup color="secondary" aria-label="outlined primary button group">
                            <Button disabled={pagedList ? !pagedList.hasPreviousPage : true} onClick={() => {
                                if (pagedList) {
                                    onPageChange(pagedList.pageIndex - 1);
                                }
                            }}> Voltar </Button>
                            {pagination}
                            <Button disabled={pagedList ? !pagedList.hasNextPage : true}
                                onClick={() => {
                                    if (pagedList) {
                                        onPageChange(pagedList.pageIndex + 1);
                                    }
                                }}> Próximo </Button>
                        </ButtonGroup>
                }
            </Grid>
        </Grid>
    )
}