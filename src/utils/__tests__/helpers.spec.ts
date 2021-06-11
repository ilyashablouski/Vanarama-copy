import { arrayIsEqual } from '../helpers';

describe('arrayIsEqual', () => {
  it('should order by sortByKey argument and compare 2 array of objects, to check they are equal', () => {
    const array1 = [
      {
        order: 7,
        value: ['Electric'],
      },
      {
        order: 1,
        value: 'bmw',
      },
    ];
    const array2 = [
      {
        order: 1,
        value: 'bmw',
      },
      {
        order: 7,
        value: ['Electric'],
      },
    ];
    const actual1 = arrayIsEqual(array1, array1, 'order');
    const actual2 = arrayIsEqual(array1, array2, 'order');

    expect(actual1).toEqual(true);
    expect(actual2).toEqual(true);
  });

  it('should sort and compare 2 string arrays to check they are equal', () => {
    const stringArray1 = ['hello', 'goodbye'];
    const stringArray2 = ['goodbye', 'hello'];
    const actual1 = arrayIsEqual(stringArray1, stringArray1);
    const actual2 = arrayIsEqual(stringArray1, stringArray2);

    expect(actual1).toEqual(true);
    expect(actual2).toEqual(true);
  });
});
