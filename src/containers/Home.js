import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addTradeTeam } from '../actions/trade';
import AddTeam from '../components/AddTeam/AddTeam';
import TeamPanel from '../components/TeamPanel/TeamPanel';

function mapStateToProps(state) {
  console.log('mapStateToProps : ', state);

  return {
    trade: state.trade
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTradeTeam }, dispatch);
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  _onAddTeam = (teamId, teamName) => {
    console.log('addTradeTeam : ', teamId, teamName);
    this.props.addTradeTeam(teamId, teamName);
  }

  render() {
    const teams = this.props.trade.get('teams') || [];

    console.log('render teams : ', teams)

    return (
      <div style={{ height: '100%' }}>
        <h2>Welcome to the NBA Trade Machine</h2>
        <AddTeam onAddTeam={this._onAddTeam} />
        {teams.map((team, i) =>
          <TeamPanel
            key={team.name}
            name={team.name}
            roster={team.roster}
          />
        )}
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home))
