/**
 * TODO be able to crawl a given data structure
 * Example:
 *
 * const structure = {
 *
 *   a: {
 *     b: 'string'
 *   }
 *   c: 'number
 * }
 *
 * possible idea:
 * convert the tree recursively to something along the lines of
 * a -> is object and looking for key b -> is a string
 * but also a has sibling c -> is number
 * jcrool(anyObjectorArray, [{structure}])
 * Or we can look like this:
 *
 *
 */
/**
 *
 * Possible config Object {
 *   bullseye: [
 *   keyList: ['score', 'created_utc']
 * ]
 *   twinMatch: [
 *   {
 *      keyList: [],
 *      alias: 'foo',
 *      bullseye: true
 * },
 *   {
 *      key: 'bar.data',
 *      alias: 'baz',
 * },
 *
 * ]
 *   set1: ['body'],
 *   set2: ['kind'],
 *   set3: ['author']
 * }
 */
/**
 * TODO be able to crawl a specific property as a single entity.
 * Example:
 * jcrool(anyObjectorArray, [{keyList: ['a', 'b', 'c'], bullseye: true}]);
 * what this does is it will find all instances of a, b and c
 */
export type Natives = 'undefined' | 'string' | 'boolean' | 'number';
export type TNative = undefined | string | boolean | number;
export type AnyObject = Record<string, any>;
export type AnyObjectOrArray = AnyObject | any[];
export interface Konfig {
  keyList: string[];
  types: Natives[];
  key?: string;
  force?: boolean; //false
  bullseye?: boolean; //false
  alias?: string | string[];
  structure?: AnyObject;
}
import { parseOptions } from './lib/parseOptions';
const { isArray } = Array;
export function jcrool(obj: AnyObjectOrArray, keysListConfig: Konfig[]) {
  let pageAssets: any[] = []; // cached final result items
  const workObject = parseOptions(keysListConfig);
  //  (keysListConfig);
  // got to look at an object maybe once or twice or more depending on the input
  //  (workObject);
  if (!isArray(obj)) {
    const allResults = workObject.functionsToRun.map((cb: any) => {
      const res = cb(obj, keysListConfig);
      const foundKeys = Object.keys(res);
    });
    // const bingoObject = produceBingoObject(obj, keysListConfig);
    if (allResults) {
      allResults.forEach((result) => {
        if (result) pageAssets.push(allResults);
      });
    }
  }
  // No Bingo, We will skip to the next One

  const recurse = (obj: any) => {
    if (obj) {
      // if not null
      for (let [, value] of Object.entries(obj)) {
        // loop through the object (arrays are objects too (; )
        //[[key, value], [key, value]]
        if (
          typeof value === 'string' ||
          typeof value === 'boolean' ||
          typeof value === 'number'
        ) {
          // no op
        } else if (isArray(value)) {
          // value is object array, just re run the recursion since we wont have what we want in an array
          recurse(value);
        } else if (typeof value === 'object') {
          // inside an object object we might find what we want.
          // if (value) {
          //   const bingoObject = produceBingoObject(value, keysListConfig);
          //   if (bingoObject) {
          //     pageAssets.push(bingoObject);
          //   }
          // }
          const allResults = workObject.functionsToRun.map((cb: any) =>
            cb(value, keysListConfig)
          );
          allResults.forEach((result) => {
            if (result) pageAssets.push(result);
          });
          //  ('ELLLO');
          //  (allResults);
          recurse(value);
        }
      }
    }
  };
  recurse(obj);
  return pageAssets;
}
