import { Map } from 'immutable';

import * as types from '../constants/actionTypes';
import reducerHandler from '../utils/reducerHandler';

const initialState = Map({});

function getTeamRosters(state, action) {
  return state.withMutations((ctx) => {
    ctx.set(action.teamName, action.teamRoster);
  });
}

const actionHandlers = {
	[types.GET_TEAM_ROSTERS]: getTeamRosters
}

export default reducerHandler(initialState, actionHandlers);
