import { AnyObject } from '../../jcrool';
import { workUnitMap } from '../utils/parseOptions';
import { matchKeyAndType } from '../utils/matchKeyAndType';

export function bullseye(
  anyObj: AnyObject,
  unitMap: workUnitMap,
  finalObj: any
) {
  unitMap.forEach((v, k) => {
    let match = matchKeyAndType(anyObj, k, v);
    if (match) {
      Object.defineProperty(finalObj, match, {
        value: anyObj[match],
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }
  });
  if (Object.keys(finalObj).length === 0) {
    finalObj.failed = true;
  }
}
