import preloadAll from 'jest-next-dynamic';
import { NextRouter } from 'next/router';
import {
  getBuckets,
  getMainImageUrl,
  getNextProgressStep,
  getPathName,
  onReplace,
  setQuery,
} from '../helpers';

describe('<helpers />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  describe('getMainImageUrl', () => {
    it('should return main vehicle image url', () => {
      const imageData = {
        vehicleImages: [
          { capId: 111111, mainImageUrl: 'https://main-image.png' },
        ],
      };

      expect(getMainImageUrl(imageData, '111111')).toEqual(
        'https://main-image.png',
      );
    });
  });
  describe('getBuckets', () => {
    it('should return new array with all active = false', async () => {
      expect(
        getBuckets(
          [
            {
              key: '4x4',
            },
            {
              key: 'Hatchback',
            },
          ],
          [],
        ),
      ).toEqual([
        {
          label: '4x4',
          value: '4x4',
          active: false,
        },
        {
          label: 'Hatchback',
          value: 'Hatchback',
          active: false,
        },
      ]);
    });
    it('should return new array with Hatchback active = true', async () => {
      expect(
        getBuckets(
          [
            {
              key: '4x4',
            },
            {
              key: 'Hatchback',
            },
          ],
          ['Hatchback'],
        ),
      ).toEqual([
        {
          label: '4x4',
          value: '4x4',
          active: false,
        },
        {
          label: 'Hatchback',
          value: 'Hatchback',
          active: true,
        },
      ]);
    });
  });
  describe('onReplace', () => {
    it('should call router.push', async () => {
      const router = {
        push: jest.fn(),
        pathname: '/help-me-choose/[[...param]]',
        route: '/help-me-choose/[[...param]]',
        query: {},
      } as any;
      onReplace(router, {
        bodyStyles: { active: false, value: [], title: 'title' },
        financeTypes: { active: false, value: 'PHC' as any, title: 'title' },
        fuelTypes: { active: false, value: [], title: 'title' },
        transmissions: { active: false, value: [], title: 'title' },
        terms: { active: false, value: [], title: 'title' },
        mileages: { active: false, value: [], title: 'title' },
        availability: { active: false, value: [], title: 'title' },
        rental: { active: false, value: '' as any, title: 'title' },
        initialPeriods: { active: false, value: '' as any, title: 'title' },
      });
      expect(router.push).toBeCalledWith(
        {
          pathname: router.route,
          query: {
            financeTypes: 'PHC',
          },
        },
        '/help-me-choose/?financeTypes=PHC',
        { shallow: true },
      );
    });
    it('should call router.push', async () => {
      const router = {
        push: jest.fn(),
        pathname: '/help-me-choose/[[...param]]',
        route: '/help-me-choose/[[...param]]',
        query: { utm_medium: 'email' },
      } as any;
      onReplace(router, {
        bodyStyles: { active: false, value: [], title: 'title' },
        financeTypes: { active: false, value: 'PHC' as any, title: 'title' },
        fuelTypes: { active: false, value: [], title: 'title' },
        transmissions: { active: false, value: [], title: 'title' },
        terms: { active: false, value: [], title: 'title' },
        mileages: { active: false, value: [], title: 'title' },
        availability: { active: false, value: [], title: 'title' },
        rental: { active: false, value: '' as any, title: 'title' },
        initialPeriods: { active: false, value: '' as any, title: 'title' },
      });
      expect(router.push).toBeCalledWith(
        {
          pathname: router.route,
          query: {
            financeTypes: 'PHC',
            utm_medium: 'email',
          },
        },
        '/help-me-choose/?utm_medium=email&financeTypes=PHC',
        { shallow: true },
      );
    });
  });
  describe('should getNextProgressStep works correctly', () => {
    it('...with some step', async () => {
      const searchParams = '?financeTypes=PCH';
      const copyInitialSteps = {
        financeTypes: {
          active: false,
          value: [],
          title: 'About You',
        },
        bodyStyles: {
          active: false,
          value: [],
          title: 'Style',
        },
        fuelTypes: {
          active: false,
          value: [],
          title: 'Fuel Types',
        },
        transmissions: {
          active: false,
          value: [],
          title: 'Gearbox',
        },
        terms: {
          active: false,
          value: [],
          title: 'Lease Length',
        },
        mileages: {
          active: false,
          value: [],
          title: 'Mileage',
        },
        availability: {
          active: false,
          value: [],
          title: 'Availability',
        },
        rental: {
          active: false,
          value: '',
          title: 'Results',
        },
        initialPeriods: {
          active: false,
          value: '',
          title: 'Results',
        },
      };
      const result = {
        financeTypes: {
          active: false,
          value: ['PCH'],
          title: 'About You',
        },
        bodyStyles: {
          active: true,
          value: [],
          title: 'Style',
        },
        fuelTypes: {
          active: false,
          value: [],
          title: 'Fuel Types',
        },
        transmissions: {
          active: false,
          value: [],
          title: 'Gearbox',
        },
        terms: {
          active: false,
          value: [],
          title: 'Lease Length',
        },
        mileages: {
          active: false,
          value: [],
          title: 'Mileage',
        },
        availability: {
          active: false,
          value: [],
          title: 'Availability',
        },
        rental: {
          active: false,
          value: '' as any,
          title: 'Results',
        },
        initialPeriods: {
          active: false,
          value: '' as any,
          title: 'Results',
        },
      };

      await getNextProgressStep(searchParams, copyInitialSteps);

      expect(copyInitialSteps).toMatchObject(result);
    });
    it('...with last step', async () => {
      const searchParams =
        '?financeTypes=PCH&bodyStyles=Hatchback&fuelTypes=Diesel&transmissions=Manual&terms=36&mileages=8000&availability=14&rental=350&initialPeriods=6';
      const copyInitialSteps = {
        financeTypes: {
          active: false,
          value: [],
          title: 'About You',
        },
        bodyStyles: {
          active: false,
          value: [],
          title: 'Style',
        },
        fuelTypes: {
          active: false,
          value: [],
          title: 'Fuel Types',
        },
        transmissions: {
          active: false,
          value: [],
          title: 'Gearbox',
        },
        terms: {
          active: false,
          value: [],
          title: 'Lease Length',
        },
        mileages: {
          active: false,
          value: [],
          title: 'Mileage',
        },
        availability: {
          active: false,
          value: [],
          title: 'Availability',
        },
        rental: {
          active: false,
          value: '',
          title: 'Results',
        },
        initialPeriods: {
          active: false,
          value: '',
          title: 'Results',
        },
      };
      const result = {
        financeTypes: {
          active: false,
          value: ['PCH'],
          title: 'About You',
        },
        bodyStyles: {
          active: false,
          value: ['Hatchback'],
          title: 'Style',
        },
        fuelTypes: {
          active: false,
          value: ['Diesel'],
          title: 'Fuel Types',
        },
        transmissions: {
          active: false,
          value: ['Manual'],
          title: 'Gearbox',
        },
        terms: {
          active: false,
          value: ['36'],
          title: 'Lease Length',
        },
        mileages: {
          active: false,
          value: ['8000'],
          title: 'Mileage',
        },
        availability: {
          active: false,
          value: ['14'],
          title: 'Availability',
        },
        rental: {
          active: true,
          value: '350',
          title: 'Results',
        },
        initialPeriods: {
          active: true,
          value: '6',
          title: 'Results',
        },
      };

      await getNextProgressStep(searchParams, copyInitialSteps);

      expect(copyInitialSteps).toMatchObject(result);
    });
  });
  it('should getPathName works correctly', () => {
    const router = {
      route: '/help-me-choose/[[...param]]',
    };
    const queries = {
      financeTypes: 'PCH',
      bodyStyles: ['Hatchback'],
    };
    expect(getPathName(router as NextRouter, queries)).toEqual(
      '/help-me-choose/?financeTypes=PCH&bodyStyles=Hatchback',
    );
  });
  it('should setQuery works correctly', async () => {
    const router = {
      route: '/help-me-choose/[[...param]]',
      query: {},
      push: jest.fn(),
    };
    const queries = {
      financeTypes: 'PCH',
    };

    await setQuery((router as any) as NextRouter, queries);
    expect(router.push).toBeCalled();
    expect(router.push).toBeCalledWith(
      {
        pathname: router.route,
        query: queries,
      },
      '/help-me-choose/?financeTypes=PCH',
      { shallow: true },
    );
  });
});
