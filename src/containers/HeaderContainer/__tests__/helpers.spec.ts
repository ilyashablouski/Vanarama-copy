import { convertPromoImageLink, convertChildrenNavLink } from '../helpers';

describe('convertChildrenNavLink', () => {
  it('convertChildrenNavLink should return correct array', () => {
    expect(
      convertChildrenNavLink({
        text: 'Vans Home',
        url: '/van-leasing.html',
        label: null,
      }),
    ).toEqual({
      as: '/van-leasing.html',
      href: '/van-leasing.html',
      id: '/van-leasing.html',
      label: 'Vans Home',
      query: { isChangePage: 'true' },
    });
  });
});

describe('convertPromotionalImage', () => {
  it('convertPromotionalImage should return correct array', () => {
    expect(
      convertPromoImageLink({
        url: '/ford-van-leasing/transit-custom',
        legacyUrl: '/peugeot-van-leasing/expert.html',
        image: [
          {
            file: {
              url:
                '//images.ctfassets.net/3xid768u5joa/6UiNASqKZlW2q22VdDEDFs/9f655ce3676c53e847bb2800b72de532/800x800_Vans_Optimised.jpg',
              fileName: '800x800_Vans_Optimised.jpg',
              details: {
                image: {
                  width: 100,
                  height: 100,
                },
              },
            },
          },
        ],
      }),
    ).toEqual({
      image: {
        width: 100,
        height: 100,
        fileName: '800x800_Vans_Optimised.jpg',
        url:
          '//images.ctfassets.net/3xid768u5joa/6UiNASqKZlW2q22VdDEDFs/9f655ce3676c53e847bb2800b72de532/800x800_Vans_Optimised.jpg',
      },
      url: '/peugeot-van-leasing/expert.html',
    });
  });
});
