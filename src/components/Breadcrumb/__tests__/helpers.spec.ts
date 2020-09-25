import { NextRouter } from 'next/router';
import { routerItems } from '../helpers';

describe('<helpers />', () => {
  it('routerItems should return breadcrumb link array ', async () => {
    expect(
      routerItems({
        asPath: '/car-leasing-explained/business-vs-personal-car-leasing',
      } as NextRouter),
    ).toEqual([
      { link: { href: '/', label: 'home' } },
      {
        link: {
          href: '/car-leasing-explained',
          label: 'car leasing explained',
        },
      },
      {
        link: {
          href: '/car-leasing-explained/business-vs-personal-car-leasing',
          label: 'business vs personal car leasing',
        },
      },
    ]);
  });
});
