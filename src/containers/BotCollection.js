import React from 'react';
import BotCard from '../components/BotCard';

// BotCollection component that displays a collection of bot cards 
export default function BotCollection({ botCollection, action, removeCard }) {
  // Map the BotCollection to bot card components 
  const displayBotCards = botCollection.map(bot => {
    return <BotCard key={bot.id} bot={bot} action={action} removeCard={removeCard} />;
  });

  return (
    <div className="ui four column grid">
      <div className="row">
        {/* Render the bot cards */}
        {displayBotCards}
        {/* Display a messege when the bot Army is completed */}
        You have completed your Bot Army! Thank you.
      </div>
    </div>
  );
}
