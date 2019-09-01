import Board from './board';
import colors from './colors';
import returnNewPlayers from './newGame';
import Dices from './dice';
import Player from './player';


console.log('Monopoly is running');


const board = new Board();
console.log(board);
board.fields.forEach(x => console.log(x.node));

for (let key in colors) {
  const color = colors[key];
  board.getPropertiesByColor(color).forEach(x => (x.node.style.backgroundColor = color));
}

const startingPoint = 20;
// const starters = [['krzysiu', '🧑'], ['misiu', '👱‍']];
const starters = returnNewPlayers();
const players = starters.map((item) => {
  const player = new Player(item[0], item[1]);
  player.setPosition(startingPoint);
  board.fields[startingPoint].playerOnMe(player);
  return player;
});

let playerIndex = 0;

// instantiate Dices
const dices = new Dices;
// listen for clicking "throw dice" button
document.querySelector("#throwDice").addEventListener('click', () => {
  dices.throwDices();
  const moved = players[playerIndex].updatePosition(dices.getMove());
  board.fields[moved[0]].playerOutMe(players[playerIndex]);
  board.fields[moved[1]].playerOnMe(players[playerIndex]);

  // następny gracz - do przeniesienia w miejsce, gdzie skończą się operacje gracza w danej turze.
  if (!dices.isDouble) {
    playerIndex = playerIndex + 1 < players.length ? playerIndex + 1 : 0;
  }
});



export default players;