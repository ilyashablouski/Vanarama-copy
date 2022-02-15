import { redirectToParentPage } from '../redirect';
import { IBreadcrumb } from '../../types/breadcrumbs';

describe('redirectToParentPage', () => {
  it('should works correct', () => {
    const breadcrumbs = [
      {
        href: 'https://www.vanarama.com/',
        label: 'Home',
      },
      {
        href: '/car-leasing.html',
        label: 'Car Leasing',
      },
      {
        href: '/bmw-car-leasing.html',
        label: 'BMW',
      },
      {
        label: '1 Series',
      },
    ];

    const redirectObject = {
      redirect: {
        destination: '/bmw-car-leasing.html',
        permanent: false,
      },
    };
    expect(redirectToParentPage(breadcrumbs as IBreadcrumb[])).toMatchObject(
      redirectObject,
    );
  });
});
