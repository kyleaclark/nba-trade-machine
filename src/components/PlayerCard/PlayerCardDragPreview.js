import React from 'react';
import PlayerCard from './PlayerCard';

const styles = {
  display: 'inline-block',
  transform: 'rotate(-5deg)',
  WebkitTransform: 'rotate(-5deg)'
};

const PlayerCardDragPreview = (props) => {
  styles.width = `${props.player.clientWidth || 250}px`;
  styles.height = `${props.player.clientHeight || 61}px`;

  return (
    <div style={styles}>
      <PlayerCard player={props.player.player} />
    </div>
  );
};


export default PlayerCardDragPreview;
