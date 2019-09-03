import Property from './Fields/property';
import Field from './field';
import Start from './Fields/start';
import Tax from './Fields/tax';
import colors from './colors';
import Railway from './Fields/railway';
import Special from './Fields/specials';

function createObject(constructor, ...params) {
  return new constructor(...params);
}

function createDefaultSchema() {
  const topRow = [
    [Field, '', 'parking'],
    [Property, '', 'red-property--0', colors.RED, false],
    [Field, '', 'specialOne--0'],
    [Property, '', 'red-property--1', colors.RED, false],
    [Property, '', 'red-property--2', colors.RED, true],
    [Railway, '', 'north-train'],
    [Property, '', 'yellow-property--0', colors.YELLOW, false],
    [Property, '', 'yellow-property--1', colors.YELLOW, false],
    [Special, '', 'specialThird--0'],
    [Property, '', 'yellow-property--2', colors.YELLOW, true],
    [Field, '', 'goToJail'],
  ];
  const rightColumn = [
    [Property, '', 'green-property--0', colors.GREEN, false],
    [Property, '', 'green-property--1', colors.GREEN, false],
    [Field, '', 'specialTwo--1'],
    [Property, '', 'green-property--2', colors.GREEN, true],
    [Railway, '', 'east-train'],
    [Field, '', 'specialOne--1'],
    [Property, '', 'black-property--0', colors.BLACK, false],
    [Tax, '', 'specialPayTwo'],
    [Property, '', 'black-property--1', colors.BLACK, true],
  ];
  const bottomRow = [
    [Start, '', 'go'],
    [Property, '', 'brown-property--1', colors.BROWN, true],
    [Field, '', 'specialTwo--2'],
    [Property, '', 'brown-property--0', colors.BROWN, false],
    [Tax, '', 'specialPayOne'],
    [Railway, '', 'south-train'],
    [Property, '', 'blue-property--2', colors.BLUE, true],
    [Field, '', 'specialOne--2'],
    [Property, '', 'blue-property--1', colors.BLUE, false],
    [Property, '', 'blue-property--0', colors.BLUE, false],
    [Field, '', 'jail'],
  ];
  const leftColumn = [
    [Property, '', 'pink-property--2', colors.PINK, true],
    [Special, '', 'specialThird--1'],
    [Property, '', 'pink-property--1', colors.PINK, false],
    [Property, '', 'pink-property--0', colors.PINK, false],
    [Railway, '', 'west-train'],
    [Property, '', 'orange-property--2', colors.ORANGE, true],
    [Field, '', 'specialTwo--0'],
    [Property, '', 'orange-property--1', colors.ORANGE, false],
    [Property, '', 'orange-property--0', colors.ORANGE, false],
  ];
  return [].concat(bottomRow, leftColumn, topRow, rightColumn).map(([x, ...params]) => createObject(x, ...params));
}

export { createDefaultSchema };
