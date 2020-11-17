import setRel from '../setRel';

describe('setRel', () => {
  it('should return "noopener noreferrer" for external links', () => {
    const hostname = 'https://vanarama.com';
    const link = { label: 'Google', href: 'https://www.google.com' };

    const actual = setRel(link, hostname);

    expect(actual).toEqual('noopener noreferrer');
  });
  it('should return undefined for internal links', () => {
    const hostname = 'https://vanarama.com';
    const link = {
      label: 'About us',
      href: 'https://www.vanarama.com/about-us',
    };

    const actual = setRel(link, hostname);

    expect(actual).toBeUndefined();
  });
});
