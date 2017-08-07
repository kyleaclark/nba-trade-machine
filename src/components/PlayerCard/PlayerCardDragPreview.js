import React from 'react';
import PlayerCard from './PlayerCard';

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)'
};

const PlayerCardDragPreview = (props) => {
  styles.width = `${props.player.clientWidth || 243}px`;
  styles.height = `${props.player.clientHeight || 243}px`;

  return (
    <div style={styles}>
      <PlayerCard player={props.player.player} />
    </div>
  );
};


export default PlayerCardDragPreview;
