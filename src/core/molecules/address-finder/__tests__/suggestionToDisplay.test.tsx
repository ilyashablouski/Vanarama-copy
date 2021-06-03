import { suggestionToDisplay } from '../utils';

describe('suggestionToDisplay', () => {
  it('should have correct actual value', () => {
    const input = {
      id: 'id',
      type: 'Postcode' as const,
      text: 'some text',
      description: 'some description',
    };

    const actual = suggestionToDisplay(input);
    expect(actual).toBe(`some text - some description`);
  });
});
