import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {RootComponent} from 'components/root';

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" component={RootComponent} />
        </Switch>
    </Router>
);

export default Routes;

