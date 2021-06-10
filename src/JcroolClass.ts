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
}
