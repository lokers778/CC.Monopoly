import players from './main';
import Start from './Fields/start';

class Player {
  constructor(name, icon) {
    this.name = name;
    this.money = 1500;
    this.icon = icon;
    this.properties = [];
    this.position = 0;
    this.prisonEscapeCard = 0;
    this.isBancrupt = false;
    this.lastMove = 0;
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
    this.lastMove = move;
    const oldPosition = this.position;
    this.position = (this.position + move) % 40;
    const result = [oldPosition, this.position];
    this.tryGiveMoneyForGoingThroughStart(...result);
    return result;
  }

  currentPosition() {
    return this.position;
  }

  getLastMove() {
    return this.lastMove;
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

  prisonEscCards() {
    return this.prisonEscapeCard;
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

  tryGiveMoneyForGoingThroughStart(prevMove, nextMove) {
    if (nextMove < prevMove) {
      Start.giveReward(this);
    }
  }

  allMoneyAmount() {
    return this.properties.reduce((sum, property) => {
      return sum + property.calculateSaleRevenue();
    }, this.currentMoneyAmount());
  }
}

const initializePlayers = (starters, board) => {
  const startingPoint = 0;
  return starters.map(item => {
    const player = new Player(item[0], item[1]);
    player.setPosition(startingPoint);
    board.getField(startingPoint).playerOnMe(player);
    return player;
  });
};

export { initializePlayers, Player };
