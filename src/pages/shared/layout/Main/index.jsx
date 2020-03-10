import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { routes } from '../../../../configs/routes';
import { LoginRequiredScreen } from '../../../login-required';
import { useUserData } from '../../../../components/hooks';
import LoginScreen from '../../../login';
import { NotFoundScreen } from '../../../not-found';

const Main = () => {
    const { user, userClaims } = useUserData();
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