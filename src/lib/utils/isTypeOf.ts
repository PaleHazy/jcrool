import { Natives } from '../../jcrool';
/**
 *
 * @param value could be literally anything
 * @param types array of possible types we are looking for
 * @returns boolean
 * @description checks if a value is any of the types specified
 */
export function isTypeOf(value: any, types: Natives[]) {
  //some returns true on an empty string this is desired behavior in case no types are added.
  //  (value, types);
  return types.some((type) => typeof value === type);
}
