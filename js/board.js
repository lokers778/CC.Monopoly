import Property from './Fields/property';
import colors from './colors';
import Field from './field';

function createObject(constructor, ...params) {
  return new constructor(...params);
}

function getDefaultSchema() {
  const topRow = [
    [Field, '', 'parking'],
    [Property, '', 'red-property--0', colors.RED, false],
    [Field, '', 'specialOne--0'],
    [Property, '', 'red-property--1', colors.RED, false],
    [Property, '', 'red-property--2', colors.RED, true],
    [Field, '', 'north-train'],
    [Property, '', 'yellow-property--0', colors.YELLOW, false],
    [Property, '', 'yellow-property--1', colors.YELLOW, false],
    [Field, '', 'specialThird--0'],
    [Property, '', 'yellow-property--2', colors.YELLOW, true],
    [Field, '', 'goToJail'],
  ];
  const rightColumn = [
    [Property, '', 'green-property--0', colors.GREEN, false],
    [Property, '', 'green-property--1', colors.GREEN, false],
    [Field, '', 'specialTwo--1'],
    [Property, '', 'green-property--2', colors.GREEN, true],
    [Field, '', 'east-train'],
    [Field, '', 'specialOne--1'],
    [Property, '', 'black-property--0', colors.BLACK, false],
    [Field, '', 'specialPayTwo'],
    [Property, '', 'black-property--1', colors.BLACK, true],
  ];
  const bottomRow = [
    [Field, '', 'go'],
    [Property, '', 'brown-property--1', colors.BROWN, true],
    [Field, '', 'specialTwo--2'],
    [Property, '', 'brown-property--0', colors.BROWN, false],
    [Field, '', 'specialPayOne'],
    [Field, '', 'south-train'],
    [Property, '', 'blue-property--2', colors.BLUE, true],
    [Field, '', 'specialOne--2'],
    [Property, '', 'blue-property--1', colors.BLUE, false],
    [Property, '', 'blue-property--0', colors.BLUE, false],
    [Field, '', 'jail'],
  ];
  const leftColumn = [
    [Property, '', 'pink-property--2', colors.PINK, true],
    [Field, '', 'specialThird--1'],
    [Property, '', 'pink-property--1', colors.PINK, false],
    [Property, '', 'pink-property--0', colors.PINK, false],
    [Field, '', 'west-train'],
    [Property, '', 'orange-property--2', colors.ORANGE, true],
    [Field, '', 'specialTwo--0'],
    [Property, '', 'orange-property--1', colors.ORANGE, false],
    [Property, '', 'orange-property--0', colors.ORANGE, false],
  ];
  return [].concat(topRow, rightColumn, bottomRow, leftColumn).map(([x, ...params]) => createObject(x, ...params));
}

const Board = (function() {
  const groupedProperties = new Map();

  function groupProperties() {
    for (let key in colors) {
      const _color = colors[key];
      groupedProperties.set(_color, this.fields.filter(x => x.color === _color));
    }
  }
  class Board {
    constructor(schema = getDefaultSchema()) {
      this.fields = schema;
      groupProperties.bind(this)();
      this.registerListeners();
    }

    registerListeners() {
      this.fields.forEach(x => x.registerListeners());
    }

    getPropertiesByColor(color) {
      return groupedProperties.get(color);
    }
  }

  return Board;
})();

export default Board;
