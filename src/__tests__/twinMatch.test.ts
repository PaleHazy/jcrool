import { unitOfWorkMap } from '../Mocks/Map';
import { twinMatch } from '../lib/twinMatch/twinMatch';

const target = {
  a: 'hello',
  b: 42,
};
const target2 = {
  a: 'hello',
  c: 42,
};
describe('Twin Match', () => {
  test('Twin Match properly collects keys', () => {
    const finalObj = {};
    twinMatch(target, unitOfWorkMap, finalObj);
    expect(finalObj).toStrictEqual({ a: 'hello', b: 42 });
  });

  test('Twin Match properly fails when key sets are different', () => {
    const finalObj = {};
    twinMatch(target2, unitOfWorkMap, finalObj);
    expect(finalObj).toStrictEqual({ failed: true }); //
  });
});
