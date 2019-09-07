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

function createButton(text) {
  const button = document.createElement('button');
  button.classList.add('button');
  button.type = 'button';
  text && button.appendChild(document.createTextNode(text));
  return button;
}

function createActionButton(text, onClick) {
  const button = createButton(text);
  button.addEventListener('click', onClick);
  return button;
}

function createParagraph(text) {
  const p = document.createElement('p');
  p.appendChild(document.createTextNode(text));
  return p;
}

function createEndRoundGuard(player, rentToPay, moneyTransferCb, bancruptCb) {
  return () => {
    if (player.currentMoneyAmount() >= rentToPay) {
      moneyTransferCb();
      return true;
    } else if (player.allMoneyAmount() < rentToPay) {
      bancruptCb();
      return true;
    } else {
      alert('Musisz sprzedać hotele lub zastawić posiadłość aby zapłacić');
      return false;
    }
  };
}

export { zip, clearNode, createButton, createActionButton, createParagraph, createEndRoundGuard };
