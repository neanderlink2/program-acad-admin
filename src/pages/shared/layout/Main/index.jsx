import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useUserLogin } from '../../../../components/hooks';
import { signOut } from '../../../../configs/firebaseConfig';
import { routes } from '../../../../configs/routes';
import { NotFoundScreen } from '../../../not-found';
import { CenteredContainer } from './styles';

const Main = () => {
    const { user, userClaims } = useUserLogin();

    //console.log('claims usuario', userClaims);
    if (!!user && userClaims?.role !== 'INSTRUTOR') {        
        return (
            <CenteredContainer>
                <Typography variant="h5">Você não possui autorização para acessar este sistema.</Typography>
                <Button color="primary" variant="contained" onClick={() => signOut()}>Sair</Button>
            </CenteredContainer >
        )
    }

    return (
        <main style={{ marginTop: 50, paddingTop: 30 }}>
            <Switch>
                {routes.map((route) => {
                    if (!route.onlyAuthenticated || (route.onlyAuthenticated && user)) {
                        return (
                            <Route key={route.path} exact path={route.path} render={(props) => <route.component {...props} title={route.title} />} />
                        );
                    }
                    return <Route key={route.path} exact path={route.path} render={() => <Redirect to="/login" />}></Route>
                })}
                <Route path="*" component={NotFoundScreen} />
            </Switch>
        </main>
    )
}

export default Main;