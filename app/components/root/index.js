import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Header} from 'components/root/header';
import {Footer} from 'components/root/footer';
import IndexPage from 'components/index-page';
import 'semantic-ui-less/definitions/globals/reset.less';
import 'semantic-ui-less/definitions/globals/site.less';
import 'semantic-ui-less/semantic.less';

export const RootComponent = () => (
    <div className="root">
        <Header />
        <Switch>
            <Route path="/" component={IndexPage} exact />
        </Switch>

        <Footer />
    </div>
);