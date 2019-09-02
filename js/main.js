import Board from './board';
import colors from './colors';
import returnNewPlayers from './newGame';
import Dices from './dice';
import { OrderControl } from './controlPanel';
import {initializePlayers} from './player'


console.log('Monopoly is running');


const board = new Board();
console.log(board);
board.fields.forEach(x => console.log(x.node));

for (let key in colors) {
  const color = colors[key];
  board.getPropertiesByColor(color).forEach(x => (x.node.style.backgroundColor = color));
}


const starters = [['krzysiu', '🧑'], ['misiu', '👱‍']];
// const starters = returnNewPlayers();
const players = initializePlayers(starters, board);

const orderControl = new OrderControl(players);

// instantiate Dices
const dices = new Dices;
// listen for clicking "throw dice" button
const makeAMove = () => {
  const moved = orderControl.currentPlayer().updatePosition(dices.throwDices());
  board.fields[moved[0]].playerOutMe(orderControl.currentPlayer());
  board.fields[moved[1]].playerOnMe(orderControl.currentPlayer());
  document.querySelector("#throwDice").removeEventListener('click', makeAMove);
  // następny gracz - do przeniesienia w miejsce, gdzie skończą się operacje gracza w danej turze.
  
  
  orderControl.nextPlayer(dices.getDouble())
  document.querySelector("#throwDice").addEventListener('click', makeAMove);
}

document.querySelector("#throwDice").addEventListener('click', makeAMove);

export default players;
