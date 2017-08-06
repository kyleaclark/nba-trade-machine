import { Record } from 'immutable';

import * as types from '../constants/actionTypes';
import reducerHandler from '../utils/reducerHandler';

const initialRecord = Record({
  teams: [],
  numTeamsInTrade: 0
});
const initialState = new initialRecord;

function addTradeTeam(state, action) {
  const nextTeams = [...state.teams];
  const team = {
    name: action.teamName,
    roster: action.teamRoster
  };
  nextTeams.push(team);

  return state.withMutations((ctx) => {
    ctx.set('teams', nextTeams)
       .set('numTeamsInTrade', nextTeams.length)
  });
}

const actionHandlers = {
	[types.ADD_TRADE_TEAM]: addTradeTeam
}

export default reducerHandler(initialState, actionHandlers);
