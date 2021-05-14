import { AnyObject, Konfig } from '../../jcrool';
import { isTypeOf } from './isTypeOf';
/**
 *
 * @param object Literally any Object
 * @param keyConfig A single "KeyObject"
 * @returns the string literal key of the object if it could find one
 * @description programmatically checks if the key is within the specified object/context and if the
 * value belonging to the key is of the specified type declared in the config. If no type given, all pass
 */
export function matchKeyAndType(object: AnyObject, keyConfig: Konfig) {
  // 'OBJECT', object;
  let bingo = keyConfig.keyList.filter((key) => key in object);
  // 'BINGO', bingo;
  for (let i = 0; i < bingo.length; i++) {
    const key = bingo[i];
    // double check obj being undefined?
    //is accessing the object here wasteful ?
    // if the types is an empty array it will return true.

    if (key && isTypeOf(object[key], keyConfig.types ?? [])) {
      // if key value is truthy value
      return key; // key
    }
  }
  return ''; // is falsy
}
