import isObjectsShallowEqual from '../objects';

describe('isObjectsShallowEqual work correctly', () => {
  it('for equal objects should return true', () => {
    const testObj1 = {
      test: 'test',
      foo: 123,
      hi: null,
      42: undefined,
    };
    const testObj2 = {
      test: 'test',
      foo: 123,
      hi: null,
      42: undefined,
    };
    expect(isObjectsShallowEqual(testObj1, testObj2)).toEqual(true);
    expect(isObjectsShallowEqual(testObj2, testObj1)).toEqual(true);
  });
  it('for unequal objects should return false', () => {
    const testObj1 = {
      test: 'null',
      foo: 888,
      hello: undefined,
    };
    const testObj2 = {
      test: 'test',
      foo: 123,
      hi: null,
    };
    const testObj3 = {
      42: 42,
    };
    expect(isObjectsShallowEqual(testObj1, testObj2)).toEqual(false);
    expect(isObjectsShallowEqual(testObj1, testObj3)).toEqual(false);
    expect(isObjectsShallowEqual(testObj3, testObj2)).toEqual(false);
  });
});
