import FieldToBuy from './fieldToBuy';

class Special extends FieldToBuy {
  constructor(name, truename) {
    super(name, truename);
    this.costs = {
      price: 150,
      rent: [0, 4, 10],
    };
  }

  calculateRentToPay(player) {
    let specials = 0;
    this.owner.currentProperies().forEach(field => {
      if (field.truename === 'specialThird--0' || field.truename === 'specialThird--1') {
        specials++;
      }
    });
    return this.costs.rent[specials] * player.getLastMove;
  }

  calculateSaleRevenue() {
    return this.costs.price / 2;
  }

  renderInfoView(node) {
    console.log(`Special::renderInfoView ${node.className}`);
  }

  renderOwnerControlPanelActionView(node) {
    console.log(`Special::renderOwnerControlPanelActionView ${node.className}`);
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

export default Special;
