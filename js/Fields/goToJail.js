import Field from "../field";

class GoToJail extends Field{
    constructor(name,truename){
        super(name,truename);
    }

     goToJail(player){
            player.setPosition(10);
            player.status = 'więzień';
        }
        playerOnMe(player){
            super.playerOnMe(player);
            alert('Idziesz do więzienia!');
            this.goToJail(player);
        }
        renderControlPanelFieldView(currentPlayer, node) {
            node.appendChild(
              document.createTextNode(`Gracz ${currentPlayer.name} trafił do więzienia.`),
            );
        }
    }

export default GoToJail;
