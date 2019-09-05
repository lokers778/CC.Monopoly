import Dices from './dice';
import { zip } from './utils';

const diceIcons = ['fa-dice-one', 'fa-dice-two', 'fa-dice-three', 'fa-dice-four', 'fa-dice-five', 'fa-dice-six'];
const diceNodes = ['dice1', 'dice2'].map(x => document.querySelector(`.${x}`).firstElementChild);
const endRoundNode = document.getElementById('endRound');
const throwDiceNode = document.getElementById('throwDice');
const pplayerNode = document.querySelector('p.player');
const fieldPanelNode = document.querySelector('.fieldPanel');

class ControlPanel {
  constructor(board, players) {
    this.board = board;
    this.players = players;
    this.dices = new Dices();
    this.playerIndex = 0;

    this.showPlayerName();
    endRoundNode.style.visibility = 'hidden';
    throwDiceNode.addEventListener('click', this.throwDice_OnClick.bind(this));
    endRoundNode.addEventListener('click', this.endRound_OnClick.bind(this));
  }

  throwDice_OnClick() {
    const [prevMove, nextMove] = this.currentPlayer().updatePosition(this.dices.throwDices());
    const prevField = this.board.getField(prevMove);
    const nextField = this.board.getField(nextMove);

    this.updateDicesView();
    prevField.playerOutMe(this.currentPlayer());
    nextField.playerOnMe(this.currentPlayer());
    nextField.renderControlPanelView(this, fieldPanelNode);
  }

  endRound_OnClick() {
    if (!this.dices.getDouble()) {
      this.playerIndex = (this.playerIndex + 1) % this.players.length;
    }
    this.nextPlayer();
  }

  updateDicesView() {
    const diceValues = [this.dices.firstDice, this.dices.secondDice];
    for (let [value, node] of zip(diceValues, diceNodes)) {
      node.classList.remove(node.classList.item(1));
      node.classList.add(diceIcons[value - 1]);
    }
    throwDiceNode.style.visibility = 'hidden';
    endRoundNode.style.visibility = 'visible';
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

  nextPlayer() {
    this.showPlayerName();
    throwDiceNode.style.visibility = 'visible';
    endRoundNode.style.visibility = 'hidden';
  }

  showPlayerName() {
    pplayerNode.innerHTML = `Aktualnie gra: ${this.currentPlayerName()}`;
  }
}

export { ControlPanel };
