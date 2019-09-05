import FieldToBuy from './fieldToBuy';

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
    return this.costs.rent[railways];
  }

  toggleActive(player) {
    //Zastawianie i odzastawianie stacji
    if (player === this.owner) {
      if (!this.isActive && player.currentMoneyAmount() >= this.costs.price) {
        player.updateMoney(-this.costs.price);
      } else {
        player.updateMoney(this.costs.price / 2);
      }
      this.isActive = !this.isActive;
    } else return alert('Ta posiadłość nie należy do Ciebie');
  }
}

export default Railway;
