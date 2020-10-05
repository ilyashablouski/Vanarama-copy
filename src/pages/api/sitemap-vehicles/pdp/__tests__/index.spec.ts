import { buildPdpSitemapList } from '../index';

describe('getPdpSitemapList', () => {
  test('generate list correctly', async () => {
    const rawList = [
      {
        cursor: 'MQ',
        node: {
          url: '/audi-car-leasing/a4/saloon/35-tfsi-s-line-4dr-162770.html',
          vehicleType: 'CAR',
          legacy: true,
          bodyStyle: 'Saloon',
        },
      },
      {
        cursor: 'Mg',
        node: {
          url:
            '/bmw-car-leasing/x7/estate/xdrive-m50i-5dr-step-auto-6-seat-163438.html',
          vehicleType: 'CAR',
          legacy: true,
          bodyStyle: '4x4',
        },
      },
      {
        cursor: 'Mw',
        node: {
          url:
            '/mercedesbenz-car-leasing/e-class/amg-cabriolet/e53-4matic-premium-2dr-9g-tronic-157771.html',
          vehicleType: 'CAR',
          legacy: true,
          bodyStyle: 'Convertible',
        },
      },
    ];

    const expected = [
      { url: '/audi-car-leasing/a4/saloon/35-tfsi-s-line-4dr-162770.html' },
      {
        url:
          '/bmw-car-leasing/x7/estate/xdrive-m50i-5dr-step-auto-6-seat-163438.html',
      },
      {
        url:
          '/mercedesbenz-car-leasing/e-class/amg-cabriolet/e53-4matic-premium-2dr-9g-tronic-157771.html',
      },
    ];

    const actual = await buildPdpSitemapList(rawList);

    expect(actual).toEqual(expected);
  });
});
