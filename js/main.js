import Board from './board';
import colors from './colors';
import newGame from './newGame';
import Dices from './dice';
import { OrderControl } from './controlPanel';
import { initializePlayers } from './player';

console.log('Monopoly is running');

newGame();

const board = new Board();
console.log(board);
board.fields.forEach(x => console.log(x.node));

for (let key in colors) {
  const color = colors[key];
  board.getPropertiesByColor(color).forEach(x => (x.node.style.backgroundColor = color));
}

const starters = [['krzysiu', '🧑'], ['misiu', '👱‍']];
const players = initializePlayers(starters, board);
const orderControl = new OrderControl(players);
orderControl.showPlayerName();
const dices = new Dices();

document.getElementById('endRound').style.visibility = 'hidden';
document.querySelector('#throwDice').addEventListener('click', () => {
  const moved = orderControl.currentPlayer().updatePosition(dices.throwDices());
  board.fields[moved[0]].playerOutMe(orderControl.currentPlayer());
  board.fields[moved[1]].playerOnMe(orderControl.currentPlayer());
});
document.querySelector('#endRound').addEventListener('click', () => orderControl.nextPlayer(dices.getDouble()));

document.querySelector('#kup').addEventListener('click', () => {
  board.fields[1].buyBuilding(orderControl.currentPlayer());
  board.fields[11].buyBuilding(orderControl.currentPlayer());
});

document.querySelector('#sprzedaj').addEventListener('click', () => {
  board.fields[1].sellBuilding(orderControl.currentPlayer());
  board.fields[11].sellBuilding(orderControl.currentPlayer());
});

export default players;
