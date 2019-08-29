import Field from '../field';
import { calculateCosts } from './costsOfProperty';

class Property extends Field {
  constructor(name, truename, color, special) {
    super(name, truename);
    this.color = color;
    this.special = special;
    this.costs = new calculateCosts(this.color, this.special);
    this.numberOfHouses = 0;
    this.numberOfHotels = 0;
    this.owner = null;
    this.isActive = false
  }

  buyProperty(player) {
    if (!owner) {
      this.owner = player;
      player.updateMoney(-this.costs.price);
    }
  }

  loseOwner() {
    //używane w momencie bankructwa
    this.owner = null;
  }

  toggleActive(player) {
    //Zastawianie i odzastawianie posiadłości
    if (player === this.owner) {
      if (this.numberOfHotels === 0 && this.numberOfHouses === 0) {
        if (this.isActive) player.updateMoney(this.costs.price / 2); 
        else player.updateMoney(-this.costs.price);
        this.isActive = !this.isActive;
      }
      else return alert('Aby zastawić posiadłość, należy najpierw sprzedać budynki');
    }
    else return alert('Ta posiadłość nie należy do Ciebie');
  }

  buyBuilding(player) {
    if (player === this.owner) {
      if (this.numberOfHotels === 1) {
        return alert('Posiadłość jest już maksymalnie rozwinięta');
      } else if (this.numberOfHouses < 4) {
        player.updateMoney(-this.costs.costOfBuilding);
        this.numberOfHouses++;
        return;
      } else if (this.numberOfHouses === 4) {
        player.updateMoney(-this.costs.costOfBuilding);
        this.numberOfHouses = 0;
        this.numberOfHotels = 1;
        return;
      }
    }
    else return alert('Ta posiadłość nie należy do Ciebie');
  }

  sellBuilding(player) {
    if (player === this.owner) {
      if (this.numberOfHotels === 0 && this.numberOfHouses === 0) {
        return alert('Na posiadłości nie ma żadnych bydunków do sprzedania');
      } else if (this.numberOfHotels === 1) {
        player.updateMoney(this.costs.costOfBuilding / 2);
        this.numberOfHouses = 4;
        this.numberOfHotels = 0;
        return;
      } else if (this.numberOfHouses > 0) {
        player.updateMoney(this.costs.costOfBuilding / 2);
        this.numberOfHouses--;
        return;
      }
    }
    else return alert('Ta posiadłość nie należy do Ciebie');
  }

  payRent(player) {
    if (player !== owner) {
      player.updateMoney(-this.costs.rent[this.numberOfHouses + this.numberOfHotels * 5]);
      this.owner.updateMoney(this.costs.rent[this.numberOfHouses + this.numberOfHotels * 5]);
    }
  }
}

export default Property;