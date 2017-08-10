import React from 'react';
import { Card } from 'antd';

import './PlayerCard.css';

const PlayerCard = (props) => {
  const { style, player, teamId } = props;

  let cardBodyStyle = {
    padding: '10px'
  };

  if (player.originalTeamId && player.originalTeamId !== teamId) {
    cardBodyStyle.border = '2px solid #006ab7';
  }

  return (
    <Card id={style ? player.id : null} bodyStyle={cardBodyStyle}>
      <h3>{`${player.firstName} ${player.lastName} - ${player.position}`}</h3>
      {player.contractYears} years - ${player.salary}
      {player.originalTeamId && (<span>{player.hasBeenTraded}</span>)}
    </Card>
  );
};

export default PlayerCard;
