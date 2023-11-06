import React, { useState, useEffect } from 'react';
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';
import BotSpecs from '../components/BotSpecs';

// BotsPage component definition 
function BotsPage() {
  // State variables for bot data and army management 
  const [botCollection, setBotCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [botArmy, setBotArmy] = useState([]);
  const [collectionVisible, setCollectionVisible] = useState(true);
  const [botSpecs, setBotSpecs] = useState({});

  // Fetch bot data from a server when the components mounts
  useEffect(() => {
    fetch('http://localhost:3000/bots')
      .then(response => response.json())
      .then(bots => {
        setBotCollection(bots);
        setFilteredCollection(bots);
      });
  }, []);

  // Function to add a bot to the army
  const addToArmy = (bot) => {
    const newCollection = filteredCollection.filter(card => card.bot_class !== bot.bot_class);
    setFilteredCollection(newCollection);
    setBotArmy([...botArmy, bot]);
    setCollectionVisible(true);
  };

  // Function to remove a bot from the army 
  const removeFromArmy = (bot) => {
    const newArmy = botArmy.filter(card => card.id !== bot.id);
    const armyClasses = newArmy.map(bot => bot.bot_class);
    const newCollection = botCollection.filter(bot => !armyClasses.includes(bot.bot_class));

    setBotArmy(newArmy);
    setFilteredCollection(newCollection);
  };

  // Function to remove a bot permanently
  const removeBotPermanently = (bot) => {
    const newCollection = botCollection.filter(card => card !== bot);
    const newFilteredCollection = filteredCollection.filter(card => card !== bot);
    const newArmy = botArmy.filter(card => card !== bot);

    setBotCollection(newCollection);
    setFilteredCollection(newFilteredCollection);
    setBotArmy(newArmy);

    // Send a DELETE request to remove the bot from the server
    fetch(`http://localhost:3000/bots/${bot.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(result => console.log(result));
  };

  // Function to display bot details
  const displayBotSpecs = (bot) => {
    setCollectionVisible(false);
    setBotSpecs(bot);
  };

  // Function to display bot collection 
  const displayBotCollection = () => {
    setCollectionVisible(true);
  };

  return (
    <div>
      {/* Render the army component */}
      <YourBotArmy bots={botArmy} action={removeFromArmy} removeCard={removeBotPermanently} />
      {collectionVisible ? (
        // Render the bot collection component 
        <BotCollection botCollection={filteredCollection} action={displayBotSpecs} removeCard={removeBotPermanently} />
      ) : (
        // Render the bot details component
        <BotSpecs bot={botSpecs} back={displayBotCollection} enlist={addToArmy} />
      )}
    </div>
  );
}

export default BotsPage;
