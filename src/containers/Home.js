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

const nbaSplashImg = require('../assets/nba-splash.png');

function mapStateToProps(state) {
  return {
    teams: state.trade.get('teams'),
    numTeamsInTrade: state.trade.get('numTeamsInTrade'),
    isDragging: state.trade.get('isDragging'),
    tradeSuccess: state.trade.get('tradeSuccess'),
    tradeFailure: state.trade.get('tradeFailure')
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

  startScrolling(direction) {
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

  _onAddTeam = (teamId) => {
    this.props.addTradeTeam(teamId);
  }

  _renderTradeSuccess() {
    return (
      <h1>Trade Success</h1>
    )
  }

  _renderTradeFailure() {
    return (
      <div>
        <h1>Trade Failure</h1>
        <h4>{this.props.tradeFailure}</h4>
      </div>
    )
  }

  _renderLandingMessage() {
    const { numTeamsInTrade } = this.props;

    return (
      <div>
        <h1>Add two teams to make a trade</h1>
        {!numTeamsInTrade &&
          <div>
            <h3>A team must not exceed their cap room,<br />or otherwise the salary exchange must be within 150%</h3>
            <div style={{marginTop: '30px'}}>
              <img src={nbaSplashImg} alt="Fake Trade Machine" style={{boxShadow: '8px 4px 4px rgba(150, 150, 150, 0.5)'}} />
            </div>
          </div>}
      </div>
    );
  }

  render() {
    const { teams, numTeamsInTrade, tradeSuccess, tradeFailure } = this.props;

    const tradeTeams = {};
    teams.forEach((team) => {
      tradeTeams[team.id] = true;
    });

    return (
      <div>
        <AddTeam onAddTeam={this._onAddTeam} numTeamsInTrade={numTeamsInTrade} tradeTeams={tradeTeams} />

        <div style={{marginTop: '10px'}}>
          {tradeSuccess && this._renderTradeSuccess()}
          {tradeFailure && this._renderTradeFailure()}
          {!tradeSuccess && !tradeFailure && (numTeamsInTrade > 1 ?
            <h1>Drag and drop players to make a trade</h1> : this._renderLandingMessage())}
        </div>

        <div>
          <PlayerDragLayer snapToGrid={false} />
          {teams.map((team, i) =>
            <TeamPanel
              key={team.id}
              teamId={team.id}
              name={team.name}
              roster={team.roster}
              capRoom={team.capRoom}
              taxRoom={team.taxRoom}
              colors={team.colors}
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
