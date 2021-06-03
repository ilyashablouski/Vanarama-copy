import { createUrl } from '../utils';

describe('createUrl', () => {
  it('should have correct Url', () => {
    const query = {
      text: 'some text',
      postcode: 'SW1W 0NY',
    };

    const config = {
      apiKey: 'abcdef12345',
      country: 'GB' as const,
      limit: 2,
    };

    const actual = createUrl(query, config);
    expect(actual).toBe(
      `https://api.addressy.com/Capture/Interactive/Find/v1.1/json3.ws?Key=abcdef12345&Limit=2&Countries=GB&Text=some%20text&Container=SW1W%200NY`,
    );
  });
});
