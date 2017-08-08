import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import * as TradeActions from '../actions/trade';
import AddTeam from '../components/AddTeam/AddTeam';
import TeamPanel from '../components/TeamPanel/TeamPanel';
import PlayerDragLayer from '../components/PlayerCard/PlayerDragLayer';

function mapStateToProps(state) {
  return {
    teams: state.trade.get('teams')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TradeActions, dispatch);
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.moveTeam = this.moveTeam.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.findTeam = this.findTeam.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.stopScrolling = this.stopScrolling.bind(this);
    this.startScrolling = this.startScrolling.bind(this);
    this.state = { isScrolling: false };
  }

  componentWillMount() {

  }

  startScrolling(direction) {
    // if (!this.state.isScrolling) {
    switch (direction) {
      case 'toLeft':
        this.setState({ isScrolling: true }, this.scrollLeft());
        break;
      case 'toRight':
        this.setState({ isScrolling: true }, this.scrollRight());
        break;
      default:
        break;
    }
    // }
  }

  scrollRight() {
    function scroll() {
      document.getElementsByTagName('main')[0].scrollLeft += 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  scrollLeft() {
    function scroll() {
      document.getElementsByTagName('main')[0].scrollLeft -= 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  stopScrolling() {
    this.setState({ isScrolling: false }, clearInterval(this.scrollInterval));
  }

  movePlayer(lastX, lastY, nextX, nextY) {
    this.props.movePlayer(lastX, lastY, nextX, nextY);
  }

  moveTeam(listId, nextX) {
    const { lastX } = this.findTeam(listId);
    this.props.moveTeam(lastX, nextX);
  }

  findTeam(id) {
    const { teams } = this.props;
    const team = teams.filter(l => l.id === id)[0];

    return {
      team,
      lastX: teams.indexOf(team)
    };
  }

  _onAddTeam = (teamId, teamName) => {
    this.props.addTradeTeam(teamId, teamName);
  }

  render() {
    const teams = this.props.teams;

    return (
      <div style={{ height: '100%' }}>
        <h2>Welcome to the NBA Trade Machine</h2>
        <AddTeam onAddTeam={this._onAddTeam} />
        <PlayerDragLayer snapToGrid={false} />
        {teams.map((team, i) =>
          <TeamPanel
            key={team.id}
            teamId={team.id}
            name={team.name}
            roster={team.roster}
            capRoom={team.capRoom}
            taxRoom={team.taxRoom}
            inboundSalary={team.inboundSalary}
            outboundSalary={team.outboundSalary}
            moveTeam={this.moveTeam}
            movePlayer={this.movePlayer}
            startScrolling={this.startScrolling}
            stopScrolling={this.stopScrolling}
            isScrolling={this.state.isScrolling}
            x={i}
          />
        )}
      </div>
    );
  }
}

Home = DragDropContext(HTML5Backend)(Home)
Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
Home = withRouter(Home);

export default Home;
