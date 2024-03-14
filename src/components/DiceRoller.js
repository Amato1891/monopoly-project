import React, { useState, useEffect } from 'react';
import anime from 'animejs';
import { Button } from 'react-bootstrap';
import '../dice.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const DiceRoller = ({onRoll, resetDice, checkDoubles}) => {
  const [diceValues, setDiceValues] = useState([1, 1]);
  const [hideBtn, setHideBtn] = useState(false);
  const [rolledDoubles, setRolledDoubles] = useState(false);
  const [rolledDoublesTwice, setRolledDoublesTwice] = useState(false);

  const rollDice = () => {
    const newDiceValues = diceValues.map(() => Math.floor(Math.random() * 6) + 1);
    setDiceValues(newDiceValues);
    onRoll (newDiceValues[0]+newDiceValues[1]);

    if (newDiceValues[0] === newDiceValues[1] && rolledDoublesTwice === true) {
        setHideBtn (true);
        setRolledDoublesTwice (false);
        setRolledDoubles (false);
        checkDoubles(false)
        throw new Error('YOU ARE GOING TO JAIL BUDDY')
        // TODO
        // add logic to throw player in jail for rolling doubles 3x that is more forgiving then crashing the program
    } else if (newDiceValues[0] === newDiceValues[1] && rolledDoubles === true) {
        setHideBtn (false);
        setRolledDoublesTwice (true);
        setRolledDoubles (false);
        checkDoubles(true)
    } else if (newDiceValues[0] === newDiceValues[1]) {
        setHideBtn (false);
        setRolledDoubles (true);
        checkDoubles(true)
    } else {
        setHideBtn (true);
        setRolledDoubles (false);
        setRolledDoublesTwice (false);
        checkDoubles(false)
    } 
  };

  const rollBothDice = async () => {
    rollDice(); // Update dice values
    const animations = diceValues.map((_, index) => {
      const diceElement = document.getElementById(`dice${index + 1}`);
      const randomValue = diceValues[index];

      // reset the dice state so we can continue to use spin animation
      diceElement.style.transition = 'none';
      diceElement.style.transform = 'none';

      return anime({
        targets: diceElement,
        scale: [
          { value: 1, easing: 'easeOutSine', duration: 100 },
          { value: 1.2, easing: 'easeInOutQuad', duration: 300 },
          { value: 1, easing: 'easeInSine', duration: 100 }
        ],
        rotate: {
          value: 720,
          duration: 1000,
          easing: 'easeInOutSine'
        },
        complete: () => {
          console.log(`Animation for dice ${index + 1} is complete.`);
        }
      }).finished;
    });

    await Promise.all(animations);
  };

  useEffect(() => {
    if (resetDice) {
        setHideBtn(false);
    }
  }, [resetDice]);

  // change the classnames of dice depending on which value it lands on
  const diceDotObj = {
    1: ["center"],
    2: ["top-left", "bottom-right"],
    3: ["top-left", "center", "bottom-right"],
    4: ["top-left", "top-right", "bottom-left", "bottom-right"],
    5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
    6: ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"],
  }

  return (
    <div>
      <div className="dice-container">
        {diceValues.map((value, index) => (
          <div className="dice" id={`dice${index + 1}`} key={index} data-value={value}>
            <div className="side" id={`side-${value}`}>
              {Array.from({ length: value }, (_, dotIndex) => (
                <div className={`dot ${diceDotObj[value][dotIndex]}`} key={dotIndex}></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <OverlayTrigger
      placement="top"
      delay={{ show: 500, hide: 100 }}
      overlay={
      <Tooltip>
        {rolledDoubles ? "Rolled Doubles, Roll Again!" : rolledDoublesTwice ? "Rolled Doubles Twice, If You Roll Doubles Again Your Going To Jail!" : "Roll Dice" }
        </Tooltip>
        }
    >
      <Button
        variant= {rolledDoubles ? "warning" : rolledDoublesTwice ? "danger" : "info" }
        className="roll-button"
        onClick={rollBothDice}
        style={{display: hideBtn ? 'none' : 'block' }}
      >Roll</Button>
      </OverlayTrigger>
    </div>
  );
};

export default DiceRoller;
