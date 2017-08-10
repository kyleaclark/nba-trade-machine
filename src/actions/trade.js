import * as actionTypes from '../constants/actionTypes';
import * as TeamRostersData from '../constants/teamRosters';
import * as TeamInfoData from '../constants/teamInfo';

export function addTradeTeam(teamId) {
  return dispatch => {
    const roster = TeamRostersData[teamId];
    const teamInfo = TeamInfoData[teamId];
    dispatch({
      type: actionTypes.ADD_TRADE_TEAM,
      teamId,
      roster,
      ...teamInfo
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
