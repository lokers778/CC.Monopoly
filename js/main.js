import Board from './board';
import colors from './colors';
import newGame from './newGame';
import Dices from './dice';
import Player from './player';

console.log('Monopoly is running');

newGame();

const board = new Board();
console.log(board);
board.fields.forEach(x => console.log(x.node));

for (let key in colors) {
  const color = colors[key];
  board.getPropertiesByColor(color).forEach(x => (x.node.style.backgroundColor = color));
}

// instantiate Dices
const dices = new Dices;
// listen for clicking "throw dice" button
document.querySelector("#throwDice").addEventListener('click', ()=> dices.throwDices());

//Wstępne ustawienie graczy na starcie
const player1 = new Player('John', '🧑');
const player2 = new Player('Paul', '👱‍');
board.fields[20].playerOnMe(player1);
board.fields[20].playerOnMe(player2);