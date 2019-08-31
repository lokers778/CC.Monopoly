import board from './main';
import Board from './board';


class Player {
  constructor(name, icon) {
    this.name = name;
    this.money = 200;
    this.icon = icon;
    this.properties = [];
    this.position = 0;
    this.prisonEscapeCard = 0;
    this.isBancrupt = false;

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
    return [oldPosition,this.position]
  }

  currentPosition() {
    return this.position;
  }

  // ustaw pozycje na konkretnym polu (board index) np.: więzienie
  setPosition(fieldID) {
    const oldPosition = this.position;
    this.position = fieldID;
    return [oldPosition,this.position]
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

  isBancrupt() {
    return this.isBancrupt;
  }

  goBancrupt() {
    this.isBancrupt = true;
    this.properties.map(field => field.loseOwner());
    this.properties = [];
    this.money = 0;
  }

  getIcon() {
    return this.icon;
  }
}





export default Player;