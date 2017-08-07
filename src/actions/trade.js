import * as actionTypes from '../constants/actionTypes';
import * as TeamRostersData from '../data/TeamRosters';

export function addTradeTeam(teamId, teamName) {
  return dispatch => {
    const teamRoster = TeamRostersData[teamId];
    dispatch({
      type: actionTypes.ADD_TRADE_TEAM,
      teamId,
      teamName,
      teamRoster
    });
  };
}

export function movePlayer(lastX, lastY, nextX, nextY) {
  return (dispatch) => {
    dispatch({ type: actionTypes.MOVE_PLAYER, lastX, lastY, nextX, nextY });
  };
}

export function toggleDragging(isDragging) {
  return (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_DRAGGING, isDragging });
  };
}
