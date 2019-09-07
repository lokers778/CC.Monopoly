import { clearNode, createButton } from '../utils';
import Field from '../field';

class FieldToBuy extends Field {
  constructor(name, truename) {
    super(name, truename);
    this.owner = null;
    this.isActive = false;
  }

  calculateRentToPay() {
    throw Error('Abstract method call');
  }

  calculateSaleRevenue() {
    throw Error('Abstract method call');
  }

  renderInfoView() {
    throw Error('Abstract method call');
  }

  renderOwnerControlPanelActionView() {
    throw Error('Abstract method call');
  }

  playerOnMe(player) {
    super.playerOnMe(player);

    this.payRent(player);
  }

  buyField(player) {
    if (!this.owner) {
      if (player.currentMoneyAmount() >= this.costs.price) {
        this.owner = player;
        player.updateMoney(-this.costs.price);
        player.addProperty(this);
        this.isActive = true;
      } else {
        return alert('Masz za mało pieniędzy');
      }
    }
  }

  payRent(player) {
    if (this.isActive) {
      const rentToPay = this.calculateRentToPay(player);
      if (player !== this.owner) {
        if (player.currentMoneyAmount() >= rentToPay) {
          player.updateMoney(-rentToPay);
          this.owner.updateMoney(rentToPay);
        } else if (player.allMoneyAmount() < rentToPay) {
          this.owner.updateMoney(player.currentMoneyAmount());
          player.goBancrupt();
        } else {
          alert('Musisz sprzedać hotele lub zastawić posiadłość aby zapłacić');
        }
      }
    }
  }

  loseOwner() {
    this.owner = null;
    this.isActive = false;
  }

  renderPayView(player, node) {
    node.appendChild(document.createTextNode(`Płacisz ${this.calculateRentToPay(player.name)} graczowi ${this.owner.name}!`));
  }

  renderOwnerView(node) {
    node.appendChild(document.createTextNode('To pole należy do ciebie'));
  }

  renderInactiveView(node) {
    node.appendChild(document.createTextNode('To pole jest nieaktywne'));
  }

  renderToBuyView(player, node) {
    const button = createButton();
    button.addEventListener('click', () => {
      this.buyField(player);
      clearNode(node);
      this.renderOwnerView(node);
    });
    button.appendChild(document.createTextNode('Kup pole'));
    node.appendChild(button);
  }

  renderControlPanelFieldView(currentPlayer, node) {
    this.renderInfoView(node);
    if (!this.owner) {
      this.renderToBuyView(currentPlayer, node);
    } else if (currentPlayer !== this.owner) {
      if (this.isActive) {
        this.renderPayView(currentPlayer, node);
      } else {
        this.renderInactiveView(node);
      }
    } else {
      this.renderOwnerView(node);
    }
  }

  renderControlPanelActionView(currentPlayer, node) {
    this.renderInfoView(node);
    if (this.owner === currentPlayer) {
      this.renderOwnerControlPanelActionView(node);
      node.appendChild(document.createTextNode(`Rendering ${this.truename}`));
    }
  }
}

export default FieldToBuy;
