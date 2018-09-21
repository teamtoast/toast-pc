import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import {AppContainer} from 'react-hot-loader';
import Root from "./client/root";
import registerServiceWorker from "./registerServiceWorker";

const rootEl = document.getElementById('root');

ReactDOM.render(<Root />, rootEl);
registerServiceWorker();


if (module.hot) {
    module.hot.accept('./shared/App', () => {
        const NextApp = require('./shared/App').default; // eslint-disable-line global-require
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            rootEl
        );
    });
}
