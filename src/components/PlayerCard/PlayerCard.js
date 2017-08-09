import React from 'react';
import { Card } from 'antd';

import './PlayerCard.css';

const PlayerCard = (props) => {
  const { style, player } = props;

  /*
  <div style={style} className="player" id={style ? player.id : null}>
    <div className="player-container">
      <div className="player-content">
        <h5>{`${player.firstName} ${player.lastName} - ${player.position}`}</h5>
        <p>{player.contractYears} years - ${player.salary}</p>
      </div>
    </div>
  </div>
  */

  return (
    <Card id={style ? player.id : null} bodyStyle={{padding: '10px'}}>
      <h3>{`${player.firstName} ${player.lastName} - ${player.position}`}</h3>
      {player.contractYears} years - ${player.salary}
    </Card>
  );
};

export default PlayerCard;
