import preloadAll from 'jest-next-dynamic';
import { findPreselectFilterValue, getValueKey } from '../helpers';

const selectedFiltersState = {
  bodyStyles: [],
  transmissions: [],
  fuelTypes: [],
  make: [],
  model: [],
  from: [],
  to: [],
};

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
  it('getValueKey should return correct filter name', async () => {
    expect(
      getValueKey('test', { ...selectedFiltersState, make: ['Test'] }),
    ).toEqual('make');
  });
});
