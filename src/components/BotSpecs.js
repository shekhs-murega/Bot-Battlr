import React from "react"

// Mapping of Bot classes to Semantic UI icon classes 
const botTypeClasses = {
  Assault: "icon military",
  Defender: "icon shield",
  Support: "icon plus circle",
  Medic: "icon ambulance",
  Witch: "icon magic",
  Captain: "icon star"
}

// BotSpecs component definiton
const BotSpecs = props => {
  return (
    <div className="ui segment">
      <div className="ui two column centered grid">
        <div className="row">
          <div className="four wide column">
             {/* Bot image */}
            <img
              alt="oh no!"
              className="ui medium circular image bordered"
              src={props.bot.avatar_url}
            />
          </div>
          <div className="four wide column">
             {/* Bot name */}
            <h2>Name: {props.bot.name}</h2>
             {/* Bot catchphrase */}
            <p>
              <strong>Catchphrase: </strong>
              {props.bot.catchphrase}
            </p>
             {/* Bot class with corresponding icon */}
            <strong>
              Class: {props.bot.bot_class}
              <i className={botTypeClasses[props.bot.bot_class]} />
            </strong>
            <br />
            <div className="ui segment">
              <div className="ui three column centered grid">
                <div className="row">
                  <div className="column">
                     {/* Bot health */}
                    <i className="icon large circular red heartbeat" />
                    <strong>{props.bot.health}</strong>
                  </div>
                  <div className="column">
                     {/* Bot damage */}
                    <i className="icon large circular yellow lightning" />
                    <strong>{props.bot.damage}</strong>
                  </div>
                  <div className="column">
                     {/* Bot armor */}
                    <i className="icon large circular blue shield" />
                    <strong>{props.bot.armor}</strong>
                  </div>
                </div>
              </div>
            </div>
             {/* Go back button */}
            <button
              className="ui button fluid"
              onClick={() =>
                props.back()
              }
            >
              Go Back
            </button>
             {/* Enlist button */}
            <button
              className="ui button fluid"
              onClick={() =>
                props.enlist(props.bot)
              }
            >
              Enlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BotSpecs;
