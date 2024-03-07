import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; // Make sure to import any other necessary components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDice, faMoneyBill1, faHouse, faAddressCard, faForward, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import '../sidebar.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Tooltip from 'react-bootstrap/Tooltip';


function Sidebar({ activePlayer, rolledValue, handleEndTurn }) {
  const renderTooltip = (text) => <Tooltip>{text}</Tooltip>;
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [propertiesOwned, setPropertiesOwned] = useState([{name: 'ventnor ave', priceToBuy: 260, priceToMortgage: 130, color: 'yellow'}]);

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
  {propertiesOwned.map ((property, index) => {
    return(
      <li key={index}>
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

  const toggleSidebarVisibility = () => {
    sidebarVisible === true ? setSidebarVisible (false) : setSidebarVisible (true);
    let gameBoard = document.querySelector ('.board');
    sidebarVisible === true ? gameBoard.style.marginLeft = "0px" : gameBoard.style.marginLeft = "200px";
  };

    return (<>
      {/* SIDEBAR */}
      {sidebarVisible ? (
        <div className={`sidebar ${sidebarVisible ? '' : 'collapsed'}`}>
          <div>
          <OverlayTrigger placement="right" delay={{ show: 500, hide: 100 }} overlay={renderTooltip(sidebarVisible ? 'collapse' : 'expand')}>
          <FontAwesomeIcon icon={sidebarVisible ? faChevronUp : faChevronDown} onClick={toggleSidebarVisibility} style={{ color: "#000000", fontSize: "1.8em", width: '45px' }} />
        </OverlayTrigger>
  <ul>
  <li>
            <div className="d-flex align-items-center">
              <OverlayTrigger placement="top" delay={{ show: 500, hide: 100 }} overlay={renderTooltip(`${activePlayer?.name || ''} is up!`)}>
                <div className="tooltips">
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: "1.8em", width: '45px' }} />&nbsp;&nbsp;
                </div>
              </OverlayTrigger>
              <div className="flex-grow-1">
                <Button variant="dark" style={{ width: '110px' }}>
                  {activePlayer?.name || ''}
                </Button>
              </div>
            </div>
          </li>
          <li>
            <div className="d-flex align-items-center">
              <OverlayTrigger placement="top" delay={{ show: 500, hide: 100 }} overlay={renderTooltip("Last roll")}>
                <div className="tooltips">
                  <FontAwesomeIcon icon={faDice} style={{ fontSize: "1.8em", width: '45px' }} />&nbsp;&nbsp;
                </div>
              </OverlayTrigger>
              <div className="flex-grow-1">
                <Button variant="dark" style={{ width: '110px' }}>
                  {rolledValue || '0'}
                </Button>
              </div>
            </div>
          </li>
          <li>
            <div className="d-flex align-items-center">
              <OverlayTrigger placement="top" delay={{ show: 500, hide: 100 }} overlay={renderTooltip("Cash")}>
                <div className="tooltips">
                  <FontAwesomeIcon icon={faMoneyBill1} style={{ color: "#1b884a", fontSize: "1.8em", width: '45px' }} />&nbsp;&nbsp;
                </div>
              </OverlayTrigger>
              <div className="flex-grow-1">
                <Button variant="success" style={{ width: '110px' }}>
                  {activePlayer?.cash || ''}
                </Button>
              </div>
            </div>
          </li>
          <li>
            <div className="d-flex align-items-center">
              <OverlayTrigger placement="top" delay={{ show: 500, hide: 100 }} overlay={renderTooltip("Buildings Owned")}>
                <div className="tooltips">
                  <FontAwesomeIcon icon={faHouse} style={{ color: "#e10909", fontSize: "1.8em", width: '45px' }} />&nbsp;&nbsp;
                </div>
              </OverlayTrigger>
              <div className="flex-grow-1">
                <Button variant="danger" style={{ width: '110px' }}>
                  {activePlayer?.housesOwned || 0}
                </Button>
              </div>
            </div>
          </li>
          <li>
            <div className="d-flex align-items-center">
              <OverlayTrigger placement="top" delay={{ show: 500, hide: 100 }} overlay={renderTooltip("Properties")}>
                <div className="tooltips">
                  <FontAwesomeIcon icon={faAddressCard} style={{ fontSize: "1.8em", width: '45px' }} />&nbsp;&nbsp;
                </div>
              </OverlayTrigger>
              <div className="flex-grow-1">
                <ShowProperties />
              </div>
            </div>
          </li>
<li>
            <div className="d-flex align-items-center">
              <OverlayTrigger placement="top" delay={{ show: 500, hide: 100 }} overlay={renderTooltip("End Your Turn")}>
                <div className="tooltips">
                  <FontAwesomeIcon icon={faForward} style={{ color: "#0255e3", fontSize: "1.8em", width: '45px' }} />&nbsp;&nbsp;
                </div>
              </OverlayTrigger>
              <div className="flex-grow-1">
                <Button variant="primary" style={{ width: '110px' }} onClick={handleEndTurn}>
                  End Turn
                </Button>
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
</div>
      ) : (
        <div>
          <OverlayTrigger placement="right" delay={{ show: 500, hide: 100 }} overlay={renderTooltip('expand')}>
          <FontAwesomeIcon icon={sidebarVisible ? faChevronUp : faChevronDown} onClick={toggleSidebarVisibility} style={{ color: "#000000", fontSize: "1.8em", width: '45px' }} />
              </OverlayTrigger>
        </div>
      )}
      
</>);
  }
  
  export default Sidebar;
  