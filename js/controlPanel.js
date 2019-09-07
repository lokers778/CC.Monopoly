import Dices from './dice';
import { zip, clearNode } from './utils';
import { toggleActive } from './navBar';

const diceIcons = ['fa-dice-one', 'fa-dice-two', 'fa-dice-three', 'fa-dice-four', 'fa-dice-five', 'fa-dice-six'];
const diceNodes = ['dice1', 'dice2'].map(x => document.querySelector(`.${x}`).firstElementChild);
const endRoundNode = document.getElementById('endRound');
const throwDiceNode = document.getElementById('throwDice');
const pplayerNode = document.querySelector('p.player');

class ControlPanel {
  constructor(board, players) {
    this.board = board;
    this.players = players;
    this.dices = new Dices();
    this.playerIndex = 0;
    this.throwDice_lock = false;
    this.endRound_lock = false;
    this.fieldPanelNode = document.querySelector('.fieldPanelBody');
    this.actionPanelNode = document.querySelector('.actionPanelBody');
    this.renderedActionField = null;
    this.endRound_Guard = null;

    this.showPlayerName();
    endRoundNode.style.visibility = 'hidden';
    throwDiceNode.addEventListener('click', this.throwDice_OnClick.bind(this));
    endRoundNode.addEventListener('click', this.endRound_OnClick.bind(this));
  }

  throwDice_OnClick() {
    if (!this.throwDice_lock) {
      this.throwDice_lock = true;
      this.endRound_lock = false;

      const currentPlayer = this.currentPlayer();
      const [prevMove, nextMove] = currentPlayer.updatePosition(this.dices.throwDices());
      const prevField = this.board.getField(prevMove);
      const nextField = this.board.getField(nextMove);

      this.updateDicesView();
      prevField.playerOutMe(currentPlayer);
      this.endRound_Guard = nextField.playerOnMe(currentPlayer) || (() => true);
      nextField.renderControlPanelFieldView(currentPlayer, this.fieldPanelNode);
    }
  }

  endRound_OnClick() {
    if (!this.endRound_lock && this.endRound_Guard()) {
      this.endRound_lock = true;
      this.throwDice_lock = false;

      this.checkWinner();
      this.nextPlayer();
      clearNode(this.fieldPanelNode);
      clearNode(this.actionPanelNode);
      const player = document.querySelector(`#player${this.playerIndex + 1}`);
      new toggleActive(player, this.playerIndex + 1);
    }
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

  checkWinner() {
    const notBancrupts = this.players.filter(x => !x.isBancrupt);
    if (notBancrupts.length === 1) {
      alert(`${notBancrupts[0].name} wygrał !`);
      location.reload();
    }
  }

  nextPlayer() {
    if (!this.dices.getDouble()) {
      this.playerIndex = (this.playerIndex + 1) % this.players.length;
      let c = 0;
      while (++c < this.players.length) {
        if (!this.currentPlayer().isBancrupt) {
          break;
        }
        this.playerIndex = (this.playerIndex + 1) % this.players.length;
      }
      if (c >= this.players.length) {
        throw Error('Unexpected flow');
      }
    }
    this.showPlayerName();
    throwDiceNode.style.visibility = 'visible';
    endRoundNode.style.visibility = 'hidden';
  }

  showPlayerName() {
    pplayerNode.innerHTML = `Aktualnie gra: ${this.currentPlayerName()}`;
  }

  renderFieldInActionPanel(fieldToBuy) {
    if (this.renderedActionField !== fieldToBuy) {
      clearNode(this.actionPanelNode);
      this.renderedActionField = fieldToBuy;
      this.renderedActionField.renderControlPanelActionView(this.currentPlayer(), this.actionPanelNode);
    }
  }
}

export { ControlPanel };
