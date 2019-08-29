import Board from './board';
import colors from './colors';
import newGame from './newGame'

console.log('Monopoly is running');

newGame();

const board = new Board();
console.log(board);
board.fields.forEach(x => console.log(x.node));

for (let key in colors) {
  const color = colors[key];
  board.getPropertiesByColor(color).forEach(x => (x.node.style.backgroundColor = color));
}
