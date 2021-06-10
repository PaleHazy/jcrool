import { jcrool } from '../jcrool';
const {
  foo,
  fooKey,
  bar,
  barKey,
  shallowArray,
  deepObject,
  combination,
  SHALLOW_ARRAY_COUNT,
  DEEP_OBJECT_COUNT,
  COMBINATION_COUNT,
} = require('../Mocks/testdata1.js');
// const util = require('util');
// const redditData2 = require('../../gme.json');

describe('JCrool Examples,', () => {
  test('Twin Match Shallow Array----Find Pair', () => {
    const result = jcrool(shallowArray, [
      {
        keys: [fooKey, barKey],
        types: [['string'], ['string']],
        twins: true,
      },
    ]);
    const mockedResult: any[] = [];
    for (let i = 0; i < SHALLOW_ARRAY_COUNT; i++) {
      mockedResult.push({
        foo,
        bar,
      });
    }
    expect(result).toStrictEqual(mockedResult);
  });

  test('Twin Match Deep Object----Find Pair', () => {
    const result = jcrool(deepObject, [
      {
        keys: [fooKey, barKey],
        types: [['string'], ['string']],
        twins: true,
      },
    ]);

    const mockedResult: any[] = [];
    for (let i = 0; i < DEEP_OBJECT_COUNT; i++) {
      mockedResult.push({
        foo,
        bar,
      });
    }
    expect(result).toStrictEqual(mockedResult);
    // expect(result).toBeTruthy();
  });

  test('Twin Match Combination----Find Pair', () => {
    const result = jcrool(combination, [
      {
        keys: [fooKey, barKey],
        types: [['string'], ['string']],
        twins: true,
      },
    ]);

    const mockedResult: any[] = [];
    for (let i = 0; i < COMBINATION_COUNT; i++) {
      mockedResult.push({
        foo,
        bar,
      });
    }
    expect(result).toStrictEqual(mockedResult);
    // expect(result).toBeTruthy();
  });
});
