import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import teamRosters from './teamRosters';

export default combineReducers({
  router: routerReducer,
  teamRosters
});
