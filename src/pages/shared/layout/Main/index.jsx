import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useUserLogin } from '../../../../components/hooks';
import { routes } from '../../../../configs/routes';
import { NotFoundScreen } from '../../../not-found';

const Main = () => {
    const { user, userClaims } = useUserLogin();
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