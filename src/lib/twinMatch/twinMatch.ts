import { Konfig, AnyObject, TNative } from '../../jcrool';
import { doesObjectMatch } from '../utils/doesObjectMatch';

// function twinImplementation() {}
export function twinMatch(anyObject: AnyObject, keys: Konfig[]) {
  let validObjectKeys = doesObjectMatch(anyObject, keys);
  if (validObjectKeys) {
    //BINGO
    const o: Record<string, TNative> = {};
    validObjectKeys.forEach((key) => {
      Reflect.defineProperty(o, key, {
        value: anyObject[key],
        enumerable: true,
      });
    });
    return o;
    //TODO abililty to change the keyname of the output
  }
  return false;
}
