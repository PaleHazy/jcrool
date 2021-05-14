//jcrool(anyObjectorArray, [
// {keyList: ['a', 'b', 'c'], bullseye: true},
// {keyList: ['d','f']},
// {key: 'name'}
// ]);
import { bullseye } from './bullseye/bullseye';
import { twinMatch } from './twinMatch/twinMatch';

interface IWorkObject {
  ruleSetCount: number;
  functionsToRun: any[]; // TODO:
  pushKey: (key: string) => void;
  alreadyFoundKeys: string[];
  bullseye: string[];
  twins: string[];
}

export function parseOptions(keyList: any) {
  // let numberOfIterations = 0;
  let workObject: IWorkObject = {
    ruleSetCount: 0,
    functionsToRun: [], //list of functions to run based on number
    pushKey: function pushKey(key: string) {
      this.alreadyFoundKeys.push(key);
    },
    bullseye: [],
    alreadyFoundKeys: [], // in here are the keys that already have been tagged to not have to read or write them again
  };

  keyList.forEach((key: any) => {
    if ('keyList' in key) {
      // look for bullseye
      if (key.bullseye) {
        workObject.functionsToRun.push(bullseye);
      } else {
        workObject.functionsToRun.push(twinMatch);
      }
    } else if ('key' in key) {
      // lookup bullseye for one key
      workObject.functionsToRun.push(bullseye);
    } else {
      throw new Error(
        'Need to specify a "key", or "keyList" property in all searches'
      );
    }
  });
  return workObject;
}
