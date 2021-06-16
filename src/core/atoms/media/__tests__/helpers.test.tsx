import { getYouTubeThumbnail } from '../helpers';

describe('getYouTubeThumbnail', () => {
  it('getYouTubeThumbnail should return correct url', () => {
    expect(getYouTubeThumbnail('someId')).toBe(
      `https://img.youtube.com/vi_webp/someId/sddefault.webp`,
    );
  });
});
