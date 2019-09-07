import { calculateCosts } from './costsOfProperty';
import FieldToBuy from './fieldToBuy';
import { createParagraph, createActionButton } from '../utils';

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

function buildingsLevelText(property) {
  const num = property.buildingsLevel;
  const text = num === 5 ? '🏨' : `${property.numberOfHouses}x🏡`;
  return num === 0 ? '' : `Poziom zabudowy: ${text}`;
}

class Property extends FieldToBuy {
  constructor(name, truename, color, special) {
    super(name, truename);
    this.color = color;
    this.special = special;
    this.costs = new calculateCosts(this.color, this.special);
    this.numberOfHouses = 0;
    this.numberOfHotels = 0;
  }

  calculateRentToPay() {
    return this.costs.rent[this.buildingsLevel];
  }

  get buildingsLevel() {
    return this.numberOfHouses + this.numberOfHotels * 5;
  }

  calculateSaleRevenue() {
    return this.isActive ? this.costs.price / 2 + (this.costs.costOfBuilding / 2) * this.buildingsLevel : 0;
  }

  renderInfoView(node) {
    const rents = this.costs.rent;
    const price = this.costs.price;
    [
      `${this.name}`,
      `Czynsz bez 🏡: ${rents[0]}`,
      ...rents.slice(1, rents.length - 1).map((x, i) => `Czynsz z ${i + 1} 🏡: ${x}`),
      `Czynsz z 🏨: ${rents[rents.length - 1]}`,
      `Koszt kupna: ${price}`,
      `Koszt budowy 🏡: ${this.costs.costOfBuilding}`,
      buildingsLevelText(this),
    ]
      .map(createParagraph)
      .forEach(p => node.appendChild(p));
  }

  createBuyBuildingButton() {
    const text = 'Kup 🏡';
    function onClick() {
      this.buyBuilding(this.owner);
      this.renderOwnerViews();
    }
    return createActionButton(text, onClick.bind(this));
  }

  createSellBuildingButton() {
    const text = 'Sprzedaj 🏡';
    function onClick() {
      this.sellBuilding(this.owner);
      this.renderOwnerViews();
    }
    return createActionButton(text, onClick.bind(this));
  }

  renderOwnerViewImpl(node) {
    if (this.numberOfHotels !== 1) {
      node.appendChild(this.createBuyBuildingButton());
    }
    if (this.numberOfHotels !== 0 || this.numberOfHouses !== 0) {
      node.appendChild(this.createSellBuildingButton());
    }
    node.appendChild(this.createToggleActiveButton());
  }

  toggleActive(player) {
    //Zastawianie i odzastawianie posiadłości
    if (player === this.owner) {
      if (this.numberOfHotels === 0 && this.numberOfHouses === 0) {
        if (!this.isActive && player.currentMoneyAmount() >= this.costs.price) {
          player.updateMoney(-this.costs.price / 2);
        } else {
          player.updateMoney(this.costs.price / 2);
        }
        this.isActive = !this.isActive;
      } else return alert('Aby zastawić posiadłość, należy najpierw sprzedać budynki');
    } else return alert('Ta posiadłość nie należy do Ciebie');
  }

  buyBuilding(player) {
    if (player === this.owner) {
      if (this.numberOfHotels === 1) {
        return alert('Posiadłość jest już maksymalnie rozwinięta');
      } else if (this.numberOfHouses < 4 && player.currentMoneyAmount() >= this.costs.costOfBuilding) {
        player.updateMoney(-this.costs.costOfBuilding);
        this.numberOfHouses++;
        this.drawBuildings('buyHouse');
        return;
      } else if (this.numberOfHouses === 4 && player.currentMoneyAmount() >= this.costs.costOfBuilding) {
        player.updateMoney(-this.costs.costOfBuilding);
        this.numberOfHouses = 0;
        this.numberOfHotels = 1;
        this.drawBuildings('buyHotel');
        return;
      }
    } else return alert('Ta posiadłość nie należy do Ciebie');
  }

  sellBuilding(player) {
    if (player === this.owner) {
      if (this.numberOfHotels === 0 && this.numberOfHouses === 0) {
        return alert('Na posiadłości nie ma żadnych bydunków do sprzedania');
      } else if (this.numberOfHotels === 1) {
        player.updateMoney(this.costs.costOfBuilding / 2);
        this.numberOfHouses = 4;
        this.numberOfHotels = 0;
        this.drawBuildings('sellHotel');
        return;
      } else if (this.numberOfHouses > 0) {
        player.updateMoney(this.costs.costOfBuilding / 2);
        this.numberOfHouses--;
        this.drawBuildings('sellHouse');
        return;
      }
    } else return alert('Ta posiadłość nie należy do Ciebie');
  }

  drawBuildings(type) {
    const me = this.node;
    if (type === 'buyHouse') {
      me.appendChild(createHouse());
    } else if (type === 'sellHouse') {
      const houses = me.querySelectorAll('.house');
      me.removeChild(houses[houses.length - 1]);
    } else if (type === 'buyHotel') {
      for (let i of me.querySelectorAll('.house')) {
        me.removeChild(i);
      }
      me.appendChild(createHotel());
    } else if (type === 'sellHotel') {
      me.removeChild(me.querySelector('.hotel'));
      for (let i = 0; i < 4; i++) {
        me.appendChild(createHouse());
      }
    }
  }
}

export default Property;
