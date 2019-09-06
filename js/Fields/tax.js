import Field from '../field';

function getMoneyToPay(truename) {
  if (truename === 'specialPayOne') return 200;
  else if (truename === 'specialPayTwo') return 100;
  else throw Error('Unexpected flow');
}

class Tax extends Field {
  constructor(name, truename) {
    super(name, truename);
    this.moneyToPay = getMoneyToPay(this.truename);
  }

  playerOnMe(player) {
    super.playerOnMe(player);

    this.payTax(player);
  }

  payTax(player) {
    player.updateMoney(-1 * this.moneyToPay);

    if (player.currentMoneyAmount() < 0) {
      player.goBancrupt();
    }
  }

  renderControlPanelFieldView(currentPlayer, node) {
    node.appendChild(
      document.createTextNode(`${currentPlayer.name} musi zapłacić podatek w wysokości ${this.moneyToPay}`),
    );
  }
}

export default Tax;
