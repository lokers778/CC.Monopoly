import { createDefaultSchema } from './boardSchema';
import colors from './colors';

const Board = (function() {
  const _groupedProperties = new Map();
  const _fields = new Array();

  function setupFields(fields) {
    if (_fields.length !== 0) {
      throw Error('The fields have been already setup');
    }
    _fields.push(...fields);
  }

  function groupProperties() {
    for (let key in colors) {
      const _color = colors[key];
      _groupedProperties.set(_color, this.fields.filter(x => x.color === _color));
    }
  }

  function registerListeners() {
    this.fields.forEach(x => x.registerListeners());
  }

  class Board {
    constructor(schema = createDefaultSchema()) {
      setupFields(schema);
      groupProperties.bind(this)();
      registerListeners.bind(this)();
    }

    get fields() {
      return [..._fields];
    }

    get size() {
      return _fields.length;
    }

    getPropertiesByColor(color) {
      return [..._groupedProperties.get(color)];
    }
  }

  return Board;
})();

export default Board;
