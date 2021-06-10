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
import { evaluateWorkObject } from './lib/utils/evaluateWorkObject';
import { parseOptions, workUnit } from './lib/utils/parseOptions';
export type Natives = 'undefined' | 'string' | 'boolean' | 'number';
export type TNative = undefined | string | boolean | number;
export type AnyObject = Record<string, any>;
export type AnyObjectOrArray = AnyObject | any[];

export interface Konfig extends workUnit {
  struct?: boolean;
  twins?: boolean;
  bullseye?: boolean;
}
const { isArray } = Array;
export function jcrool(obj: AnyObjectOrArray, keysListConfig: Konfig[]) {
  let results: any[] = []; // cached final result items
  const workObject = parseOptions(keysListConfig);
  const isTopLevelArray = isArray(obj);
  if (!isTopLevelArray) {
    const result = evaluateWorkObject(obj, workObject);
    if (!result.failed) {
      results.push(result);
    }
  }

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
          const result = evaluateWorkObject(value!, workObject);
          if (result.failed !== true) {
            results.push(result);
          }
          recurse(value);
        }
      }
    }
  };
  recurse(obj);
  return results;
}
