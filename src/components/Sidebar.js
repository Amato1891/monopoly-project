import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; // Make sure to import any other necessary components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDice, faMoneyBill1, faHouse, faAddressCard, faForward } from '@fortawesome/free-solid-svg-icons';
import '../sidebar.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


function Sidebar({ activePlayer, fullValue, handleEndTurn }) {

    const [propertiesOwned, setPropertiesOwned] = useState([{name: 'ventnor ave', priceToBuy: 260, priceToMortgage: 130, color: 'yellow'}]);
    console.log(handleEndTurn)
    // open popover for properties
  const ShowProperties = () => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button variant="dark" style={{ fontSize: '12px', width:'110px'}}>View Properties</Button>
    </OverlayTrigger>
  );

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

    return (<>
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
</>);
  }
  
  export default Sidebar;
  