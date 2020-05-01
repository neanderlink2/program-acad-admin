import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const BackButton = ({ route = undefined, children }) => {
    const history = useHistory();

    const navigate = useCallback(() => {
        if (route) {
            history.push(route);
        } else {
            history.goBack();
        }
    }, [route]);

    return (
        <Button startIcon={<ArrowBack />} onClick={navigate}>{children ? children : 'Voltar'}</Button>
    )
};

export default BackButton;