import { getFeaturedClassPartial } from '../layout';

describe('layout', () => {
  describe('getFeaturedClassPartial', () => {
    it('getFeaturedClassPartial should return featured-fullwidth', () => {
      const actual = getFeaturedClassPartial({ layout: 'Full Width' });

      expect(actual).toEqual('featured-fullwidth');
    });
    it('getFeaturedClassPartial should return featured-left', () => {
      const actual = getFeaturedClassPartial({ layout: 'Media Left' });

      expect(actual).toEqual('featured-left');
    });
    it('getFeaturedClassPartial should return featured-right', () => {
      const actual = getFeaturedClassPartial({ layout: 'Media Right' });

      expect(actual).toEqual('featured-right');
    });
  });
});
