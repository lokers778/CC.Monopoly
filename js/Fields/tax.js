import Field from '../field';
import { createEndRoundGuard } from '../utils';

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

    return this.payTax(player);
  }

  payTax(player) {
    const moneyToPay = this.moneyToPay;
    return createEndRoundGuard(
      player,
      moneyToPay,
      () => {
        player.updateMoney(-1 * moneyToPay);
      },
      () => {
        player.goBancrupt();
      },
    );
  }

  renderControlPanelFieldView(currentPlayer, node) {
    node.appendChild(
      document.createTextNode(`${currentPlayer.name} musi zapłacić podatek w wysokości ${this.moneyToPay}`),
    );
  }
}

export default Tax;
