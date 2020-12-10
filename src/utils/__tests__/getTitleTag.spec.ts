import preloadAll from 'jest-next-dynamic';

import getTitleTag from '../getTitleTag';

describe('getTitleTag', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('getTitleTag should return div', () => {
    const actual = getTitleTag('div');

    expect(actual).toEqual('div');
  });
  it('getTitleTag should return undefined', () => {
    const actual = getTitleTag('');

    expect(actual).toEqual(undefined);
  });
});
