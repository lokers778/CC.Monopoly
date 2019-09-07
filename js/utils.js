function* zip(x, y) {
  if (!(x instanceof Array && y instanceof Array)) {
    throw Error('x and y must be instance of Array');
  }

  if (x.length !== y.length) {
    throw Error('Size of x and y must be the same');
  }

  let counter = -1;
  while (++counter < x.length) {
    yield [x[counter], y[counter]];
  }
}

function clearNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  return node;
}

function createButton() {
  const button = document.createElement('button');
  button.classList.add('button');
  button.type = 'button';
  return button;
}

export { zip, clearNode, createButton };
