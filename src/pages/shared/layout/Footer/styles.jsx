import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { styled, makeStyles } from '@material-ui/core/styles';

export const SpacedBox = styled(Container)({
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 35,
    borderTop: '1px solid #d2d2d2'
});

const useStyles = makeStyles({
    image: {
        maxWidth: 250
    }
})

export const Logo = (props) => {
    const classes = useStyles();
    return <img alt="" {...props} className={[props.className, classes.image].join(' ')} />
}

export const Credits = styled(Typography)({
    fontSize: 20,
    fontWeight: 500
});