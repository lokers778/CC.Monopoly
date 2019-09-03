class OrderControl {
  constructor(players) {
    (this.players = players), (this.playerIndex = 0);
  }
  currentPlayer() {
    return this.players[this.playerIndex];
  }

  currentPlayerIndex() {
    return this.playerIndex;
  }

  currentPlayerName() {
    return this.players[this.playerIndex].name;
  }

  nextPlayer(Double) {
    if (!Double) {
      this.playerIndex = this.playerIndex + 1 < this.players.length ? this.playerIndex + 1 : 0;
    }
    this.showPlayerName();
    document.getElementById('throwDice').style.visibility = 'visible';
    document.getElementById('endRound').style.visibility = 'hidden';
  }

  showPlayerName() {
    document.querySelector('p.player').innerHTML = `Aktualnie gra: ${this.currentPlayerName()}`;
  }
}

export { OrderControl };
