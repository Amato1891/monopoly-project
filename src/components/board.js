import '../App.css';
import '../sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDiamond } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import {DisplayModal, PlayerDetailsModal, PropertyDetailsModal} from './modal';
import propertyData from '../data/properties.json';
import railRoadData from '../data/railroads.json';
import utilitiesData from '../data/utilities.json';
import spacesData from '../data/spaces.json';
import Sidebar from './Sidebar';
import DiceRoller from './DiceRoller';
import {gamePieceHelper} from '../utilities/gamePieceHelper';
import {IncomeTax} from './IncomeTax';

function Board() {

// set state of key gameboard elements
const [players, setPlayers] = useState([]);
const [activePlayer, setActivePlayer] = useState('');
const [propertiesOwned, setPropertiesOwned] = useState([{name: 'ventnor ave', priceToBuy: 260, priceToMortgage: 130, color: 'yellow'}]);
// other state managed components
const [modalShow, setModalShow] = React.useState(true);
const [playerDetailsModalShow, setPlayerDetailsModalShow] = React.useState(false);
const [numberOfPlayers, setNumberOfPlayers] = useState(0);
const [activeProp, setActiveProp] = useState('');
const [propertyModalShow, setPropertyModalShow] = React.useState(false);
const [rolledValue, setRolledValue] = useState(null);
const [resetDice, setResetDice] = useState(false);
const [rolledDoubles, setRolledDoubles] = useState(false);
const [incomeTaxCellActive, setIncomeTaxCellActive] = useState(false);
const [incomeTaxPaid, setIncomeTaxPaid] = useState(false);

  // Function to handle the rolledDoubles value from DiceRoller
  const checkDoublesRoll = (value) => {
    setRolledDoubles(value);
  };

// generate id for players
function generateRandomId() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// logic for handling ending current player turn and beginning the new players turn
  const handleEndTurn = () => {
    setRolledValue(null);
    setResetDice(true);
    setIncomeTaxPaid (false);
    // set new active player
    let indexOfCurrentPlayer = players.findIndex(player => player.playerId === activePlayer.playerId);
    let newActivePlayer = indexOfCurrentPlayer+1 === players.length ? 0 : indexOfCurrentPlayer+1;
    setActivePlayer(players[newActivePlayer]);
  };

  const handleDiceRoll = (value) => {
    setResetDice(false);
    setRolledValue(value);
    // calculate new position
    const newPosition = activePlayer.position + value;
    // Check if the player's new position exceeds 39
    const adjustedPosition = newPosition % 40;
    // Update the player's position
    activePlayer.position = adjustedPosition;
    
  };

  // hide the player selection modal
  const handleModalHide = (totalPlayers) => {
    setNumberOfPlayers(totalPlayers);
    setModalShow(false);
    if (totalPlayers < 4) {
      setPlayerDetailsModalShow(true);
    }
  };
  
  // hide the income tax modal
  const handleIncomeTaxModalHide = (playerCashAfterTax) => {
    activePlayer.cash = playerCashAfterTax;
    setActivePlayer(activePlayer);
    setIncomeTaxPaid (true);
  };

  // hide the property details modal
  const handlePropDetailsModalHide = () => {
    setPropertyModalShow(false);
  };

  const handleLoadPropertyDetails = (e) => {
    // if clicked directly onto the gamepiece return out of fn or it will break.
    if (e.target.localName === 'img')return;
    const textContent = e.target.children[0] ? e.target.children[0].textContent : e.target.className === 'price' ? e.target.previousSibling.textContent : e.target.textContent;
    const selectedProperty = propertyData.properties.find(property => property.name === textContent);
    const selectedRailroad = selectedProperty ? console.log('property found') : railRoadData.railroads.find(railRoad => railRoad.name === textContent);
    const selectedUtility = selectedRailroad || selectedProperty ? console.log('property/railroad found') : utilitiesData.utilities.find(utility => utility.name === textContent);
    setPropertyModalShow (true);
    return setActiveProp (selectedProperty || selectedRailroad || selectedUtility);
  }

  // hide the player details modal
  const handlePlayerDetailsModalHide = (name, gamePiece, hidePlayerAdditionModal) => {
    const playerObj = {
      playerId: generateRandomId(),
      position: 0,
      name,
      gamePiece,
      cash: 2000,
      propertiesOwned,
      housesOwned: 0,
      icon: gamePieceHelper(gamePiece)
    };
    // Add player only if both name and gamePiece are provided
    if (playerObj.name && playerObj.gamePiece) {
      setPlayers([...players, playerObj]);
    }
    // Set player details modal visibility based on hidePlayerAdditionModal flag
    setPlayerDetailsModalShow(!hidePlayerAdditionModal);
    // Set active player to the first player in the list
    setActivePlayer(players[0]);
  };

  // render the property space and the gamepiece if player is currently on that property
  const PropertyCell = ({ name, additionalClasses, players }) => {
    // Find the object in the JSON data that matches the provided name
    const property = spacesData.spaces.find(
      (space) =>
        (space.type === 'property' ||
          space.type === 'rail-road' ||
          space.type === 'utilities') &&
        space.name === name
    );
  
    // If a matching property is found, extract relevant properties
    if (property) {
      
      const { color, price, location, position } = property;
      return (
        <div
          className={`cell ${location} ${color} ${additionalClasses || ''}`}
          onClick={handleLoadPropertyDetails}
        >
          <span className="prop-name">{name}</span>
          <span className="price">price ${price}</span>
          {/* Render game piece icon only if player is on this cell */}
          {players &&
            players.map((player, index) => {
              if (player.position === position) {
                return (
                  <div key={index} style={{ display: 'inline-block', margin: '5px' }}>
                    <img
                      id={index}
                      className="player-icon"
                      src={gamePieceHelper(player.gamePiece)}
                      alt={`Player ${index}`}
                      style={{ top: `${(index + 1) * 25}px`, left: `${(index + 1) * 20}px` }}
                    />
                  </div>
                );
              }
              return null;
            })}
        </div>
      );
    } else {
      return null;
    }
  };
   // render the special spaces and the gamepiece if player is currently on that space
  const SpecialCell = ({ specialCellName, location, additionalClasses, players, position }) => {
    // Find the object in the JSON data that matches the provided name
    const property = spacesData.spaces.find(
      (space) =>
        (space.position === position ));
    return (
      <div className={`${specialCellName} ${location} ${additionalClasses || ''}`}>
        {/* Render game piece icon only if player is on this cell */}
        {players &&
          players.map((player, index) => {
            if (property && (player.position == property.position)) {
              return (
                <div key={index} style={{ display: 'inline-block', margin: '5px' }}>
                  <img
                    id={index}
                    className="player-icon"
                    src={gamePieceHelper(player.gamePiece)}
                    alt={`Player ${index}`}
                    style={{ top: `${(index + 1) * 25}px`, left: `${(index + 1) * 20}px` }}
                  />
                </div>
              );
            }
            return null;
          })}
      </div>
    );
  };
   // render the income tax space and the gamepiece if player is currently on that space
  const IncomeTaxCell = ({ players, position }) => {
    // Find the object in the JSON data that matches the provided name
    const property = spacesData.spaces.find(
      (space) => space.position === position
    );
  
    return (
      <div className="cell cell-bottom">
        <span className="income-tax">
          Income Tax <br />
          <FontAwesomeIcon icon={faDiamond} />
          <span className="income-tax-details">
            <br />Pay 10% <br /> or <br /> $200
          </span>
        </span>
        {/* Render game piece icons */}
        {players.map((player, index) => {
          if (property && player.position === property.position) {
            // if player hasnt yet paid income tax after landing on the space, then continue rendering the modal to pay tax.
            !incomeTaxPaid && !!rolledValue && activePlayer.position === player.position ? setIncomeTaxCellActive (true) : setIncomeTaxCellActive (false);
            return (
              <div key={index} style={{ display: 'inline-block', margin: '5px' }}>
                <img
                  id={index}
                  className="player-icon"
                  src={gamePieceHelper(player.gamePiece)}
                  alt={`Player ${index}`}
                  style={{ top: `${(index + 1) * 25}px`, left: `${(index + 1) * 20}px` }}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };


  return (
   <div><DisplayModal
      show={modalShow}
      onHide={handleModalHide}
      playerstotal={players.length}
    />
    <PlayerDetailsModal
    show={playerDetailsModalShow}
    onHide={handlePlayerDetailsModalHide}
    />
    <PropertyDetailsModal
    show={propertyModalShow}
    activeproperty={activeProp}
    onHide={handlePropDetailsModalHide}
    />
    <IncomeTax
    show={incomeTaxCellActive}
    onHide={handleIncomeTaxModalHide}
    activePlayer={activePlayer}
    />
    {/* SIDBAR */}
<div className="app">
      <Sidebar activePlayer={activePlayer} rolledValue={rolledValue} handleEndTurn={handleEndTurn} rolledDoubles={rolledDoubles} />
    </div>
{/* GAMEBOARD */}
<div className="main-content">
</div>
    <div className="board">
    <div className="dice-container">
    <DiceRoller onRoll={handleDiceRoll} checkDoubles={checkDoublesRoll} resetDice={resetDice}></DiceRoller>
    </div>
      <div className="center-logo">
        <div className ="center-logo-image">
        </div>
        </div>
      <div className="background-theme"></div>
      <div className="community-chest-pile">
        <div className="community-chest-rectangle">
          <span className="community-chest-text">Community Chest</span>
          </div>
          </div>
      <div className="chance-pile">
        <div className="chance-pile-rectangle">
          <span className="chance-text">Chance</span>
          </div>
          </div>
{/* PROPERTY SPACES */}
    <SpecialCell
    specialCellName = "visiting-jail"
    location = "cell-left"
    additionalClasses = "cell-bottom"
    position = {10}
    players = {players}
    />
    <PropertyCell
      name="Connecticut Avenue"
      players = {players}
    />
    <PropertyCell
      name="Vermont Avenue"
      players = {players}
    />
    <SpecialCell
    specialCellName = "chance"
    location = "cell-bottom"
    additionalClasses = "cell"
    players = {players}
    position = {7}
    />
    <PropertyCell
      name="Oriental Avenue"
      players = {players}
    />
    <PropertyCell
      name="Reading Railroad"
      players = {players}
    />
    <IncomeTaxCell
    players = {players}
    position = {4}
     />
    <PropertyCell
      name="Baltic Avenue"
      players = {players}
    />
    <SpecialCell
    specialCellName = "community-chest"
    location = "cell-bottom"
    additionalClasses = "cell"
    players = {players}
    position = {2}
    />
    <PropertyCell
      name="Mediterranean Avenue"
      players = {players}
    />
    <SpecialCell
    specialCellName = "go"
    location = "cell-bottom"
    additionalClasses = "cell"
    players = {players}
    position = {0}
    />
    <PropertyCell
      name="St. Charles Place"
      additionalClasses = "st-charles"
      players = {players}
    />
   <PropertyCell
      name="Electric Company"
      additionalClasses = "electric-company"
      players = {players}
    />
    <PropertyCell
      name="States Avenue"
      additionalClasses = "states-ave"
      players = {players}
    />
    <PropertyCell
      name="Virginia Avenue"
      additionalClasses = "virginia-ave"
      players = {players}
    />
    <PropertyCell
      name="Pennsylvania Railroad"
      additionalClasses = "penn-rr"
      players = {players}
    />
    <PropertyCell
      name="St. James Place"
      additionalClasses = "st-james"
      players = {players}
    />
    <SpecialCell
    specialCellName = "community-chest"
    location = "cell-left"
    additionalClasses = "cell community-chest-left"
    players = {players}
    position = {17}
    />
    <PropertyCell
      name="Tennessee Avenue"
      additionalClasses = "tennessee-ave"
      players = {players}
    />
    <PropertyCell
      name="New York Avenue"
      additionalClasses = "new-york-ave"
      players = {players}
    />
    <SpecialCell
    specialCellName = "Free Parking"
    location = "cell-left"
    additionalClasses = "free-parking"
    players = {players}
    position = {20}
    />
    <PropertyCell
      name="Kentucky Avenue"
      players = {players}
    />
    <SpecialCell
    specialCellName = "chance"
    location = "cell-top"
    additionalClasses = "cell"
    players = {players}
    position = {22}
    />
    <PropertyCell
      name="Indiana Avenue"
      players = {players}
    />
    <PropertyCell
      name="Illinois Avenue"
      players = {players}
    />
    <PropertyCell
      name="B. & O. Railroad"
      players = {players}
    />
    <PropertyCell
      name="Atlantic Avenue"
      players = {players}
    />
    <PropertyCell
      name="Ventnor Avenue"
      players = {players}
    />
    <PropertyCell
      name="Water Works"
      additionalClasses = "water-works"
      players = {players}
    />
    <PropertyCell
      name="Marvin Gardens"
      players = {players}
    />
    <SpecialCell
    specialCellName = "Go To Jail"
    location = "cell-top"
    additionalClasses = "go-to-jail"
    players = {players}
    position = {30}
    />
    <PropertyCell
      name="Pacific Avenue"
      players = {players}
    />
    <PropertyCell
      name="North Carolina Avenue"
      players = {players}
    />
    <SpecialCell
    specialCellName = "community-chest"
    location = "cell-right"
    additionalClasses = "cell community-chest"
    players = {players}
    position = {33}
    />
    <PropertyCell
      name="Pennsylvania Avenue"
      players = {players}
    />
    <PropertyCell
      name="Short Line Railroad"
      players = {players}
    />
    <SpecialCell
    specialCellName = "chance"
    location = "cell-right"
    additionalClasses = "cell"
    players = {players}
    position = {36}
    />
    <PropertyCell
      name="Park Place"
      players = {players}
    />
    <SpecialCell
    specialCellName = "Luxury Tax"
    location = "cell-right"
    additionalClasses = "luxury-tax"
    players = {players}
    position = {38}
    />
    <PropertyCell
      name="Boardwalk"
      players = {players}
    />
	</div>
  </div>
  );
}

export default Board;