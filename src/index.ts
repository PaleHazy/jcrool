// this is think is v2 (in progress), instead of passing obj by reference (jcrool.ts) I would like to use this.
// note that I have refactored the 'functional' jcrool to be different than some of the methods in here are still the old way I was doing it
type Natives = "undefined" | "string" | "boolean" | "number";
type AnyObject = Record<string, any>;
type AnyObjectOrArray = AnyObject | any[];

interface SearchObject {
  [key: string]: SearchObject["keys"] | SearchObject["types"]
  keys: string[] | string;
  types: Natives[] | Natives;
}
interface ResultObject<K extends string = any> {
  key: K;
  data: any[];
}

function ifNot_PutStringIntoArray(s: string | string[]): string[] {
  if (Array.isArray(s)) {
    return s;
  }
  return [s];
}

export class Jcrool {
  _obj: AnyObjectOrArray;
  constructor(obj: AnyObjectOrArray) {
    this._obj = obj;
  }
  find(searchSet: SearchObject): ResultObject[] {
    const { keys, types } = searchSet;
    const k = ifNot_PutStringIntoArray(keys);
    const t = ifNot_PutStringIntoArray(types);
    const results: { [k: string]: any[] } = {};
    let obj = this._obj;
    if(!Array.isArray(obj)) {
      k.forEach((key) => {
        //@ts-ignore
        if (t.includes(typeof obj[key])) {
          //@ts-ignore
          results[key] = [...(results[key] ? results[key]! : []), obj[key]];
        }
      });
    }
    function recurse() {
      if(obj) {

        for (let [, value] of Object.entries(obj)) {
          if (typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
            // no op
          } else if (Array.isArray(value)) {
            // value is object array, just re run the recursion since we wont have what we want in an array
            obj = value;
            recurse();
          } else if (typeof value === "object") {
            //in here save the values if there is a match
            k.forEach((key) => {
              if(value?.[key]) {
                if (t.includes(typeof value[key])) {
                  results[key] = [...(results[key] ? results[key]! : []), value[key]];
                }
              }
          });
          obj = value;
          recurse();
        }
      }
    }
    }
    recurse();
    const resObj: ResultObject[] = [];
    for (let [key, value] of Object.entries(results)) {
      resObj.push({ key, data: value });
    }
    return resObj;
  }
}
