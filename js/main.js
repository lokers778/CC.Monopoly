import Board from './board';
import colors from './colors';
import navigationBar from './navBar';
import { ControlPanel } from './controlPanel';
import { initializePlayers } from './player';
import newGame, { initGeo } from './newGame';

console.log('Monopoly is running');

const board = new Board();
// console.log(board);
// board.fields.forEach(x => console.log(x.node));

for (let key in colors) {
  const color = colors[key];
  board.getPropertiesByColor(color).forEach(x => (x.node.style.backgroundColor = color));
}

newGame();              // zainicjowanie graczy
initGeo(board.fields);  // zainicjowanie miast
// initGeo();              // zainicjowanie miast

const startingPoint = 0;
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
