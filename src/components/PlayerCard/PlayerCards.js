import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import PlayerCard from './DraggablePlayerCard';
import { PLAYER_CARD_HEIGHT, PLAYER_CARD_MARGIN, OFFSET_HEIGHT } from '../../constants/playerCards.js';

import './PlayerCards.css';


function getPlaceholderIndex(y, scrollY) {
  // shift placeholder if y position more than card height / 2
  const yPos = y - OFFSET_HEIGHT + scrollY;
  let placeholderIndex;
  if (yPos < PLAYER_CARD_HEIGHT / 2) {
    placeholderIndex = -1; // place at the start
  } else {
    placeholderIndex = Math.floor((yPos - PLAYER_CARD_HEIGHT / 2) / (PLAYER_CARD_HEIGHT + PLAYER_CARD_MARGIN));
  }
  return placeholderIndex;
}

const specs = {
  drop(props, monitor, component) {
    document.getElementById(monitor.getItem().id).style.display = 'block';
    const { placeholderIndex } = component.state;
    const lastX = monitor.getItem().x;
    const lastY = monitor.getItem().y;
    const nextX = props.x;
    let nextY = placeholderIndex;

    if (lastY > nextY) { // move top
      nextY += 1;
    } else if (lastX !== nextX) { // insert into another list
      nextY += 1;
    }

    if (lastX === nextX && lastY === nextY) { // if position equel
      return;
    }

    props.movePlayer(lastX, lastY, nextX, nextY);
  },
  hover(props, monitor, component) {
    // defines where placeholder is rendered
    const placeholderIndex = getPlaceholderIndex(
      monitor.getClientOffset().y,
      findDOMNode(component).scrollTop
    );

    // horizontal scroll
    if (!props.isScrolling) {
      if (window.innerWidth - monitor.getClientOffset().x < 200) {
        props.startScrolling('toRight');
      } else if (monitor.getClientOffset().x < 200) {
        props.startScrolling('toLeft');
      }
    } else {
      if (window.innerWidth - monitor.getClientOffset().x > 200 &&
          monitor.getClientOffset().x > 200
      ) {
        props.stopScrolling();
      }
    }

    // IMPORTANT!
    // HACK! Since there is an open bug in react-dnd, making it impossible
    // to get the current client offset through the collect function as the
    // user moves the mouse, we do this awful hack and set the state (!!)
    // on the component from here outside the component.
    // https://github.com/gaearon/react-dnd/issues/179
    component.setState({ placeholderIndex });

    // when drag begins, we hide the card and only display cardDragPreview
    const item = monitor.getItem();
    document.getElementById(item.id).style.display = 'none';
  }
};

class PlayerCards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      placeholderIndex: undefined,
      isScrolling: false,
    };
  }

  render() {
    const { connectDropTarget, x, players, isOver, canDrop } = this.props;
    const { placeholderIndex } = this.state;

    let isPlaceHold = false;
    let playerList = [];
    players.forEach((player, i) => {
      if (isOver && canDrop) {
        isPlaceHold = false;
        if (i === 0 && placeholderIndex === -1) {
          playerList.push(<div key="placeholder" className="player placeholder" />);
        } else if (placeholderIndex > i) {
          isPlaceHold = true;
        }
      }
      if (player !== undefined) {
        playerList.push(
          <PlayerCard x={x} y={i}
            player={player}
            key={player.id}
            stopScrolling={this.props.stopScrolling}
          />
        );
      }
      if (isOver && canDrop && placeholderIndex === i) {
        playerList.push(<div key="placeholder" className="player placeholder" />);
      }
    });

    // if placeholder index is greater than array.length, display placeholder as last
    if (isPlaceHold) {
      playerList.push(<div key="placeholder" className="player placeholder" />);
    }

    // if there is no players in players currently, display a placeholder anyway
    if (isOver && canDrop && players.length === 0) {
      playerList.push(<div key="placeholder" className="player placeholder" />);
    }

    return connectDropTarget(
      <div className="player-cards">
        {playerList}
      </div>
    );
  }
}

function collectDropTarget(connectDragSource, monitor) {
  return {
    connectDropTarget: connectDragSource.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    player: monitor.getItem()
  }
}

export default DropTarget('player', specs, collectDropTarget)(PlayerCards);
