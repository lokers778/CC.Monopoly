const throwDice = () => Math.floor(Math.random() * 6) + 1;

class Dices {
  constructor() {
    this.firstDice = 0;
    this.secondDice = 0;
    this.move = 0;
    this.isDouble = false;
  }

  throwDices() {
    this.firstDice = throwDice();
    this.secondDice = throwDice();
    this.move = this.firstDice + this.secondDice;
    this.isDouble = this.firstDice === this.secondDice ? true : false;
    return this.move;
  }

  getMove() {
    return this.move;
  }

  getDouble() {
    return this.isDouble;
  }
}

export default Dices;
