import { AnyObject } from '../../jcrool';
// import { bullseye } from '../bullseye/bullseye';
import { IWorkObject, workUnitMap } from './parseOptions';
import { twinMatch } from '../twinMatch/twinMatch';

export function evaluateWorkObject(anyObj: AnyObject, workObj: IWorkObject) {
  const finalObj: any = {};
  for (let [key, value] of Object.entries(workObj)) {
    if (key === 'twins') {
      // run twins eval code, mutates finalObj
      value.forEach((value: workUnitMap) => {
        twinMatch(anyObj, value, finalObj);
      });
    }

    //runs after on purpose will overwrite found keys of same name
    // if (key === 'bullseye') {
    //   //runs bullseye finding code
    //   bullseye(anyObj, value, finalObj);
    // }
  }
  return finalObj;
}
