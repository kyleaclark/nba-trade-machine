import { Record } from 'immutable';

import * as actionTypes from '../constants/actionTypes';
import reducerHandler from '../utils/reducerHandler';

const initialRecord = Record({
  teams: [],
  numTeamsInTrade: 0,
  isDragging: false
});
const initialState = new initialRecord;

function addTradeTeam(state, action) {
  const nextTeams = [...state.teams];
  const team = {
    id: action.teamId,
    name: action.teamName,
    roster: action.teamRoster
  };
  nextTeams.push(team);

  return state.withMutations((ctx) => {
    ctx.set('teams', nextTeams)
       .set('numTeamsInTrade', nextTeams.length)
  });
}

function movePlayer(state, action) {
  const nextTeams = [...state.teams];
  const { lastX, lastY, nextX, nextY } = action;
  if (lastX === nextX) {
    nextTeams[lastX].roster.splice(nextY, 0, nextTeams[lastX].roster.splice(lastY, 1)[0]);
  } else {
    // move element to new place
    nextTeams[nextX].roster.splice(nextY, 0, nextTeams[lastX].roster[lastY]);
    // delete element from old place
    nextTeams[lastX].roster.splice(lastY, 1);
  }

  return state.withMutations((ctx) => {
    ctx.set('teams', nextTeams);
  });
}

function toggleDragging(state, action) {
  return state.set('isDragging', action.isDragging);
}

const actionHandlers = {
	[actionTypes.ADD_TRADE_TEAM]: addTradeTeam,
  [actionTypes.MOVE_PLAYER]: movePlayer,
  [actionTypes.TOGGLE_DRAGGING]: toggleDragging
};

export default reducerHandler(initialState, actionHandlers);
