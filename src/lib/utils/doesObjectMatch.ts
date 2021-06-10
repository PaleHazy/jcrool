import { matchKeyAndType } from './matchKeyAndType';
import { AnyObject } from '../../jcrool';
import { workUnitMap } from './parseOptions';
export function doesObjectMatch(anyObject: AnyObject, unitMap: workUnitMap) {
  if (anyObject) {
    for (let [key, types] of unitMap.entries()) {
      const result = matchKeyAndType(anyObject, key, types);
      if (result === '') {
        //failed to match.
        return false;
      }
    }
    // return new Map(mappedKeys); // this line IS TWIN MATCH
  }
  return false;
}
