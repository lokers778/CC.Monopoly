import Field from '../field';

class Special extends Field {
  constructor(name, truename) {
    super(name, truename);
    this.owner = null;
    this.isActive = false;
    this.costs = {
      price: 150,
      rent: [0, 4, 10],
    };
  }

  playerOnMe(player) {
    super.playerOnMe(player);

    this.payRent(player);
  }

  buySpecial(player) {
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
      let specials = 0;
      this.owner.currentProperies().forEach(field => {
        if (field.truename === 'specialThird--0' || field.truename === 'specialThird--1') {
          specials++;
        }
      });
      player.updateMoney(-this.costs.rent[specials] * 1 /*ZAMIAST 1 DAĆ LICZBĘ OCZEK NA KOSTCE*/);
      if (player.currentMoneyAmount() < 0) {
        player.goBancrupt();
      }
    } else return;
  }
}

export default Special;
