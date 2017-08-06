import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import trade from './trade';

export default combineReducers({
  router: routerReducer,
  trade
});
