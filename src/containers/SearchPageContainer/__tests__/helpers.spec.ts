import preloadAll from 'jest-next-dynamic';
import {
  bodyUrls,
  isBodyStyleForCMS,
  onMadeLineBreaks,
  trimSlug,
} from '../helpers';

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

describe('trimSlug', () => {
  it('trimSlug should return trim slug', () => {
    expect(trimSlug('/car-leasing/land-rover/range-rover-evoque')).toBe(
      'car-leasing/land-rover/range-rover-evoque',
    );
  });
});

describe('isBodyStyleForCMS', () => {
  it(`manufacturer url param string shouldn't return true if compared 
    body url param`, () => {
    expect(isBodyStyleForCMS(bodyUrls, 'iveco')).toEqual(false);
    expect(isBodyStyleForCMS(bodyUrls, 'specialist-van-leasing')).toEqual(true);
  });
});
