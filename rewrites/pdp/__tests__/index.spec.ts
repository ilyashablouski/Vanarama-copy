import {
  reduceVehiclesToChunks,
  reduceVehiclesByVehicleType,
  buildListOfRewrites,
} from '../index';

describe('reduceVehiclesToChunks', () => {
  test('reduce correctly', () => {
    const chunks = 2;
    const data = [1, 2, 3, 4, 5];

    const actual = reduceVehiclesToChunks(data, chunks);
    const expected = [[1, 2], [3, 4], [5]];

    expect(actual).toEqual(expected);
  });
});

describe('reduceVehiclesByVehicleType', () => {
  test('reduce correctly', () => {
    const data = [
      {
        legacy_url:
          '/ford-van-leasing/transit-custom/2-0-tdci-130ps-low-roof-8-seater-zetec-9811.html',
        vehicle_type: 'lcv',
        cap_id: '42096',
      },
      {
        legacy_url:
          '/toyota-car-leasing/aygo/hatchback/1-0-vvt-i-x-play-tss-5dr-x-shift-156211.html',
        vehicle_type: 'car',
        cap_id: '84581',
      },
    ];

    const actual = reduceVehiclesByVehicleType(data);
    const expected = { car: ['84581'], lcv: ['42096'] };

    expect(actual).toEqual(expected);
  });
});

describe('buildListOfRewrites', () => {
  test('return a list of redirects', () => {
    const derivatives = [
      {
        __typename: 'Derivative',
        id: '1',
        vehicleType: 'CAR',
        slug: 't5-r-design-se-sport-5-doors',
        manufacturer: { __typename: 'Manufacturer', slug: 'volvo' },
        range: { __typename: 'Range', slug: 'v50' },
        model: { __typename: 'Model', slug: 'v50-sportswagon' },
        bodyStyle: { __typename: 'BodyStyle', slug: 'estate' },
      },
      {
        __typename: 'Derivative',
        id: '2',
        vehicleType: 'LCV',
        slug: '12-pop-5-doors',
        manufacturer: { __typename: 'Manufacturer', slug: 'fiat' },
        range: { __typename: 'Range', slug: 'panda' },
        model: { __typename: 'Model', slug: 'panda-hatchback' },
        bodyStyle: { __typename: 'BodyStyle', slug: 'hatchback' },
      },
    ];

    const rawList = [
      {
        legacy_url:
          '/toyota-van-leasing/hilux/invincible-x-d/cab-pick-up-2-4-d-4d-auto-9584.html',
        vehicle_type: 'car',
        cap_id: '1',
      },
      {
        legacy_url:
          '/citroen-van-leasing/berlingo/1-5-bluehdi-650kg-enterprise-75ps-9986.html',
        vehicle_type: 'lcv',
        cap_id: '2',
      },
    ];

    const actual = buildListOfRewrites(derivatives, rawList);

    const expected = [
      {
        from:
          '/toyota-van-leasing/hilux/invincible-x-d/cab-pick-up-2-4-d-4d-auto-9584.html',
        to: '/car-leasing/volvo/v50/estate/t5-r-design-se-sport-5-doors',
      },
      {
        from:
          '/citroen-van-leasing/berlingo/1-5-bluehdi-650kg-enterprise-75ps-9986.html',
        to: '/van-leasing/fiat/panda-hatchback/12-pop-5-doors',
      },
    ];

    expect(actual).toEqual(expected);
  });
});
