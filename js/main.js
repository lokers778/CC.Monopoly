import Board from './board';
import colors from './colors';
import navigationBar from './navBar';
import { ControlPanel } from './controlPanel';
import { initializePlayers } from './player';
import newGame, { initGeo } from './newGame';

console.log('Monopoly is running');

const board = new Board();
for (let key in colors) {
  const color = colors[key];
  board.getPropertiesByColor(color).forEach(x => (x.node.style.backgroundColor = color));
}

document.querySelector('#btnNewCities').addEventListener('click', () => {
  document.querySelector('.newGame').style.display = '';
  document.querySelector('#citiesPanel').style.display = '';
  initGeo(board.fields); // zainicjowanie miast
});
document.querySelector('#btnNewPlayers').addEventListener('click', () => {
  document.querySelector('.newGame').style.display = '';
  document.querySelector('#playersPanel').style.display = '';
  newGame(); // zainicjowanie graczy
});

const starters = [['krzysiu', '🧑'], ['misiu', '👱‍']];
const players = initializePlayers(starters, board);
const controlPanel = new ControlPanel(board, players);
navigationBar(players, controlPanel);

export default players;
