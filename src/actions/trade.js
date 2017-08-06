import * as types from '../constants/actionTypes';
import * as TeamRostersData from '../data/TeamRosters';

export function addTradeTeam(teamId, teamName) {
  return dispatch => {
    const teamRoster = TeamRostersData[teamId];
    dispatch({
      type: types.ADD_TRADE_TEAM,
      teamId,
      teamName,
      teamRoster
    });
  };
}
