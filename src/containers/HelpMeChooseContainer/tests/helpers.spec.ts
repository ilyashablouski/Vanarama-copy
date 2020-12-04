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
        leaseType: { active: false, value: 'Personal' as any },
        fuelTypes: { active: false, value: [] },
        transmissions: { active: false, value: [] },
      });
      expect(router.replace).toBeCalledWith(
        {
          pathname: router.route,
          query: {
            leaseType: 'Personal',
          },
        },
        '/help-me-choose/?leaseType=Personal',
        { shallow: true },
      );
    });
  });
});
