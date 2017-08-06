import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';

export const urls = {
  index: '/',
};

export const routes = (
  <Route path={urls.index} component={App}>
    <IndexRoute component={Home} />
  </Route>
);
