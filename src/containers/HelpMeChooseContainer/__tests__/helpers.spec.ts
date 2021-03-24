import { getBuckets, onReplace } from '../helpers';

describe('<helpers />', () => {
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
  });
});
