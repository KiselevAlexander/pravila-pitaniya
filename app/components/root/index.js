import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Header} from 'components/root/header';
import {Footer} from 'components/root/footer';
import IndexPage from 'components/index-page';
import DeliveryPage from 'components/delivery';
import ContactsPage from 'components/contacts';
import AdminPanel from 'components/admin';
import AboutPage from 'components/about';
import {ToastContainer} from 'react-toastify';

import 'semantic-ui-less/definitions/globals/reset.less';
import 'semantic-ui-less/definitions/globals/site.less';
import 'semantic-ui-less/semantic.less';
import 'assets/scss/main.scss';

export const RootComponent = () => (
    <div className="root">
        <Header />
        <Switch>
            <Route path="/" component={IndexPage} exact />
            <Route path="/delivery" component={DeliveryPage} exact />
            <Route path="/contacts" component={ContactsPage} exact />
            <Route path="/about" component={AboutPage} exact />
            <Route path="/admin" component={AdminPanel} exact />
        </Switch>

        <Footer />
        <ToastContainer />
    </div>
);