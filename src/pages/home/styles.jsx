import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import logo from '../../assets/logo-only.png';

export const WhiteSection = styled.section({
    backgroundColor: '#f0f0f0'
});

export const CenterSection = styled(Container)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 75,
    paddingBottom: 75,
    '@media(max-width: 650px)': {
        textAlign: 'center'
    }
})

export const SectionTitle = styled(Typography)`
    border-bottom: 1px solid #d2d2d2;
    padding-bottom: 10px;
    padding-left: ${(props) => props.align === "right" || props.align === "center" ? "35px" : "0"};
    color: #f0f0f0;
    display: ${(props) => props.align === "left" || props.align === "right" ? "inherit" : "inline"};
    padding-right: ${(props) => props.align === "left" || props.align === "center" ? "35px" : "0"};
`;

export const SectionText = styled(Typography)({
    paddingTop: 15
});

const useStyles = makeStyles({
    image: {
        maxWidth: '300px',
        width: '100%',
        filter: 'brightness(0.4)'
    }
});

export const LogoProgramAcad = (props) => {
    const classes = useStyles();
    return (<img alt="" {...props} src={logo} className={[props.className, classes.image].join(' ')} />);
}