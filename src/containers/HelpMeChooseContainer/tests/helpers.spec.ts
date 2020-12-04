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
    it('should call router.replace', async () => {
      const router = {
        replace: jest.fn(),
        pathname: '/help-me-choose/[[...param]]',
        route: '/help-me-choose/[[...param]]',
        query: {},
      } as any;
      onReplace(router, {
        bodyStyles: { active: false, value: [] },
        financeTypes: { active: false, value: 'PHC' as any },
        fuelTypes: { active: false, value: [] },
        transmissions: { active: false, value: [] },
        terms: { active: false, value: [] },
        mileages: { active: false, value: [] },
        availability: { active: false, value: [] },
      });
      expect(router.replace).toBeCalledWith(
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
