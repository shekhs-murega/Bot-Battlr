import React, { useState, useEffect } from 'react';
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';
import BotSpecs from '../components/BotSpecs';

function BotsPage() {
  const [botCollection, setBotCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [botArmy, setBotArmy] = useState([]);
  const [collectionVisible, setCollectionVisible] = useState(true);
  const [botSpecs, setBotSpecs] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/bots')
      .then(response => response.json())
      .then(bots => {
        setBotCollection(bots);
        setFilteredCollection(bots);
      });
  }, []);

  const addToArmy = (bot) => {
    const newCollection = filteredCollection.filter(card => card.bot_class !== bot.bot_class);
    setFilteredCollection(newCollection);
    setBotArmy([...botArmy, bot]);
    setCollectionVisible(true);
  };

  const removeFromArmy = (bot) => {
    const newArmy = botArmy.filter(card => card.id !== bot.id);
    const armyClasses = newArmy.map(bot => bot.bot_class);
    const newCollection = botCollection.filter(bot => !armyClasses.includes(bot.bot_class));

    setBotArmy(newArmy);
    setFilteredCollection(newCollection);
  };

  const removeBotPermanently = (bot) => {
    const newCollection = botCollection.filter(card => card !== bot);
    const newFilteredCollection = filteredCollection.filter(card => card !== bot);
    const newArmy = botArmy.filter(card => card !== bot);

    setBotCollection(newCollection);
    setFilteredCollection(newFilteredCollection);
    setBotArmy(newArmy);

    fetch(`http://localhost:3000/bots/${bot.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(result => console.log(result));
  };

  const displayBotSpecs = (bot) => {
    setCollectionVisible(false);
    setBotSpecs(bot);
  };

  const displayBotCollection = () => {
    setCollectionVisible(true);
  };

  return (
    <div>
      <YourBotArmy bots={botArmy} action={removeFromArmy} removeCard={removeBotPermanently} />
      {collectionVisible ? (
        <BotCollection botCollection={filteredCollection} action={displayBotSpecs} removeCard={removeBotPermanently} />
      ) : (
        <BotSpecs bot={botSpecs} back={displayBotCollection} enlist={addToArmy} />
      )}
    </div>
  );
}

export default BotsPage;
