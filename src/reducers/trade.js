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
    name: action.name,
    conference: action.conference,
    roster: action.roster,
    capRoom: action.capRoom,
    taxRoom: action.taxRoom,
    incomingTradeSalary: 0,
    inboundSalary: 0,
    outboundSalary: 0
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

  const currentTeam = nextTeams[lastX];
  const futureTeam = nextTeams[nextX];
  const player = currentTeam.roster[lastY];

  if (lastX === nextX) {
    currentTeam.roster.splice(nextY, 0, currentTeam.roster.splice(lastY, 1)[0]);
  } else {
    // move element to new place
    futureTeam.roster.splice(nextY, 0, currentTeam.roster[lastY]);
    // delete element from old place
    currentTeam.roster.splice(lastY, 1);

    currentTeam.capRoom += player.salary;
    currentTeam.taxRoom += player.salary;
    currentTeam.outboundSalary += player.salary;
    futureTeam.capRoom -= player.salary;
    futureTeam.capRoom -= player.salary;
    futureTeam.inboundSalary += player.salary;

    nextTeams[lastX] = currentTeam;
    nextTeams[nextX] = futureTeam;
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
