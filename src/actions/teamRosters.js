import * as types from '../constants/actionTypes';
import * as TeamRostersData from '../data/TeamRosters';

export function getTeamRosters(teamName) {
  return dispatch => {
    const teamRoster = TeamRostersData[teamName];
    dispatch({ type: types.GET_TEAM_ROSTERS, teamRoster, teamName, isFetching: true });
  };
}
