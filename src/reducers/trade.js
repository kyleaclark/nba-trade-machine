import { Record } from 'immutable';

import * as actionTypes from '../constants/actionTypes';
import * as TeamRostersData from '../constants/teamRosters';
import * as TeamInfoData from '../constants/teamInfo';
import reducerHandler from '../utils/reducerHandler';

const initialRecord = Record({
  teams: [],
  numTeamsInTrade: 0,
  isDragging: false,
  tradeSuccess: false,
  tradeFailure: false
});
const initialState = new initialRecord;

function addTradeTeam(state, action) {
  const nextTeams = [...state.teams];

  let duplicateTeamIndex = null;
  for (let index = 0; index < nextTeams.length; index++) {
    if (nextTeams[index].id === action.teamId) {
        duplicateTeamIndex = index;
        break;
    }
  }

  if (duplicateTeamIndex !== null) {
    nextTeams.splice(duplicateTeamIndex, 1);

    if (nextTeams.length > 0) {
      const teamId = nextTeams[0].id;
      const roster = TeamRostersData[teamId];
      const teamInfo = TeamInfoData[teamId];
      nextTeams.pop()
      action = {
        teamId,
        roster,
        ...teamInfo
      }
    } else {
      action = null;
    }
  }

  if (action != null) {
    const team = {
      id: action.teamId,
      name: action.name,
      conference: action.conference,
      roster: action.roster.slice(),
      capRoom: action.capRoom,
      taxRoom: action.taxRoom,
      colors: action.colors,
      inboundSalary: 0,
      outboundSalary: 0
    };

    nextTeams.push(team);
  }

  return state.withMutations((ctx) => {
    ctx.set('teams', nextTeams)
       .set('numTeamsInTrade', nextTeams.length)
       .set('tradeSuccess', false)
       .set('tradeFailure', false);
  });
}

function movePlayer(state, action) {
  const nextTeams = [...state.teams];
  let tradeSuccess = state.tradeSuccess;
  let tradeFailure = state.tradeFailure;
  const { lastX, lastY, nextX, nextY } = action;

  const currentTeam = nextTeams[lastX];
  const futureTeam = nextTeams[nextX];
  const player = currentTeam.roster[lastY];

  if (lastX === nextX) {
    currentTeam.roster.splice(nextY, 0, currentTeam.roster.splice(lastY, 1)[0]);
  } else {
    if (!player.originalTeamId) {
      currentTeam.roster[lastY].originalTeamId = currentTeam.id;
    }

    // move element to new place
    futureTeam.roster.splice(nextY, 0, currentTeam.roster[lastY]);
    // delete element from old place
    currentTeam.roster.splice(lastY, 1);

    currentTeam.capRoom += player.salary;
    currentTeam.taxRoom += player.salary;
    currentTeam.outboundSalary += player.salary;
    futureTeam.capRoom -= player.salary;
    futureTeam.taxRoom -= player.salary;
    futureTeam.inboundSalary += player.salary;

    nextTeams[lastX] = currentTeam;
    nextTeams[nextX] = futureTeam;

    if (futureTeam.capRoom < 0) {
      if (futureTeam.inboundSalary <= (futureTeam.outboundSalary * 1.5)) {
        tradeSuccess = true;
        tradeFailure = false;
      } else {
        tradeSuccess = false;
        tradeFailure = 'The ' + futureTeam.name + ' are the over cap and exceeding 150% exchanged salary in the trade';
      }
    } else if (currentTeam.outboundSalary === 0 && futureTeam.outboundSalary === 0) {
      tradeSuccess = false;
      tradeFailure = false;
    } else {
      tradeSuccess = true;
      tradeFailure = false;
    }
  }

  return state.withMutations((ctx) => {
    ctx.set('teams', nextTeams)
       .set('tradeSuccess', tradeSuccess)
       .set('tradeFailure', tradeFailure);
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
