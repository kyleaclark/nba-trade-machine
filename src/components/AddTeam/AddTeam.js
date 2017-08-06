import React, { Component } from 'react';

import TeamSelection from '../TeamSelection/TeamSelection';

export default class AddTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <TeamSelection onTeamSelection={this.props.onAddTeam} />
      </div>
    );
  }
}
