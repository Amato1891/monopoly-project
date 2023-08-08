import '../App.css';
import '../sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond, faUser, faDice, faMoneyBill1, faHouse, faForward, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {Dice} from './dice';
import {DisplayModal, PlayerDetailsModal, PropertyDetailsModal} from './modal';
import propertyData from '../data/properties.json';
import railRoadData from '../data/railroads.json';
import utilitiesData from '../data/utilities.json';

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

  // property popover modal
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Properties</Popover.Header>
      <Popover.Body>
      <ul>
  {propertiesOwned.map ((property) => {
    return(
      <li key={property.id}>
        Name: {property.name}<br />
        Price: {property.priceToBuy}<br />
        Mortgage Price: {property.priceToMortgage}<br />
        Tier: {property.color}<br />
      </li>
      )
    })}
</ul>
      </Popover.Body>
    </Popover>
  );
  
  // open popover for properties
  const ShowProperties = () => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button variant="dark" style={{ fontSize: '12px', width:'110px'}}>View Properties</Button>
    </OverlayTrigger>
  );

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

    {/* SIDEBAR */}
      <div className="sidebar">
  <ul>
  <li>
  <div className="d-flex align-items-center">
    <div className='tooltips'>
      <span className="tooltiptext">{activePlayer?.name || ''} is up!</span>
      <FontAwesomeIcon icon={faUser} style={{fontSize:"1.8em", width:'45px'}}/>&nbsp;&nbsp;
    </div>
    <div className="flex-grow-1">
      <Button variant="dark" style={{ width: '110px' }}>{activePlayer?.name || ''}</Button>
    </div>
  </div>
</li>
<li>
  <div className="d-flex align-items-center">
    <div className="tooltips">
      <div className='tooltiptext'> Last roll</div>
      <FontAwesomeIcon icon={faDice} style={{fontSize:"1.8em", width:'45px'}}/>&nbsp;&nbsp;
    </div>
    <div className="flex-grow-1">
      <Button variant="dark" style={{ width: '110px' }}> {fullValue || ''} </Button>
    </div>
  </div>
</li>

<li>
  <div className="d-flex align-items-center">
    <div className="tooltips">
      <div className='tooltiptext'> Cash</div>
      <FontAwesomeIcon icon={faMoneyBill1} style={{color: "#1b884a",fontSize:"1.8em", width:'45px'}}/>&nbsp;&nbsp;
    </div>
    <div className="flex-grow-1">
      <Button variant="success" style={{ width: '110px' }}>{activePlayer?.cash || ''}</Button>
    </div>
  </div>
</li>

<li>
  <div className="d-flex align-items-center">
    <div className="tooltips">
      <div className='tooltiptext'> Buildings Owned</div>
      <FontAwesomeIcon icon={faHouse} style={{"color": "#e10909", fontSize:"1.8em", width:'45px'}}/>&nbsp;&nbsp;
    </div>
    <div className="flex-grow-1">
      <Button variant="danger" style={{ width: '110px' }}>{activePlayer?.housesOwned || 0}</Button>
    </div>
  </div>
</li>

<li>
  <div className="d-flex align-items-center">
    <div className="tooltips">
      <div className='tooltiptext'> Properties</div>
      <FontAwesomeIcon icon={faAddressCard} style={{fontSize:"1.8em", width:'45px'}}/>&nbsp;&nbsp;
    </div>
    <div className="flex-grow-1">
      <ShowProperties/>
    </div>
  </div>
</li>

<li>
  <div className="d-flex align-items-center">
    <div className="tooltips">
      <div className='tooltiptext'> End Your Turn</div>
      <FontAwesomeIcon icon={faForward}style={{color: "#0255e3",fontSize:"1.8em", width:'45px'}} />&nbsp;&nbsp;
    </div>
    <div className="flex-grow-1">
      <Button variant="primary" style={{ width: '110px' }} onClick={handleEndTurn}>End Turn</Button>
    </div>
  </div>
</li>

  </ul>
  <div className= "other-options">
    <ul>
      <li><a href='https://en.wikipedia.org/wiki/Monopoly_(game)#:~:text=license%20from%20them.-,Hasbro%20ownership,input%20in%20varying%20the%20game.' target="_blank" rel="noreferrer">About</a></li>
      <li><a href='https://www.hasbro.com/common/instruct/00009.pdf' target="_blank" rel="noreferrer">Rules</a></li>
      <li onClick={() => window.location.reload()}>Restart Game</li>
    </ul>
  </div>
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

    {/* bottom row properties */}
    <div className="cell cell-bottom visiting-jail cell-left" ></div>
		<div className="cell light-blue cell-bottom">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Connecticut Avenue</span>
    <span className="price">price $120</span></div>
    <div className="cell light-blue cell-bottom">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Vermont Avenue</span>
    <span className="price">price $100</span></div>
    <div className="cell cell-bottom chance"></div>
    <div className="cell light-blue cell-bottom">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Oriental Avenue</span>
    <span className="price">price $100</span></div>
    <div className="cell cell-bottom rail-road"> 
    <span className="rr-and-utilities-name" onClick={handleLoadPropertyDetails}>Reading Railroad</span>
    <span className="price">price $200</span></div>
    <div className="cell cell-bottom">
    <span className="income-tax">Income Tax <br/><FontAwesomeIcon icon={faDiamond}/>
    <span className="income-tax-details"><br/>Pay 10% <br/> or <br/> $200</span>
</span></div>
    <div className="cell cell-bottom brown">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Baltic Avenue</span>
    <span className="price">price $60</span></div>
    <div className="cell cell-bottom community-chest"></div>
    <div className="cell cell-bottom brown">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Mediterranean Avenue</span>
    <span className="price">price $60</span></div>
    <div className="cell go cell-bottom"></div>

    {/* left row properties */}
		<div className="cell purple cell-left st-charles">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>St. Charles Place</span>
    <span className="price">price $140</span></div>
		<div className="cell cell-left electric electric-company">
    <span className="rr-and-utilities-name" onClick={handleLoadPropertyDetails}>Electric Company</span>
    <span className="price">price $150</span></div>
		<div className="cell cell-left purple states-ave">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>States Avenue</span>
    <span className="price">price $140</span></div>
		<div className="cell cell-left purple virginia-ave">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Virginia Avenue</span>
    <span className="price">price $160</span></div>
		<div className="cell cell-left rail-road penn-rr">
    <span className="rr-and-utilities-name" onClick={handleLoadPropertyDetails}>Pennsylvania Railroad</span>
    <span className="price">price $200</span></div>
		<div className="cell cell-left orange st-james">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>St. James Place</span>
    <span className="price">price $180</span>
    </div>
		<div className="cell cell-left community-chest-left community-chest"></div>
		<div className="cell cell-left tennessee-ave orange ">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Tennessee Avenue</span>
    <span className="price">price $180</span></div>
		<div className="cell cell-left new-york-ave orange ">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>New York Avenue</span>
    <span className="price">price $200</span></div>
		<div className="cell cell-left free-parking"></div>

    {/* top row properties */}
		<div className="cell red cell-top">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Kentucky Avenue</span>
    <span className="price">price $220</span></div>
		<div className="cell cell-top chance"></div>
		<div className="cell red cell-top">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Indiana Avenue</span>
    <span className="price">price $220</span></div>
		<div className="cell red cell-top">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Illinois Avenue</span>
    <span className="price">price $240</span></div>
		<div className="cell rail-road cell-top">
    <span className="rr-and-utilities-name" onClick={handleLoadPropertyDetails}>B. & O. Railroad</span>
    <span className="price">price $200</span></div>
		<div className="cell yellow cell-top">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Atlantic Avenue</span>
    <span className="price">price $260</span></div>
		<div className="cell yellow cell-top">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Ventnor Avenue</span>
    <span className="price">price $260</span></div>
		<div className="cell water cell-top water-works">
    <span className="rr-and-utilities-name" onClick={handleLoadPropertyDetails}>Water Works</span>
    <span className="price">price $150</span></div>
		<div className="cell yellow cell-top">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Marvin Gardens</span>
    <span className="price">price $280</span></div>
		<div className="cell cell-top go-to-jail"></div>

    {/* right row properties */}
		<div className="cell cell-right green">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Pacific Avenue</span>
    <span className="price">price $300</span></div>
		<div className="cell cell-right green">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>North Carolina Avenue</span>
    <span className="price">price $300</span></div>
		<div className="cell cell-right community-chest"></div>
    <div className="cell cell-right green">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Pennsylvania Avenue</span>
    <span className="price">price $320</span></div>
		<div className="cell cell-right rail-road">
    <span className="rr-and-utilities-name" onClick={handleLoadPropertyDetails}>Short Line Railroad</span>
    <span className="price">price $200</span></div>
		<div className="cell cell-right chance"></div>
		<div className="cell cell-right dark-blue">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Park Place</span>
    <span className="price">price $350</span></div>
		<div className="cell cell-right luxury-tax"></div>
		<div className="cell cell-right dark-blue">
    <span className="prop-name" onClick={handleLoadPropertyDetails}>Boardwalk</span>
    <span className="price">price $400</span></div>
	</div>
  </div>
  );
}

export default Board;