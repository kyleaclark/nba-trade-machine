import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon } from 'antd';

import * as TEAMS from '../../constants/teamInfo';

const divStyle = {
  float: 'left',
  width: '40%'
};

const containerStyle = {
  paddingLeft: '20%'
}

export default class AddTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderTeamItem(teamId, teamName) {
    const { tradeTeams, numTeamsInTrade } = this.props;
    const disableTeamItem = (numTeamsInTrade > 1) && !tradeTeams[teamId];

    const teamItemStyle = {
      width: '120px'
    };

    return (
      <Menu.Item key={teamId} disabled={disableTeamItem}>
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
          <div style={{backgroundColor: '#d71e54'}}>
            <h3 style={{textAlign: 'center'}}>Western Conference</h3>
          </div>
          <Menu onClick={(ev) => this.props.onAddTeam(ev.key)} mode='horizontal' theme='dark' multiple={true}>
            {this._renderTeamNames('Western')}
          </Menu>
        </div>
        <div style={divStyle}>
          <div style={{backgroundColor: '#006ab7'}}>
            <h3 style={{textAlign: 'center'}}>Eastern Conference</h3>
          </div>
          <Menu onClick={(ev) => this.props.onAddTeam(ev.key)} mode='horizontal' theme='dark' multiple={true}>
            {this._renderTeamNames('Eastern')}
          </Menu>
        </div>
      </div>
    );
  }

  render() {
    const { numTeamsInTrade } = this.props;
    const isAddTeamDisabled = numTeamsInTrade > 1 ? true : false;

    return (
      <div>
        <Dropdown overlay={this._renderAddTeamOverlay()}>
          <Button size='large'>
            {isAddTeamDisabled
              ? (<span>Remove Trade Partner</span>)
              : (<span>Add Trade Partner</span>)} <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}
