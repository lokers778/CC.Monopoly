import Field from '../field';
import chanceDeck from '../decks'

class Chance extends Field{
    constructor(truename){
        super(truename)
    }

    drawCard(){
        let card = chanceDeck[chanceDeck.length-1];
        let cat = card.category;
        let atr = card.attribute;
        if(cat===1){
           card.getMoney(atr);
        }
        else if(cat===2){
            card.loseMoney(atr);
        }
        else if(cat===3){
            card.goSomewhere(atr); 
        }
        else{
            card.prisonBreak();
        }
        chanceDeck.pop();
    }
    playerOnMe(player) {
        super.playerOnMe(player);
        
        this.drawCard();
    }
}

export default Chance;