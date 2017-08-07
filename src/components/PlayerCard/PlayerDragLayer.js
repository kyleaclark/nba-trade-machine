import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';

import PlayerCardDragPreview from './PlayerCardDragPreview';
import snapToGrid from '../../utils/snapToGrid';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100000
};

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  let { x, y } = currentOffset;

  if (props.snapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }

  const transform = `translate(${x}px, ${y}px)`;
  return {
    WebkitTransform: transform,
    transform
  };
}

class PlayerDragLayer extends Component {

  renderPlayer(type, player) {
    switch (type) {
      case 'player':
        return (
          <PlayerCardDragPreview player={player} />
        );
      default:
        return null;
    }
  }

  render() {
    const { player, playerType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderPlayer(playerType, player)}
        </div>
      </div>
    );
  }
}

function collectDragLayer(monitor) {
  return {
    player: monitor.getItem(),
    playerType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

export default DragLayer(collectDragLayer)(PlayerDragLayer);
