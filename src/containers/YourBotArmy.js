import React from 'react';
import BotCard from '../components/BotCard';

// YourBotArmy component definition 
export default function YourBotArmy(props) {
  // Create an array of bot card components for each bot in the props
  const displayBots = props.bots.map(bot => {
    return <BotCard key={bot.id} bot={bot} action={props.action} removeCard={props.removeCard} />;
  });

  // Render the bot army segment with a grid layout
  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">{displayBots}</div>
      </div>
    </div>
  );
}
