import preloadAll from 'jest-next-dynamic';
import { onMadeLineBreaks } from '../helpers';

describe('<helpers />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should work with value', async () => {
    expect(onMadeLineBreaks('Volkswagen Tiguan Allspace Leasing')).toEqual([
      'Volkswagen',
      'Tiguan Allspace',
      'Leasing',
    ]);
  });
  it('should work with custom line length', async () => {
    expect(onMadeLineBreaks('Volkswagen Tiguan Allspace Leasing', 26)).toEqual([
      'Volkswagen Tiguan Allspace',
      'Leasing',
    ]);
  });
});
