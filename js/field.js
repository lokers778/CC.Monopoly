class Field {
  constructor(name, truename) {
    this.name = name;
    this.truename = truename;
    this.setNode();
    this.players = [];
  }

  playerOnMe(player) {
    this.players.push(player);
    //rysowanie gracza na polu
    const me = this.nodeRef;
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

  get nodeRef() {
    if (typeof this.truename === 'string') {
      let [clsNames, num] = this.truename.split('--');
      const query = clsNames
        .split('-')
        .map(x => `.${x}`)
        .join('');
      return document.querySelectorAll(query)[num ? Number(num) : 0];
    }
    return undefined;
  }

  setNode() {
    const node = this.nodeRef;
    if (!node) {
      throw Error(`Setting node for ${this.truename} failed`);
    }
    this.node = node;
  }

  registerListeners() {}
}

export default Field;
