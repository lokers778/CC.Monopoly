import Field from '../field';
import communityChestDeck from '../decks';

class CommunityChest extends Field {
  constructor(truename) {
    super(truename);
  }

  drawCard() {
    let card = communityChestDeck[communityChestDeck.length - 1];
    let cat = card.category;
    let atr = card.attribute;
    if (cat === 1) {
      card.getMoney(atr);
    } else if (cat === 2) {
      card.loseMoney(atr);
    } else if (cat === 3) {
      card.goSomewhere(atr);
    } else {
      card.prisonBreak();
    }
    communityChestDeck.pop();
  }
  playerOnMe(player) {
    super.playerOnMe(player);

    this.drawCard();
  }
}

export default CommunityChest;
