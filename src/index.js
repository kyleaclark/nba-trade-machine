import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';
import store from './store';
import App from './containers/App'
import './index.css';

render(
  <Provider store={store}>
    <Router>
      <div>
        <App />
      </div>
    </Router>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
