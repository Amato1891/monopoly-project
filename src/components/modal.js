import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect  } from 'react';


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
          <Button onClick={() => handleButtonClick(2)}>Next</Button>&nbsp;&nbsp;
        </Modal.Footer>
      </Modal>
    );
  }

  export function PlayerDetailsModal(props) {

    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [gamePiece, setGamePiece] = useState('');
    const [name, setName] = useState('');
    const [shouldRenderButton, setShouldRenderButton] = useState(false);
    const [showCharSelectModal, setShowCharSelectModal] = useState(true);
  
    const addAdditionalPlayers = () => {
      setShowCharSelectModal (true);
    }
  
    // submit button on player detail modal
    const handleFormSubmit = (e) => {
        e.preventDefault(); // prevent the form from submitting and refreshing the page
        for (let i = 0; i < 2; i++) {
          if (!name || name.length < 2) return;
          if (!gamePiece || gamePiece === 'Select Your Playing Piece') return;
          props.onHide(name, gamePiece);
          // hide whichever gamepieces have been selected
          document.getElementsByClassName(gamePiece)[0].classList.add('hidden');
          setName('');
          setGamePiece('');
          console.log(`were at ${numberOfPlayers} players. `)
          numberOfPlayers+1 >= 2 ? setShouldRenderButton (true) : setShouldRenderButton (false);
          numberOfPlayers+1 >= 2 ? setShowCharSelectModal (false) : setShowCharSelectModal (true)
          console.log(numberOfPlayers)
        }
        setNumberOfPlayers(numberOfPlayers+1);
      };

      // done button on player detail modal
      const handleFormDone = (e) => {
        e.preventDefault(); // prevent the form from submitting and refreshing the page
        if (numberOfPlayers < 2) return;
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
              value={name} // set the value of the input field to the name state
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Select Game Piece</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setGamePiece(e.target.value)}
              value={gamePiece} // set the value of the select field to the gamePiece state
            >
              <option>Select Your Playing Piece</option>
              <option className = "ship" value="ship">Ship</option>
              <option className = "boot" value="boot">Boot</option>
              <option className = "dog" value="dog">Dog</option>
              <option className = "car" value="car">Car</option>
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