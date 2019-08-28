class Field {
  constructor(name, truename) {
    this.name = name;
    this.truename = truename;
    this.setNode();
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
