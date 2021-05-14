import { jcrool } from '../src/jcrool';
// const data = require('../testdata1');
const util = require('util');
// const redditData = require('../file.json');
const redditData2 = require('../comments.n6root.rgme_megathread_for_friday_may_07_2021.json');
// test('finds the correct amount of pairs', () => {
//   const expectedResult: any[] = [];
//   const keyConfiguration: any[] = [
//     { keyList: ['foo'], types: ['string', 'number'] },
//     { keyList: ['bar'], types: ['string'] },
//   ];
//   const result = jcrool(data.deepObject, keyConfiguration);
//   for (let i = 0; i < 5; i++) {
//     const model = {
//       foo: '42',
//       bar: 'hello',
//     };
//     expectedResult.push(model);
//   }
//   expect(result).toStrictEqual(expectedResult);
// });

// test('lookup one property', () => {
//   const expectedResult: any[] = [];
//   const keyList: Konfig[] = [
//     {
//       keyList: ['a', 'foo'],
//       types: ['string', 'number'],
//     },
//   ];
//   const result = jcrool(data.deepObject, keyList);
//   for (let i = 0; i < 5; i++) {
//     const model = {
//       a: 42,
//     };
//     expectedResult.push(model);
//   }
//   //  (result);
//   expect(result).toStrictEqual(expectedResult);
// });
// test('both with 2', () => {
//   const expectedResult: any[] = [];
//   const result = jcrool(data.combination, [
//     { keyList: ['foo'], types: ['string', 'number'] },
//     { keyList: ['bar'], types: ['string'] },
//   ]);
//   for (let i = 0; i < 402; i++) {
//     const model = {
//       foo: '42',
//       bar: 'hello',
//     };
//     expectedResult.push(model);
//   }
//   //  (expectedResult.length);
//   expect(result).toStrictEqual(expectedResult);
// });

test('test reddit data', () => {
  // const expectedResult: any[] = [];
  // const result = jcrool(redditData, [
  //   { keyList: ['subreddit'], types: ['string', 'number'] },
  //   { keyList: ['title'], types: ['string', 'number'] },
  //   { keyList: ['permalink'], types: ['string', 'number'] },
  // ]);
  const result2 = jcrool(redditData2, [
    { keyList: ['body'], types: ['string', 'number'] },
    { keyList: ['author'], types: ['string', 'number'] },
    // { keyList: ['data.body'], types: ['string', 'number'] },
  ]);
  let regx = /gme/gi;
  let c = 0;
  result2.forEach((result) => {
    regx.test(result.body) && c++;
  });
  // console.dir(result2, { maxArrayLength: null });
  console.log(util.inspect(result2, { depth: null, maxArrayLength: null }));
  expect(true).toBeTruthy();
});
