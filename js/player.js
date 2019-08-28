class Player {
  constructor(name, color) {
    this.name = name;
    this.money = 200;
    this.color = color;
    this.properties = [];
    this.position = 0;
    this.prisonEscapeCard = 0;
    this.bancrupt = false;

  }
  updateMoney(amount) {
    this.money += amount;
  }

  updatePosition(move) {
    this.position +=  move;
  }

  addProperty(fieldID) {
    this.properties.push(fieldID);
  }

  removeProperty(fieldID) {
    this.properties.splice(this.properties.indexOf(fieldID), 1);
  }

  prisonEscCardWon() {
    this.prisonEscapeCard += 1;
  }

  prisonEscCardUsed() {
    this.prisonEscapeCard -= 1;
  }
}

export default Player;