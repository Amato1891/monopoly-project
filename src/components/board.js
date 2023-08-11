import '../App.css';
import '../sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import {Dice} from './dice';
import {DisplayModal, PlayerDetailsModal, PropertyDetailsModal} from './modal';
import propertyData from '../data/properties.json';
import railRoadData from '../data/railroads.json';
import utilitiesData from '../data/utilities.json';
import spacesData from '../data/spaces.json';
import Sidebar from './Sidebar';

function Board() {

  // set state of key gameboard elements
const [players, setPlayers] = useState([]);
const [activePlayer, setActivePlayer] = useState('');
const [propertiesOwned, setPropertiesOwned] = useState([{name: 'ventnor ave', priceToBuy: 260, priceToMortgage: 130, color: 'yellow'}]);
// other state managed components
const [modalShow, setModalShow] = React.useState(true);
const [playerDetailsModalShow, setPlayerDetailsModalShow] = React.useState(false);
const [fullValue, setFullValue] = useState(0);
const [numberOfPlayers, setNumberOfPlayers] = useState(0);
const [activeProp, setActiveProp] = useState('');
const [propertyModalShow, setPropertyModalShow] = React.useState(false);

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
    // re-show the dice so player can roll and clear old value
    document.getElementsByClassName('dice-btn')[0].classList.remove('hidden');
    setFullValue('');
    // set new active player
    let indexOfCurrentPlayer = players.findIndex(player => player.playerId === activePlayer.playerId);
    let newActivePlayer = indexOfCurrentPlayer+1 === players.length ? 0 : indexOfCurrentPlayer+1;
    setActivePlayer(players[newActivePlayer]);
  };

const handleFullValueChange = (value) => {
    setFullValue(value);
  };

  // hide the player selection modal
  const handleModalHide = (totalPlayers) => {
    setNumberOfPlayers(totalPlayers);
    setModalShow(false);
    if (totalPlayers > 0) {
      setPlayerDetailsModalShow(true);
    }
  };

  // hide the property details modal
  const handlePropDetailsModalHide = () => {
    setPropertyModalShow(false);
  };

  const handleLoadPropertyDetails = (e) => {
    console.log (e.target.textContent)
    let selectedProperty = propertyData.properties.find(property => property.name === e.target.textContent);
    let selectedRailroad = selectedProperty ? console.log('property found') : railRoadData.railroads.find(railRoad => railRoad.name === e.target.textContent);
    let selectedUtility = selectedRailroad || selectedProperty ? console.log('property/railroad found') : utilitiesData.utilities.find(utility => utility.name === e.target.textContent);
    setPropertyModalShow (true);
    return setActiveProp (selectedProperty || selectedRailroad || selectedUtility);
  }


  // hide the player details modal
  const handlePlayerDetailsModalHide = (name, gamePiece) => {
    const playerObj = {
      playerId: generateRandomId(),
      position: 0,
      name: name,
      gamePiece: gamePiece,
      cash:2000,
      propertiesOwned:[],
      housesOwned: 0
    };
    if (true === false) {
      setPropertiesOwned('placeholder')
    }
    // dont add malformed date to players state obj
    if (playerObj.name && playerObj.gamePiece) {
    setPlayers([...players, playerObj]);
    };
    if (players.length + 1 <= numberOfPlayers) {
      setPlayerDetailsModalShow(true);
    } else {
      setPlayerDetailsModalShow(false);
    }
    setActivePlayer(players[0]);
    // show the dice so player can roll
    document.getElementsByClassName('dice-btn')[0].classList.remove('hidden');
  };



  const PropertyCell = ({ name, additionalClasses }) => {
    // Find the object in the JSON data that matches the provided name
    const property = spacesData.spaces.find(space => (space.type === 'property' || space.type === 'rail-road' || space.type === 'utilities') && space.name === name);
  
    // If a matching property is found, extract relevant properties
    if (property) {
      const { color, price, location } = property;
  
      return (
        <div className={`cell ${location} ${color} ${additionalClasses||''}`}>
          <span className="prop-name" onClick={handleLoadPropertyDetails}>
            {name}
          </span>
          <span className="price">price {price}</span>
        </div>
      );
    }
  };
  
  const SpecialCell = ({ specialCellName, location, additionalClasses }) => (
    <div className={`${specialCellName} ${location} ${additionalClasses || ''}`}></div>
  );
  
  const IncomeTaxCell = () => (
    <div className="cell cell-bottom">
      <span className="income-tax">
        Income Tax <br />
        <FontAwesomeIcon icon={faDiamond} />
        <span className="income-tax-details">
          <br />Pay 10% <br /> or <br /> $200
        </span>
      </span>
    </div>
  );



  return (
   <div><DisplayModal
      show={modalShow}
      onHide={handleModalHide}
    />
    <PlayerDetailsModal
    show={playerDetailsModalShow}
    onHide={handlePlayerDetailsModalHide}
    />
    <PropertyDetailsModal
    show={propertyModalShow}
    activeProperty={activeProp}
    onHide={handlePropDetailsModalHide}
    />
    {/* SIDBAR */}
<div className="app">
      <Sidebar activePlayer={activePlayer} fullValue={fullValue} handleEndTurn={handleEndTurn} />
    </div>
{/* GAMEBOARD */}
<div className="main-content">
</div>
    <div className="board">
    <div className="dice-container">
    <Dice onFullValueChange={handleFullValueChange}/>
    </div>
      <div className="center-logo">
        <div className ="center-logo-image spin">
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
    />
    <PropertyCell
      name="Connecticut Avenue"
    />
    <PropertyCell
      name="Vermont Avenue"
    />
    <SpecialCell
    specialCellName = "chance"
    location = "cell-bottom"
    additionalClasses = "cell"
    />
    <PropertyCell
      name="Oriental Avenue"
    />
    <PropertyCell
      name="Reading Railroad" 
    />
    <IncomeTaxCell />
    <PropertyCell
      name="Baltic Avenue"
    />
    <SpecialCell
    specialCellName = "community-chest"
    location = "cell-bottom"
    additionalClasses = "cell"
    />
    <PropertyCell
      name="Mediterranean Avenue"
    />
    <SpecialCell
    specialCellName = "go"
    location = "cell-bottom"
    additionalClasses = "cell"
    />
    <PropertyCell
      name="St. Charles Place"
      additionalClasses = "st-charles"
    />
   <PropertyCell
      name="Electric Company"
      additionalClasses = "electric-company"
    />
    <PropertyCell
      name="States Avenue"
      additionalClasses = "states-ave"
    />
    <PropertyCell
      name="Virginia Avenue"
      additionalClasses = "virginia-ave"
    />
    <PropertyCell
      name="Pennsylvania Railroad"
      additionalClasses = "penn-rr"
    />
    <PropertyCell
      name="St. James Place"
      additionalClasses = "st-james"
    />
    <SpecialCell
    specialCellName = "community-chest"
    location = "cell-left"
    additionalClasses = "cell community-chest-left"
    />
    <PropertyCell
      name="Tennessee Avenue"
      additionalClasses = "tennessee-ave"
    />
    <PropertyCell
      name="New York Avenue"
      additionalClasses = "new-york-ave"
    />
    <SpecialCell
    specialCellName = "Free Parking"
    location = "cell-left"
    additionalClasses = "free-parking"
    />
    <PropertyCell
      name="Kentucky Avenue"
    />
    <SpecialCell
    specialCellName = "chance"
    location = "cell-top"
    additionalClasses = "cell"
    />
    <PropertyCell
      name="Indiana Avenue"
    />
    <PropertyCell
      name="Illinois Avenue"
    />
    <PropertyCell
      name="B. & O. Railroad"
    />
    <PropertyCell
      name="Atlantic Avenue"
    />
    <PropertyCell
      name="Ventnor Avenue"
    />
    <PropertyCell
      name="Water Works"
      additionalClasses = "water water-works"
    />
    <PropertyCell
      name="Marvin Gardens"
    />
    <SpecialCell
    specialCellName = "Go To Jail"
    location = "cell-top"
    additionalClasses = "go-to-jail"
    />
    <PropertyCell
      name="Pacific Avenue"
    />
    <PropertyCell
      name="North Carolina Avenue"
    />
    <SpecialCell
    specialCellName = "community-chest"
    location = "cell-right"
    additionalClasses = "cell community-chest"
    />
    <PropertyCell
      name="Pennsylvania Avenue"
    />
    <PropertyCell
      name="Short Line Railroad"
    />
    <SpecialCell
    specialCellName = "chance"
    location = "cell-right"
    additionalClasses = "cell"
    />
    <PropertyCell
      name="Park Place"
    />
    <SpecialCell
    specialCellName = "Luxury Tax"
    location = "cell-right"
    additionalClasses = "luxury-tax"
    />
    <PropertyCell
      name="Boardwalk"
    />
	</div>
  </div>
  );
}

export default Board;