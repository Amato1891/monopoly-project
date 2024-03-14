import moneybagsIcon from '../images/moneybags_icon.jpeg';
import carIcon from '../images/monopoly_car.jpg';
import dogIcon from '../images/monopoly_dog.jpg';
import shipIcon from '../images/monopoly_ship.jpg';
import thimbleIcon from '../images/monopoly_thimble.png';
import shoeIcon from '../images/monopoly_shoe.jpeg';

const gamePieceHelper = (gamePiece) => {

// set player icon to be used on board
const getPlayerIcon = (gamePiece) => {
    switch (gamePiece) {
      case 'ship':
      return shipIcon;
    case 'boot':
      return shoeIcon;
    case 'dog':
      return dogIcon;
    case 'car':
      return carIcon;
    case 'thimble':
      return thimbleIcon;
    case 'moneybag':
      return moneybagsIcon;
    }
  };

  return getPlayerIcon (gamePiece);
}

export { gamePieceHelper };