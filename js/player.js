import players from './main';

class Player {
  constructor(name, icon) {
    this.name = name;
    this.money = 1500;
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

  currentProperies() {
    return this.properties;
  }

  // przesuń pozycję o liczbę pol z losowania
  updatePosition(move) {
    const oldPosition = this.position;
    this.position = (this.position + move) % 40;
    return [oldPosition, this.position];
  }

  currentPosition() {
    return this.position;
  }

  // ustaw pozycje na konkretnym polu (board index) np.: więzienie
  setPosition(fieldID) {
    const oldPosition = this.position;
    this.position = fieldID;
    return [oldPosition, this.position];
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
    players.splice(players.indexOf(this), 1);
    return alert(`Gracz ${this.name} zbankrutował!`);
  }

  getIcon() {
    return this.icon;
  }
}

const initializePlayers = (starters, board) => {
  const startingPoint = 0;
  return starters.map(item => {
    const player = new Player(item[0], item[1]);
    player.setPosition(startingPoint);
    board.fields[startingPoint].playerOnMe(player);
    return player;
  });
};

export { initializePlayers, Player };
