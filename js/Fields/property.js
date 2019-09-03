import Field from '../field';
import { calculateCosts } from './costsOfProperty';

function createHotel() {
  const imgHotel = document.createElement('img');
  imgHotel.src = '../../static/Hotel.png';
  imgHotel.className = 'hotel';
  return imgHotel;
}

function createHouse() {
  const imgHouse = document.createElement('img');
  imgHouse.src = '../../static/House.png';
  imgHouse.className = 'house';
  return imgHouse;
}

class Property extends Field {
  constructor(name, truename, color, special) {
    super(name, truename);
    this.color = color;
    this.special = special;
    this.costs = new calculateCosts(this.color, this.special);
    this.numberOfHouses = 0;
    this.numberOfHotels = 0;
    this.owner = null;
    this.isActive = false;
  }

  playerOnMe(player) {
    super.playerOnMe(player);

    this.payRent(player);
  }

  buyProperty(player) {
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
    //Zastawianie i odzastawianie posiadłości
    if (player === this.owner) {
      if (this.numberOfHotels === 0 && this.numberOfHouses === 0) {
        if (!this.isActive && player.currentMoneyAmount() >= this.costs.price) {
          player.updateMoney(-this.costs.price);
        } else {
          player.updateMoney(this.costs.price / 2);
        }
        this.isActive = !this.isActive;
      } else return alert('Aby zastawić posiadłość, należy najpierw sprzedać budynki');
    } else return alert('Ta posiadłość nie należy do Ciebie');
  }

  buyBuilding(player) {
    // if (player === this.owner) {
    if (this.numberOfHotels === 1) {
      return alert('Posiadłość jest już maksymalnie rozwinięta');
    } else if (this.numberOfHouses < 4 && player.currentMoneyAmount() >= this.costs.costOfBuilding) {
      player.updateMoney(-this.costs.costOfBuilding);
      this.numberOfHouses++;
      this.drawBuilding('buyHouse');
      return;
    } else if (this.numberOfHouses === 4 && player.currentMoneyAmount() >= this.costs.costOfBuilding) {
      player.updateMoney(-this.costs.costOfBuilding);
      this.numberOfHouses = 0;
      this.numberOfHotels = 1;
      this.drawBuilding('buyHotel');
      return;
    }
    // } else return alert('Ta posiadłość nie należy do Ciebie');
  }

  sellBuilding(player) {
    // if (player === this.owner) {
    if (this.numberOfHotels === 0 && this.numberOfHouses === 0) {
      return alert('Na posiadłości nie ma żadnych bydunków do sprzedania');
    } else if (this.numberOfHotels === 1) {
      player.updateMoney(this.costs.costOfBuilding / 2);
      this.numberOfHouses = 4;
      this.numberOfHotels = 0;
      this.drawBuilding('sellHotel');
      return;
    } else if (this.numberOfHouses > 0) {
      player.updateMoney(this.costs.costOfBuilding / 2);
      this.numberOfHouses--;
      this.drawBuilding('sellHouse');
      return;
    }
    // } else return alert('Ta posiadłość nie należy do Ciebie');
  }

  payRent(player) {
    if (this.isActive) {
      const rentToPay = this.costs.rent[this.numberOfHouses + this.numberOfHotels * 5];
      if (player !== this.owner) {
        if (player.currentMoneyAmount() >= rentToPay) {
          player.updateMoney(-rentToPay);
          this.owner.updateMoney(rentToPay);
        } else {
          this.owner.updateMoney(player.currentMoneyAmount());
          player.goBancrupt();
        }
      }
    }
  }

  drawBuilding(type) {
    const me = this.node;
    if (type === 'buyHouse') me.appendChild(createHouse());
    else if (type === 'sellHouse') me.removeChild(me.firstChild);
    else if (type === 'buyHotel') {
      for (let i = 0; i < 4; i++) {
        me.removeChild(me.firstChild);
      }
      me.appendChild(createHotel());
    } else if (type === 'sellHotel') {
      me.removeChild(me.firstChild);
      for (let i = 0; i < 4; i++) {
        me.appendChild(createHouse());
      }
    }
  }
}

export default Property;
