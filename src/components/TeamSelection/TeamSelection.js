import React, { Component } from 'react';

import * as TEAMS from '../../constants/teamInfo';

export default class TeamSelection extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderTeamItem(teamId, teamName) {
    return (
      <div key={teamId} onClick={()=>this.props.onTeamSelection(teamId, teamName)}>
        {teamName}
      </div>
    )
  }

  _renderTeamNames() {
    let teamNames = [];

    for (let key in TEAMS) {
      let teamName = TEAMS[key].name;
      teamNames.push(this._renderTeamItem(key, teamName));
    };

    return teamNames;
  }

  render() {
    return (
      <div>
        {this._renderTeamNames()}
      </div>
    );
  }
}
