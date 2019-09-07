import { clearNode, createActionButton, createEndRoundGuard } from '../utils';
import Field from '../field';

class FieldToBuy extends Field {
  constructor(name, truename) {
    super(name, truename);
    this.owner = null;
    this.isActive = false;
    this.cssOwnerViewName = `${this.truename}-OwnerViewDiv`;
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

  renderOwnerViewImpl() {
    throw Error('Abstract method call');
  }

  playerOnMe(player) {
    super.playerOnMe(player);

    return this.payRent(player);
  }

  buyField(player) {
    if (!this.owner) {
      if (player.currentMoneyAmount() >= this.costs.price) {
        this.owner = player;
        player.updateMoney(-this.costs.price);
        player.addProperty(this);
        this.isActive = true;
        return true;
      } else {
        alert('Masz za mało pieniędzy');
        return false;
      }
    }
    return false;
  }

  payRent(player) {
    if (this.isActive) {
      const owner = this.owner;
      const rentToPay = this.calculateRentToPay(player);
      if (player !== owner) {
        return createEndRoundGuard(
          player,
          rentToPay,
          () => {
            player.updateMoney(-rentToPay);
            owner.updateMoney(rentToPay);
          },
          () => {
            owner.updateMoney(player.currentMoneyAmount());
            player.goBancrupt();
          },
        );
      }
    }
  }

  loseOwner() {
    this.owner = null;
    this.isActive = false;
  }

  renderPayView(player, node) {
    node.appendChild(
      document.createTextNode(`Płacisz ${this.calculateRentToPay(player)} graczowi ${this.owner.name} !`),
    );
  }

  renderInactiveView(node) {
    node.appendChild(document.createTextNode('To pole jest zastawione'));
  }

  renderToBuyView(player, node) {
    const button = createActionButton('Kup pole', () => {
      if (this.buyField(player)) {
        clearNode(node);
        this.renderInfoView(node);
        this.renderOwnerView(node);
      }
    });
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
      this.renderOwnerView(node);
    }
  }

  createToggleActiveButton() {
    const text = this.isActive ? `Zastaw +${this.costs.price / 2}` : `Zdejmij zastaw -${this.costs.price / 2}`;
    function onClick() {
      this.toggleActive(this.owner);
      this.renderOwnerViews();
    }
    return createActionButton(text, onClick.bind(this));
  }

  renderOwnerViews() {
    document.querySelectorAll(`div.${this.cssOwnerViewName}`).forEach(x => {
      const node = x.parentElement;
      node.removeChild(x);
      this.renderOwnerView(node);
    });
  }

  renderOwnerView(node) {
    const ownerViewWrapper = document.createElement('div');
    ownerViewWrapper.classList.add(this.cssOwnerViewName);
    this.renderOwnerViewImpl(ownerViewWrapper);
    node.appendChild(ownerViewWrapper);
  }
}

export default FieldToBuy;
