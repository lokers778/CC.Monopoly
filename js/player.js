import board from './main'
import Property from './Fields/property'

const signalToBoard = (oldPos, newPos, data) => {
  board[oldPos].playerOutMe(); //odpina się od pola, na którym stoi
  board[newPos].playerOnMe(data); //dopina się do pola zwracając playerData
}

class Player {
  constructor(name, icon) {
    this.name = name;
    this.money = 200;
    this.icon = icon;
    this.properties = [];
    this.position = 0;
    this.prisonEscapeCard = 0;
    this.bancrupt = false;

  }
  updateMoney(amount) {
    this.money += amount;
  }

  currentMoneyAmount() {
    return this.money;
  }

  
  // przesuń pozycję o liczbę pol z losowania
  updatePosition(move) {
    const oldPosition = this.position;
    const tempPosition = this.position + move;
    this.position =  tempPosition >= 40 ? tempPosition - 40 : tempPosition ;
    const playerData = {
      name: this.name,
      icon: this.icon,
      lastMove: move
    }
    signalToBoard(oldPosition, this.position, playerData);

  }

  currentPosition() {
    return this.position;
  }

  // ustaw pozycje na konkretnym polu (board index) np.: więzienie
  setPosition(fieldID) {
    const oldPosition = this.position;
    this.position = fieldID;
    const playerData = {
      name: this.name,
      icon: this.icon,
      lastMove: null
    }
    signalToBoard(oldPosition, this.position, playerData);
  }

  addProperty(property) {
    this.properties.push(property);
  }

  removeProperty(property) {
    // TODO: upewnić się, czy poniższe zadziała
    this.properties.splice(this.properties.indexOf(property), 1);
  }

  prisonEscCardWon() {
    this.prisonEscapeCard += 1;
  }

  prisonEscCardUsed() {
    this.prisonEscapeCard -= 1;
  }

  isBuncrupt() {
    return this.isBuncrupt;
  }

  goBuncrupt() {
    this.isBuncrupt = true;
    this.properties.map(field => field.loseOwner());
    this.properties = [];
    this.money = 0;
  }
}



export default Player;