import React from 'react'
import BotCard from "../components/BotCard";

export default function BotCollection({BotCollection, action, removeCard }) {
  const displayBotCards = BotCollection.map(bot => {
    return <BotCard key={bot.id} bot={bot} action={action} removeCard={removeCard} />
});

    return (
    <div className='ui for column grid'>
        <div className='row'>
           {displayBotCards}
           You have completed your Bot Army.
        </div>
    </div>
  );
}
