import React, { Component } from 'react';
import { DropTarget, DragSource } from 'react-dnd';

import PlayerCards from '../PlayerCard/PlayerCards';

import './TeamPanel.css';

const teamSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x
    };
  },
  endDrag(props) {
    props.stopScrolling();
  }
};

const teamTarget = {
  canDrop() {
    return false;
  },
  hover(props, monitor) {
    if (!props.isScrolling) {
      if (window.innerWidth - monitor.getClientOffset().x < 200) {
        props.startScrolling('toRight');
      } else if (monitor.getClientOffset().x < 200) {
        props.startScrolling('toLeft');
      }
    } else {
      if (window.innerWidth - monitor.getClientOffset().x > 200 &&
          monitor.getClientOffset().x > 200
      ) {
        props.stopScrolling();
      }
    }
  }
};

class TeamPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderPlayerCard(player, index) {
    return (
      <div key={index}>
        <div>{player.firstName} {player.lastName} - {player.position}</div>
        <div>{player.contractYears} years - ${player.contractSalary}</div>
      </div>
    )
  }

  _renderTeamList() {
    const roster = this.props.roster;
    let teamList = [];

    roster.forEach((player, index) => {
        teamList.push(this._renderPlayerCard(player, index));
    });

    return teamList;
  }

  render() {
    const { connectDropTarget, connectDragSource, roster, x, movePlayer, isDragging } = this.props;
    const opacity = isDragging ? 0.5 : 1;

    return connectDragSource(connectDropTarget(
      <div className="team-panel" style={{ opacity }}>
        <h4>{this.props.name}</h4>
        <PlayerCards
          movePlayer={movePlayer}
          x={x}
          players={roster}
          startScrolling={this.props.startScrolling}
          stopScrolling={this.props.stopScrolling}
          isScrolling={this.props.isScrolling}
        />
      </div>
    ));
  }
}

function collectDropTarget(connectDragSource) {
  return {
    connectDropTarget: connectDragSource.dropTarget()
  }
}

function collectDragSource(connectDragSource, monitor) {
  return {
    connectDragSource: connectDragSource.dragSource(),
    isDragging: monitor.isDragging()
  }
}

TeamPanel = DragSource('team', teamSource, collectDragSource)(TeamPanel);
TeamPanel = DropTarget('team', teamTarget, collectDropTarget)(TeamPanel);

export default TeamPanel;
