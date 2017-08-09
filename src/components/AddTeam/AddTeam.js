import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, message } from 'antd';

import * as TEAMS from '../../constants/teamInfo';
import TeamSelection from '../TeamSelection/TeamSelection';

const divStyle = {
  float: 'left',
  width: '40%'
};

const containerStyle = {
  paddingLeft: '20%'
}

const _onMenuClick = (ev) => {
  console.log('onMenuClick : ', ev)

}

export default class AddTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderTeamItem(teamId, teamName) {
    const teamItemStyle = {
      width: '120px'
    };

    return (
      <Menu.Item key={teamId}>
        <div style={teamItemStyle}>
          {teamName}
        </div>
      </Menu.Item>
    )
  }

  _renderTeamNames(conference) {
    let teamNames = [];

    for (let key in TEAMS) {
      let team = TEAMS[key];
      if (team.conference.toLowerCase() === conference.toLowerCase()) {
        teamNames.push(this._renderTeamItem(key, team.name));
      }
    };

    return teamNames;
  }

  _renderAddTeamOverlay() {
    return (
      <div style={containerStyle}>
        <div style={divStyle}>
          <h3 style={{textAlign: 'center'}}>Western Conference</h3>
          <Menu onClick={(ev) => this.props.onAddTeam(ev.key)} mode='horizontal' theme='dark'>
            {this._renderTeamNames('Western')}
          </Menu>
        </div>
        <div style={divStyle}>
          <h3 style={{textAlign: 'center'}}>Eastern Conference</h3>
          <Menu onClick={(ev) => this.props.onAddTeam(ev.key)} mode='horizontal' theme='dark'>
            {this._renderTeamNames('Eastern')}
          </Menu>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="area">
        <Dropdown overlay={this._renderAddTeamOverlay()}>
          <Button style={{ marginLeft: 8 }}>
            Add Team <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}
