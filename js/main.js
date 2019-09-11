import Board from './board';
import colors from './colors';
import navigationBar from './navBar';
import { ControlPanel } from './controlPanel';
import { initializePlayers } from './player';
import { initGeo, returnNewPlayers } from './newGame';

console.log('Monopoly is running');
let players;

const board = new Board();
for (let key in colors) {
  const color = colors[key];
  board.getPropertiesByColor(color).forEach(x => (x.node.style.backgroundColor = color));
}

document.querySelector('#btnNewCities').addEventListener('click', () => {
  const starters = returnNewPlayers();
  players = initializePlayers(starters, board);
  const controlPanel = new ControlPanel(board, players);
  navigationBar(players, controlPanel);
  document.querySelector('.newGame').style.display = '';
  document.querySelector('#playersPanel').style.display = 'none';
  document.querySelector('#citiesPanel').style.display = '';
  initGeo(board.fields); // zainicjowanie miast
  console.log('Klik!');
});
// document.querySelector('#btnNewPlayers').addEventListener('click', () => {
document.querySelector('.newGame').style.display = '';
document.querySelector('#playersPanel').style.display = '';
document.querySelector('#citiesPanel').style.display = 'none';
// newGame(); // zainicjowanie graczy
// });



export default players;
