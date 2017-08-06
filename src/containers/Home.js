import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getTeamRosters } from '../actions/teamRosters';
import TeamPanel from '../components/TeamPanel/TeamPanel';
//import * as TEAM_NAMES from '../constants/teamNames';

function mapStateToProps(state) {
  return {
    teamRosters: state.teamRosters
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTeamRosters }, dispatch);
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.getTeamRosters('PhoenixSuns');
  }

  render() {
    const roster = this.props.teamRosters.get('PhoenixSuns')

    return (
      <div style={{ height: '100%' }}>
        <h2>Welcome to the NBA Trade Machine</h2>
        {roster && <TeamPanel roster={roster} />}
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home))
