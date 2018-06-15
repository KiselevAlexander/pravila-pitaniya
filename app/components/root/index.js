import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Header} from 'components/root/header';
import {Footer} from 'components/root/footer';
import IndexPage from 'components/index-page';

export const RootComponent = () => (
    <div className="root">
        <Header />

        <Switch>
            <Route path="/" component={IndexPage} exact />
        </Switch>

        <Footer />
    </div>
);