import setRel from '../setRel';

describe('setRel', () => {
  it('should return "noopener noreferrer" for external links', () => {
    process.env.HOSTNAME = 'https://vanarama.com';
    const link = { label: 'Google', href: 'https://www.google.com' };
    const actual = setRel(link);

    expect(actual).toEqual('noopener noreferrer');
  });
  it('should return undefined for internal links', () => {
    process.env.HOSTNAME = 'https://vanarama.com';
    const link = {
      label: 'About us',
      href: 'https://www.vanarama.com/about-us',
    };
    const actual = setRel(link);

    expect(actual).toBeUndefined();
  });
});
