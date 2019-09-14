import Field from "../field";

class Jail extends Field{
    constructor(name,truename){
        super(name,truename)
    }

    playerOnMe(player){
        super.playerOnMe(player);
        if(player.status==='wolny'){
            alert('Odwiedzasz więzenie');
        }
        else{
            if(player.prisonEscapeCard != 0){
                player.prisonEscapeCard = player.prisonEscapeCard-1;
                alert('Używasz karty wyjścia z więzienia');
                player.status = 'wolny';
            }
            else{
                player.updateMoney(-1*400);
                if (player.currentMoneyAmount() < 0) {
                    player.goBancrupt();
                }
                else{
                    alert('Wpłacasz kaucję - wychodzisz z więzienia')
                    player.status = 'wolny';
                }
                
            }

        }
    }
    
}

export default Jail;