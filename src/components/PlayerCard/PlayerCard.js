import React from 'react';

import './PlayerCard.css';

const PlayerCard = (props) => {
  const { style, player } = props;

  return (
    <div style={style} className="player" id={style ? player.id : null}>
      <div className="player-container">
        <div className="player-content">
          <h5>{`${player.firstName} ${player.lastName} - ${player.position}`}</h5>
          <p>{player.contractYears} years - ${player.contractSalary}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
