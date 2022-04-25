import { hasDuplicates, sum } from '../array';

describe('Array helpers', () => {
  describe('hasDuplicates', () => {
    test.each([
      [[], false],
      [['a', 'b', 'c'], false],
      [['a', 'b', 'b'], true],
      [['b', 'b'], true],
      [['a'], false],
      [['a', 'a', 'b', 'b'], true],
      [['', '', 'a'], true],
      [['1', 1], false],
    ])('%p should return "%p"', (input, expected) => {
      const actual = hasDuplicates(input);
      expect(actual).toEqual(expected);
    });
  });

  describe('sum', () => {
    describe('simple number selector', () => {
      const numberSelector = (_: number) => _;

      test.each([
        [[1], 1, numberSelector],
        [[-1, 0, 0, 4], 3, numberSelector],
        [[1, 2, 3], 6, numberSelector],
        [[], 0, numberSelector],
        [[0, 0, 0], 0, numberSelector],
      ])('%p should return "%p"', (input, expected, selector) => {
        const actual = sum(input, selector);
        expect(actual).toEqual(expected);
      });
    });

    describe('nested selector', () => {
      const nestedSelector = (_: { item: number }) => _.item;

      test.each([
        [[{ item: 1 }, { item: 2 }, { item: 0 }], 3, nestedSelector],
        [[], 0, nestedSelector],
      ])('%j should return "%p"', (input, expected, selector) => {
        const actual = sum(input, selector);
        expect(actual).toEqual(expected);
      });
    });
  });
});
