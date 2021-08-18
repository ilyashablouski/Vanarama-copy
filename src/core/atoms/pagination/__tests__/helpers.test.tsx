import { addEtc } from '../helpers';

describe('addEtc', () => {
  it('addEtc should return correct array', () => {
    expect(addEtc([1, 3, 4, 5, 18])).toEqual([
      '1',
      '...',
      '3',
      '4',
      '5',
      '...',
      '18',
    ]);
  });
  it('addEtc should return correct array', () => {
    expect(addEtc([1, 2, 3, 4, 18])).toEqual(['1', '2', '3', '4', '...', '18']);
  });
});
