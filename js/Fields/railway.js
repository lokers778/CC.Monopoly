import Field from '../field';

class Railway extends Field {
  constructor(name, truename) {
    super(name, truename);
    this.owner = null;
    this.isActive = false;
    this.costs = {
      price: 200,
      rent: [25, 50, 100, 200],
    };
  }

  playerOnMe(player) {
    super.playerOnMe(player);

    this.payRent(player);
  }

  buyRailway(player) {
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

  loseOwner() {
    //używane w momencie bankructwa
    this.owner = null;
    this.isActive = false;
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

  payRent(player) {
    if (player === this.owner) {
      return;
    } else if (this.isActive) {
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
      if (player.currentMoneyAmount() >= this.costs.rent[railways]) {
        player.updateMoney(-this.costs.rent[railways]);
        this.owner.updateMoney(this.costs.rent[railways]);
      } else {
        this.owner.updateMoney(player.currentMoneyAmount());
        player.goBancrupt();
      }
    } else return;
  }
}

export default Railway;
