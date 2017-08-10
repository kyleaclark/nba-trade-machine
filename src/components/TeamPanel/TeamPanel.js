import React, { Component } from 'react';
import { FormattedNumber } from 'react-intl';

import PlayerCards from '../PlayerCard/PlayerCards';

import './TeamPanel.css';

class TeamPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { teamId, roster, capRoom, taxRoom, colors, inboundSalary, outboundSalary, x, movePlayer, isDragging } = this.props;
    const opacity = isDragging ? 0.5 : 1;
    const teamPanelClassName = 'team-panel';
    const teamPanelInfoClassName = 'team-panel-info';
    const netTradeSalary = outboundSalary - inboundSalary;

    return (
      <div className={teamPanelClassName} style={{ opacity }}>
        <div style={{backgroundColor: colors.primary}}>
          <h2 style={{color: '#222'}}>{this.props.name}</h2>
        </div>
        <div className={teamPanelInfoClassName}>
          <h4>Cap Room: <FormattedNumber value={capRoom} /></h4>
          <h4>Tax Line: <FormattedNumber value={taxRoom} /></h4>
          <h4>Net Trade Salary: <FormattedNumber value={netTradeSalary} /></h4>
        </div>
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
