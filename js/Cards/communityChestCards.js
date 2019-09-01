class CommunityChestCard {
  constructor(id, name, desc, cat) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.category = cat;
    this.attribute = atr;
  }

  getMoney(atr) {
    player.updateMoney(atr);
  }

  loseMoney(atr) {
    player.updateMoney(-atr);
  }

  goSomewhere(atr) {
    player.setPosition(atr);
  }

  prisonBreak() {
    //comming soon
  }
}

export default CommunityChestCard;
