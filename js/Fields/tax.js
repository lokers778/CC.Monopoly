import Field from '../field';

class Tax extends Field {
  constructor(name, truename) {
    super(name, truename);
  }

  playerOnMe(player) {
    super.playerOnMe(player);

    this.payTax(player);
  }

  payTax(player) {
    if (this.truename === 'specialPayOne') player.updateMoney(-200);
    else if (this.truename === 'specialPayTwo') player.updateMoney(-100);

    if (player.currentMoneyAmount() < 0) {
      player.goBancrupt();
    }
  }
}

export default Tax;
