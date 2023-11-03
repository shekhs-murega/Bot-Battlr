import React from 'react'

const botTypeClasses = {
    Assault: "icon military",
    Defender: "icon shield",
    Support: "icon plus circle",
    Medic: "icon magic",
    Witch: "icon magic",
    Captain: "icon star"
};

const BotCard = props => {
    const { bot, action, removeCard } = props;

  function handleClick(e) {
    console.log("handleClick fired!");
    // e.stopPropagation()
    action(bot);
  }

  function handleDischarge(e) {
    console.log("Red X Clicked!");
    e.stopPropagation();
    removeCard(bot);
  }

return (
    <div className='ui column'>
        <div className='ui card' onClick={handleClick}>
            <div className='image'>
                <img alt='oh no!' src={props.bot.avatar_url} />
            </div>
            <div className='content'>
            <div className='header'>
               {props.bot.name}
               <i className={botTypeClasses[props.bot.bot_class]} />
            </div>
            <div className='meta text-wrap'>
               <small>{props.bot.catchphrase}</small>
            </div>
            </div>
            <div className='extra content'>
               <span>
                <i className='icon heartbeat' />
                 {props.bot.health}              
                </span>

                <span>
                 <i className='icon lightning' />
                 {props.bot.damage}    
                </span>

                <span>
                    <i className='icon shield' />
                    {props.bot.armor}
                </span>
                <span>
                    <div className='ui center aligned segment basic'>
                       <button className='ui mini red button' onClick={handleDischarge}>
                         x
                        </button>     
                    </div>
                </span>
            </div>
        </div>

    </div>
);
};


export default BotCard;