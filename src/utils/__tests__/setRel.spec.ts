import setRel from '../setRel';

describe('setRel', () => {
  beforeEach(() => {
    process.env.HOSTNAME = 'https://vanarama.com';
  });
  it('should return "noopener noreferrer" for external links', () => {
    const link = { label: 'Google', href: 'https://www.google.com' };
    const actual = setRel(link);

    console.log(process.env.HOSTNAME);

    expect(actual).toEqual('noopener noreferrer');
  });
  it('should return undefined for internal links', () => {
    const link = {
      label: 'About us',
      href: 'https://www.vanarama.com/about-us',
    };
    const actual = setRel(link);

    expect(actual).toBeUndefined();
  });
});
