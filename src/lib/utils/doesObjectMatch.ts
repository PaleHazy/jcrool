import { matchKeyAndType } from './matchKeyAndType';
import { AnyObject, Konfig } from '../../jcrool';
export function doesObjectMatch(anyObject: AnyObject, keys: Konfig[]) {
  if (anyObject) {
    const mappedKeys = keys.map((k) => {
      return matchKeyAndType(anyObject, k);
    });
    // 'MappedKeys:', mappedKeys;
    // console.log(mappedKeys);
    return !mappedKeys.includes('') && new Set(mappedKeys); // this line IS TWIN MATCH
  }
  return false;
}
