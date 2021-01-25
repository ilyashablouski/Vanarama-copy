import preloadAll from 'jest-next-dynamic';
import { findPreselectFilterValue } from '../helpers';

describe('<helpers />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should work with value', async () => {
    expect(findPreselectFilterValue('test', ['test'])).toEqual('test');
  });
  it('should work when data null', async () => {
    expect(findPreselectFilterValue('test', null)).toEqual('');
  });
});
