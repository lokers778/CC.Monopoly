import Board from './board';
import colors from './colors';
import newGame from './newGame';
import navigationBar from './navBar';
import { ControlPanel } from './controlPanel';
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
navigationBar(players);
const controlPanel = new ControlPanel(board, players);

document.querySelector('#kup').addEventListener('click', () => {
  board.getField(1).buyBuilding(controlPanel.currentPlayer());
  board.getField(11).buyBuilding(controlPanel.currentPlayer());
});

document.querySelector('#sprzedaj').addEventListener('click', () => {
  board.getField(1).sellBuilding(controlPanel.currentPlayer());
  board.getField(11).sellBuilding(controlPanel.currentPlayer());
});

export default players;
