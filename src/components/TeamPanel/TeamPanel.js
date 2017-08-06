import React, { Component } from 'react';

export default class TeamPanel extends Component {

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
    return (
      <div>
        <h4>{this.props.name}</h4>
        {this._renderTeamList()}
      </div>
    );
  }
}
