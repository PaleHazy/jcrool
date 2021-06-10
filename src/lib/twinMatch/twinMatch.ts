import { AnyObject } from '../../jcrool';
import { workUnitMap } from '../utils/parseOptions';
import { matchKeyAndType } from '../utils/matchKeyAndType';

export function twinMatch(
  anyObj: AnyObject,
  unitMap: workUnitMap,
  finalObj: any
): void {
  let match = '';
  const keys: string[] = [];
  unitMap.forEach((v, k) => {
    match = matchKeyAndType(anyObj, k, v);
    keys.push(match);
  });
  if (keys.includes('') === false) {
    // this is the twin match, aka they all have to match or nothing
    for (let key of keys) {
      Reflect.defineProperty(finalObj, key, {
        value: anyObj[key],
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }
  } else {
    finalObj.failed = true;
  }
}
