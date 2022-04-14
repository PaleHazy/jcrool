// this is think is v2 (in progress), instead of passing obj by reference (jcrool.ts) I would like to use this.
// note that I have refactored the 'functional' jcrool to be different than some of the methods in here are still the old way I was doing it
export type Natives = 'undefined' | 'string' | 'boolean' | 'number';
export type TNative = undefined | string | boolean | number;
export type AnyObject = Record<string, any>;
export type AnyObjectOrArray = AnyObject | any[];
export interface Konfig {
  keyList: string[];
  types: Natives[];
  key?: string;
  force?: boolean; //false
  bullseye?: boolean; //false
  alias?: string | string[];
  structure?: AnyObject;
}

export type workUnitMap = Map<string, Natives[]>;

export type KeyList = string[];
export interface workUnit {
  keys: KeyList;
  types: Natives[][];
}

export interface IWorkObject {
  struct: any;
  twins: workUnitMap[];
  bullseye: workUnitMap;
}
export default class Jcrool {
  _topLevelObj: AnyObjectOrArray;
  _currentObj!: AnyObject;
  _bingoBook: any[] = [];
  _couples: string[] = [];
  _twins: string[] = [];
  _bulls: string[] = [];
  _nested: string[] = [];
  constructor(obj: AnyObjectOrArray) {
    this._topLevelObj = obj;
  }

  util(storage: any[], keyList: string | string[]) {
    if (Array.isArray(keyList)) {
      storage.push(...keyList);
    } else {
      storage.push(keyList as string);
    }
    return this;
  }

  addTwin(keyList: string | string[]) {
    return this.util(this._twins, keyList);
  }
  addBullseye(keyList: string | string[]) {
    return this.util(this._bulls, keyList);
  }
  addCouple(keyList: [string, string]) {
    return this.util(this._couples, keyList);
  }
  recurse() {
    for (let [, value] of Object.entries(this._currentObj)) {
      this._currentObj = value;
      if (
        typeof value === 'string' ||
        typeof value === 'boolean' ||
        typeof value === 'number'
      ) {
        // no op
      } else if (Array.isArray(value)) {
        // value is object array, just re run the recursion since we wont have what we want in an array
        this.recurse();
      } else if (typeof value === 'object') {
        this._bingoBook.push('');
        this.recurse();
      }
    }
  }
  produceBingoObject(
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
  evaluateWorkObject(anyObj: AnyObject, workObj: IWorkObject) {
    const finalObj: any = {};
    for (let [key, value] of Object.entries(workObj)) {
      if (key === 'twins') {
        // run twins eval code, mutates finalObj
        value.forEach((value: workUnitMap) => {
          this.twinMatch(anyObj, value, finalObj);
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

  twinMatch(
    anyObj: AnyObject,
    unitMap: workUnitMap,
    finalObj: any
  ): void {
    let match = '';
    const keys: string[] = [];
    unitMap.forEach((v, k) => {
      match = this.matchKeyAndType(anyObj, k, v);
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

  bullseye(
    anyObj: AnyObject,
    unitMap: workUnitMap,
    finalObj: any
  ) {
    unitMap.forEach((v, k) => {
      let match = this.matchKeyAndType(anyObj, k, v);
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

  matchKeyAndType(
    object: AnyObject,
    key: string,
    types: Natives[]
  ) {
    //is the key present? and of one of the types. return the key;
    const keyPresent: boolean = key in object;
    if (keyPresent) {
      if (this.isTypeOf(object[key], types)) {
        return key;
      }
    }
    return ''; // is falsy
  }

  isTypeOf(value: any, types: Natives[]) {
    return types.some((type) => typeof value === type);
  }
}
