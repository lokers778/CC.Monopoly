import FieldToBuy from './fieldToBuy';
import { createParagraph } from '../utils';

class Special extends FieldToBuy {
  constructor(name, truename) {
    super(name, truename);
    this.costs = {
      price: 150,
      rent: [4, 10],
    };
  }

  calculateRentToPay(player) {
    let specials = 0;
    this.owner.currentProperies().forEach(field => {
      if (field.truename === 'specialThird--0' || field.truename === 'specialThird--1') {
        specials++;
      }
    });
    return this.costs.rent[specials - 1] * player.getLastMove();
  }

  calculateSaleRevenue() {
    return this.isActive ? this.costs.price / 2 : 0;
  }

  renderInfoView(node) {
    [
      `${this.name}`,
      ...this.costs.rent.map((x, i) => `Czynsz z ${i + 1} ⛽: ${x} * l. oczek`),
      `Koszt kupna: ${this.costs.price}`,
    ]
      .map(createParagraph)
      .forEach(p => node.appendChild(p));
  }

  renderOwnerViewImpl(node) {
    node.appendChild(this.createToggleActiveButton());
  }

  toggleActive(player) {
    //Zastawianie i odzastawianie stacji
    if (player === this.owner) {
      if (!this.isActive && player.currentMoneyAmount() >= this.costs.price) {
        player.updateMoney(-this.costs.price / 2);
      } else {
        player.updateMoney(this.costs.price / 2);
      }
      this.isActive = !this.isActive;
    } else return alert('Ta posiadłość nie należy do Ciebie');
  }
}

export default Special;
