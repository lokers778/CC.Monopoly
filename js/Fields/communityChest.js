import Field from '../field';
import {communityChestDeck} from '../decks';

class CommunityChest extends Field {
  constructor(name,truename) {
    super(name,truename);
  }

  drawCard() {
    let card = communityChestDeck[communityChestDeck.length - 1];
    let cat = card.category;
    let atr = card.attribute;
    let dsc = card.description;
    communityChestDeck.pop();
    return [card, cat, atr, dsc];
    
  }

  getMoney(player,atr) {
    player.updateMoney(atr);
  }

  loseMoney(player,atr) {
    player.updateMoney(-1*atr);

    if (player.currentMoneyAmount() < 0) {
      player.goBancrupt();
  }
}
  goSomewhere(player,atr) {
    player.setPosition(atr);
  }
  prisonBreak(player) {
    player.prisonEscapeCard = player.prisonEscapeCard+1;
  }

  playerOnMe(player) {
    super.playerOnMe(player);
    let lista = this.drawCard();
    alert(`Karta kasy społecznej: 
    ${lista[3]}`);
    if(lista[1]===1){
      this.getMoney(player,lista[2]);
  }
    else if(lista[1]===2){
      this.loseMoney(player,lista[2]);
    }
    else if(lista[1]===3){
      this.goSomewhere(player,lista[2]);
    }
    else if(lista[1]===4){
      this.prisonBreak(player);
    }
  }
  
  renderControlPanelFieldView(currentPlayer, node) {
    node.appendChild(
      document.createTextNode(`Gracz ${currentPlayer.name} wylosował kartę.`),
    );
}}


export default CommunityChest;
