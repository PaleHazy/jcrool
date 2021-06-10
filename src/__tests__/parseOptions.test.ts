import { Konfig } from '../jcrool';
import { parseOptions } from '../lib/utils/parseOptions';
const testInput1: Konfig[] = [
  {
    keys: ['a', 'b', 'c'],
    types: [['string'], ['number', 'string'], ['string']],
    bullseye: true,
  },
];
const testInput2: Konfig[] = [
  {
    keys: ['a', 'b', 'c'],
    types: [['string'], ['number', 'string'], ['string']],
    twins: true,
  },
  {
    keys: ['e', 'd', 'c'],
    types: [['string'], ['number', 'boolean'], ['string']],
    twins: true,
  },
];

describe('Testing Parsing of options', () => {
  test('bullseye is default', () => {
    const result = parseOptions(testInput1);
    const x = new Map();
    testInput1.forEach((workUnit, i) => {
      workUnit.keys.forEach((key, ii) => {
        x.set(key, testInput1[i]?.types[ii]);
      });
    });
    expect(result).toStrictEqual({
      bullseye: x,
    });
  });

  test('twins will be good', () => {
    const workObject = parseOptions(testInput2);
    const x: Map<string, string[]>[] = [];

    testInput2.forEach((konfig, i) => {
      const m = new Map();
      konfig.keys.forEach((key, ii) => {
        m.set(key, testInput2[i]?.types[ii]);
      });
      x.push(m);
    });
    expect(workObject).toStrictEqual({
      twins: x,
    });
  });
});

export {};
