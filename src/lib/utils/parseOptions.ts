import { Konfig, Natives } from '../../jcrool';
// import { bullseye } from './bullseye/bullseye';
// import { twinMatch } from './twinMatch/twinMatch';
export type KeyList = string[];
export interface workUnit {
  keys: KeyList;
  types: Natives[][];
}

export type workUnitMap = Map<string, Natives[]>;

export interface IWorkObject {
  struct: any;
  twins: workUnitMap[];
  bullseye: workUnitMap;
}

export function parseOptions(keyList: Konfig[]) {
  /**
   * Validation
   */
  if (keyList.filter((unit) => unit.bullseye).length > 1)
    throw new Error('Can only have one bullseye lookup');
  /**
   *
   */

  let workObject = {} as IWorkObject;

  const bullseyeMap = new Map() as workUnitMap;

  keyList.forEach((workUnit) => {
    const twinMap = new Map() as workUnitMap;
    // here we decide which 'mode' takes precedence. you can only use one mode per 'workUnit'
    // 1. struct 2. twins 3. bullseye
    if (workUnit.struct) {
      if (workObject.struct) {
        // todo
      } else {
        Object.defineProperty(workObject, 'struct', {
          value: {},
          enumerable: true,
        });
      }
    } else if (workUnit.twins) {
      if (workObject.twins) {
        workUnit.keys.forEach((key, i) => {
          twinMap.set(key, workUnit.types[i] ?? []);
        });
        workObject.twins.push(twinMap);
      } else {
        workUnit.keys.forEach((key, i) => {
          twinMap.set(key, workUnit.types[i] ?? []);
        });
        Object.defineProperty(workObject, 'twins', {
          value: [twinMap],
          enumerable: true,
          configurable: true,
        });
      }
    } else {
      if (workUnit.keys.length) {
        if (workObject.bullseye) {
          //no op
        } else {
          // second instance of workUnit bullseye need to merge contents to latest find if duplicate.
          workUnit.keys.forEach((key, i) => {
            bullseyeMap.set(key, workUnit.types[i] ?? []);
          });
          Object.defineProperty(workObject, 'bullseye', {
            value: bullseyeMap,
            enumerable: true,
          });
        }
      } else {
        throw new Error('YO PUT SOME KEYS TO LOOK FOR!');
      }
    }
  });
  return workObject;
}
