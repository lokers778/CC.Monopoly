function getFieldNode(truename) {
  function getNode() {
    if (typeof truename === 'string') {
      let [clsNames, num] = truename.split('--');
      const query = clsNames
        .split('-')
        .map(x => `.${x}`)
        .join('');
      return document.querySelectorAll(query)[num ? Number(num) : 0];
    }
    return undefined;
  }

  const node = getNode();
  if (!node) {
    throw Error(`Setting node for ${this.truename} failed`);
  }
  return node;
}

class Field {
  constructor(name, truename) {
    this.name = name;
    this.truename = truename;
    this.players = [];
    this._node = getFieldNode(this.truename);
  }

  get node() {
    if (!document.contains(this._node)) {
      throw Error(`Node of ${this.truename} is invalid`);
    }
    return this._node;
  }

  playerOnMe(player) {
    this.players.push(player);
    //rysowanie gracza na polu
    const me = this.node;
    const draw = player.icon;
    const li = document.createElement('li');
    li.className = `player ${player.name}`;
    li.appendChild(document.createTextNode(draw));
    me.appendChild(li);
  }

  playerOutMe(player) {
    this.players.splice(this.players.indexOf(player), 1);
    //wywalenie gracza z pola
    document.querySelector(`.${player.name}`).remove();
  }

  renderControlPanelView(controlPanel, node) {
    console.log(`${this.truename} is rendering ${node.className} of ${controlPanel.constructor.name}`);
  }
}

export default Field;
