import React, { Component } from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import { FormattedNumber } from 'react-intl';

import PlayerCards from '../PlayerCard/PlayerCards';

import './TeamPanel.css';

class TeamPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { teamId, roster, capRoom, taxRoom, incomingSalary, outgoingSalary, x, movePlayer, isDragging } = this.props;
    const opacity = isDragging ? 0.5 : 1;

    return (
      <div className='team-panel' style={{ opacity }}>
        <h4>{this.props.name}</h4>
        <h5>Cap Room: $<FormattedNumber value={this.props.capRoom} /></h5>
        <h5>Tax Room: $<FormattedNumber value={this.props.taxRoom} /></h5>
        <h5>{teamId}</h5>
        <PlayerCards
          movePlayer={movePlayer}
          x={x}
          teamId={teamId}
          players={roster}
          startScrolling={this.props.startScrolling}
          stopScrolling={this.props.stopScrolling}
          isScrolling={this.props.isScrolling}
        />
      </div>
    );
  }
}

export default TeamPanel;
