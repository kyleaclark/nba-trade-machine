import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import store from './store';
import App from './containers/App'
import './index.css';

render(
  <Provider store={store}>
    <IntlProvider locale="en">
      <BrowserRouter>
        <div>
          <App />
        </div>
      </BrowserRouter>
    </IntlProvider>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
