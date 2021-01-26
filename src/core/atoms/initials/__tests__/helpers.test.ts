import getInitials from '../helpers';

describe('getInitials', () => {
  test.each([
    ['', ''],
    ['Gianluca Agnocchetti', 'GA'],
    ['Anastasya Irina Ciaccarina', 'AC'],
    ['Anastasya', 'AN'],
  ])('%p should return "%p"', (input, expected) => {
    const actual = getInitials(input);
    expect(actual).toEqual(expected);
  });
});
