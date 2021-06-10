import { AnyObject, Natives } from '../../jcrool';
import { isTypeOf } from './isTypeOf';
/**
 *
 * @param object Literally any Object
 * @param keyConfig A single "KeyObject"
 * @returns the string literal key of the object if it could find one
 * @description programmatically checks if the key is within the specified object/context and if the
 * value belonging to the key is of the specified type declared in the config. If no type given, all pass
 */
export function matchKeyAndType(
  object: AnyObject,
  key: string,
  types: Natives[]
) {
  //is the key present? and of one of the types. return the key;
  const keyPresent: boolean = key in object;
  if (keyPresent) {
    if (isTypeOf(object[key], types)) {
      return key;
    }
  }
  return ''; // is falsy
}
