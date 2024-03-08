import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb as farLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faFaucet } from '@fortawesome/free-solid-svg-icons';
const rmWhitespace = /\s/g;


export function DisplayModal(props) {
    const handleButtonClick = (buttonNumber) => {
      props.onHide(buttonNumber);
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Welcome to Monopoly!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>This game must be played with a minimum of 2 players.</h4>
          <p>
            Click next to begin!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleButtonClick(props.playerstotal)}>Next</Button>&nbsp;&nbsp;
        </Modal.Footer>
      </Modal>
    );
  }

  // modal that appears on launch to set player names and pieces
  export function PlayerDetailsModal(props) {

    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [gamePiece, setGamePiece] = useState('');
    const [name, setName] = useState('');
    const [shouldRenderButton, setShouldRenderButton] = useState(false);
    const [showCharSelectModal, setShowCharSelectModal] = useState(true);
    const [availablePieces, setAvailablePieces] = useState([
      'ship', 'boot', 'dog', 'car', 'thimble', 'moneybag'
    ]);
    
    const addAdditionalPlayers = () => {
      setShowCharSelectModal (true);
    }
  
    // submit button on player detail modal
    const handleFormSubmit = (e) => {
      e.preventDefault();
      if (!name || name.length < 2 || !gamePiece || gamePiece === 'Select Your Playing Piece') return;
      props.onHide(name, gamePiece);
      setAvailablePieces(prev => prev.filter(piece => piece !== gamePiece));
      setName('');
      setGamePiece('');
      const shouldRender = numberOfPlayers+1 >= 2;
      setShouldRenderButton(shouldRender);
      setShowCharSelectModal(!shouldRender);
      setNumberOfPlayers(prev => prev + 1);
      // only allow a maximum of 4 players
      if (numberOfPlayers+1 === 4) return props.onHide(null, null, true);
    };

      // done button on player detail modal
      const handleFormDone = (e) => {
        e.preventDefault();
        if (numberOfPlayers < 2) return;
        props.onHide(null, null, true);
      };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
        {showCharSelectModal ? (
          <Modal.Title id="contained-modal-title-vcenter">
            {`Enter Player ${numberOfPlayers+1} Details`}
          </Modal.Title>
    ) : (
    <Modal.Title id="contained-modal-title-vcenter">
            {`You Have Entered ${numberOfPlayers} Players And Can Now Start The Game.`}<br/><br/>
            {`Would You Like To Add Additional Players?`}
          </Modal.Title>)}
        </Modal.Header>
        <Modal.Body>
        {showCharSelectModal ? (
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Select Game Piece</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setGamePiece(e.target.value)}
              value={gamePiece}
            >
              <option>Select Your Playing Piece</option>
        {availablePieces.map(piece => (
          <option key={piece} value={piece}>{piece.charAt(0).toUpperCase() + piece.slice(1)}</option>
        ))}
            </Form.Select>
          </Form.Group>
          <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleFormSubmit}>
            Add Player
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {shouldRenderButton && (
          <Button variant="danger" type="submit" onClick={handleFormDone}>
            Finished Adding Players
          </Button>
          )}
          </Modal.Footer>
        </Form>
        ) : (<>
          <Button variant="primary" type="submit" onClick={addAdditionalPlayers}>
            Add Additional Players
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="danger" type="submit" onClick={handleFormDone}>
            Finished Adding Players
          </Button>
          </>
        )}
        </Modal.Body>
      </Modal>
    );
  }

  export function PropertyDetailsModal(props) {

    const handleButtonClick = () => {
      props.onHide();
    };

    return (
      
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
        onClick={handleButtonClick}
      >
        {props.activeproperty.type === 'railroad' ? (<>
        <Modal.Header className='railroad-details-modal-header'>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="property-details-card-heading" >{props.activeproperty.name}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='property-details-card-rent'>Rent ${typeof props.activeproperty.rent === 'undefined' ? 0 : props.activeproperty.rent[0]}</div>
        <br/>
        <div className= 'railroad-details-card-rent-with-house-container'>If 2 R.R.'s are owned <span className='property-details-card-rent-with-house'>${props.activeproperty.rent[1]}</span></div>
        <div className='railroad-details-card-rent-with-house-container'>If 3 R.R.'s are owned <span className='property-details-card-rent-with-house'>${props.activeproperty.rent[2]}</span></div>
        <div className='railroad-details-card-rent-with-house-container'>If 4 R.R.'s are owned <span className='property-details-card-rent-with-house'>${props.activeproperty.rent[3]}</span></div><br/><br/>
        <div className='property-details-card-mortgage-value-container'>Mortgage Value <span className='property-details-card-mortgage-value'>${props.activeproperty.mortgageValue}</span></div>
        </Modal.Body>
        </> ) : props.activeproperty.type === 'property' ? (<>
          <Modal.Header style={{backgroundColor:props.activeproperty.color.replace (rmWhitespace, ''), color:props.activeproperty.textColor}}>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="property-details-card-heading" >{props.activeproperty.name}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='property-details-card-rent'>Rent ${typeof props.activeproperty.rent === 'undefined' ? 0 : props.activeproperty.rent[0]}</div>
        <br/>
        <div className= 'property-details-card-rent-with-house-container'>With 1 House <span className='property-details-card-rent-with-house'>${props.activeproperty.rent[1]}</span></div>
        <div className='property-details-card-rent-with-house-container'>With 2 Houses <span className='property-details-card-rent-with-house'>${props.activeproperty.rent[2]}</span></div>
        <div className='property-details-card-rent-with-house-container'>With 3 Houses <span className='property-details-card-rent-with-house'>${props.activeproperty.rent[3]}</span></div>
        <div className='property-details-card-rent-with-house-container'>With 4 Houses <span className='property-details-card-rent-with-house'>${props.activeproperty.rent[4]}</span></div>
        <div className='property-details-card-rent-with-house-container'>With HOTEL <span className='property-details-card-rent-with-house'>${props.activeproperty.rent[5]}</span></div><br/>
        <div className='property-details-card-mortgage-value-container'>Mortgage Value <span className='property-details-card-mortgage-value'>${props.activeproperty.mortgageValue}</span></div>
        <div className='property-details-card-house-cost-container'>Houses Cost ${props.activeproperty.houseCost} each,<br/>Hotels ${props.activeproperty.houseCost} Each<br/>Plus 4 Houses.</div>
        <div className='property-details-card-monopoly-fine-print'>If a player owns all the sites of any color group,<br/>the rent is doubled on unimporved sites in that group.</div>
        </Modal.Body>
        </>) : (<>
          <Modal.Header className='utilities-details-modal-header'>
          <Modal.Title id="contained-modal-title-vcenter">
          <div className="property-details-card-heading" >{props.activeproperty.name}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='utility-details-card-icon'><FontAwesomeIcon icon={props.activeproperty.name === 'Electric Company' ? farLightbulb : faFaucet} /></div><br/>
        <div className= 'utility-details-card'>If one Utility is owned, rent is 4 times the amount shown on dice.</div><br/>
        <div className= 'utility-details-card'>If both Utilities are owned, rent is 10 times amount shown on dice.</div>
        </Modal.Body>
        </>)}
      </Modal>
    );

  }