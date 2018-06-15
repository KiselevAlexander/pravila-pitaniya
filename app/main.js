import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import Routes from './config/routes';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'),
    );
};

render(Routes);

if (module.hot) {
    module.hot.accept('./config/routes', () => {
        const newApp = require('./config/routes').default;
        render(newApp);
    });
}
