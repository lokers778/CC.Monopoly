import FieldToBuy from './fieldToBuy';
import { createParagraph } from '../utils';

class Railway extends FieldToBuy {
  constructor(name, truename) {
    super(name, truename);
    this.costs = {
      price: 200,
      rent: [25, 50, 100, 200],
    };
  }

  calculateRentToPay() {
    let railways = 0;
    this.owner.currentProperies().forEach(field => {
      if (
        field.truename === 'south-train' ||
        field.truename === 'north-train' ||
        field.truename === 'east-train' ||
        field.truename === 'west-train'
      ) {
        railways++;
      }
    });
    return this.costs.rent[railways - 1];
  }

  calculateSaleRevenue() {
    return this.isActive ? this.costs.price / 2 : 0;
  }

  renderInfoView(node) {
    [`${this.name}`, ...this.costs.rent.map((x, i) => `Czynsz z ${i + 1} 🚂: ${x}`), `Koszt kupna: ${this.costs.price}`]
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

export default Railway;
