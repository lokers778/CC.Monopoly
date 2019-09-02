
class OrderControl {
    constructor(players) {
        this.players = players,
        this.playerIndex = 0    
    }
    currentPlayer() {
        return this.players[this.playerIndex];
    }

    currentPlayerIndex() {
        return this.playerIndex;
    }

    nextPlayer(Double) {
        if (!Double) {
            this.playerIndex = this.playerIndex + 1 < this.players.length ? this.playerIndex + 1 : 0;
          }
        
    }
}





export  { OrderControl };
