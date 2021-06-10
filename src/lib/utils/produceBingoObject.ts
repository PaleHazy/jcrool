// import { twinMatch } from './twinMatch/twinMatch';
// import { bullseye } from './bullseye/bullseye';
import { AnyObject, Konfig } from '../../jcrool';

export function produceBingoObject(
  anyObject: AnyObject,
  keys: Konfig[],
  cb: any
) {
  // list of the keys that are in the object that match the config
  // const keyListArray = keys.map((k) => findKeyInObjectAndReturnIt(o, k));
  // if()
  return cb(anyObject, keys); // matches pairs(or more) of keys found together

  //return false; // match failed
}

// export function parseOptions(keys: Konfig[]) {
//   // const numberOfOptions = 0;

//   // keys.forEach((key) => {});
// }
