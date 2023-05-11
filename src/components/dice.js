import React, { useState,useEffect, useRef  } from "react";
import { Button } from 'react-bootstrap';
import '../App.css';

const DotPositionMatrix = {
  1: [[50, 50]],
  2: [
    [20, 20],
    [80, 80],
  ],
  3: [
    [20, 20],
    [50, 50],
    [80, 80],
  ],
  4: [
    [20, 20],
    [20, 80],
    [80, 20],
    [80, 80],
  ],
  5: [
    [20, 20],
    [20, 80],
    [50, 50],
    [80, 20],
    [80, 80],
  ],
  6: [
    [20, 20],
    [20, 80],
    [50, 20],
    [50, 80],
    [80, 20],
    [80, 80],
  ],
};

function createDice(number) {
  const dotPositions = DotPositionMatrix[number];


  return (
    <div className="dice">
      {dotPositions.map((position, index) => (
        <div
          key={index}
          className="dice-dot"
          style={{ "--top": `${position[0]}%`, "--left": `${position[1]}%` }}
        />
      ))}
    </div>
  );
}

function randomizeDice(numberOfDice) {
  const dice = [];
  // find the value of the dice that were thrown
  
  for (let i = 0; i < numberOfDice; i++) {
    const random = Math.floor(Math.random() * 6) + 1;
    const diceElement = createDice(random);
    dice.push(diceElement);
  }
  return dice;
}

export function Dice({ onFullValueChange }) {
  const [rolled, setRolled] = useState(false);
  const [dice, setDice] = useState([]);
  const [fullValue, setFullValue] = useState(0);
  const [showDice, setShowDice] = useState(false);

  const rollDice = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        setDice(randomizeDice(2));
      }, i * 100);
    }
  };

  const handleRollDice = () => {
    setRolled(true);
    setShowDice(true);
    rollDice();
    // show the dice so player can roll
    document.getElementsByClassName('dice-btn')[0].classList.add('hidden');
  };

  useEffect(() => {
    let firstValue = Number(`${dice[0]?.props?.children?.length}`);
    let secondValue = Number(`${dice[1]?.props?.children?.length}`);
    let totalValue = firstValue + secondValue;
    setFullValue(totalValue);
    onFullValueChange(totalValue); // Pass fullValue to parent component

  }, [dice, onFullValueChange]);

  console.log( showDice )
  return (
    <div>
      {!rolled && (
        <div className="dice-roll-button">
          <div className={showDice ? "dice-btn hidden" : "dice-btn non-hidden"}>
          <Button variant="success" className="btn-roll-dice" onClick={handleRollDice}>
            Roll Dice
          </Button>
          </div>
        </div>
      )}
      {rolled && (
        <div>
          <div className="dice-container">{dice}</div>
          <div className={showDice ? "dice-btn hidden" : "dice-btn non-hidden"}>
            <Button variant="success" className="btn-roll-dice" onClick={handleRollDice}>
              Roll Dice
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

