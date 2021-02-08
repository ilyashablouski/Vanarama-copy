import {
  getUniqueCriterias,
  getValuesByCriteria,
  getHeading,
  getPrice,
  getCriterials,
  getVehiclesIds,
} from '../comparatorTableHelpers';

describe('comparatorTableHelpers', () => {
  describe('getUniqueCriterias', () => {
    it('getUniqueCriterias should return array with item', () => {
      const actual = getUniqueCriterias({
        vehicleComparator: [{ data: [{ name: 'name' }] }],
      } as any);

      expect(actual).toEqual(['name']);
    });
  });

  describe('getValuesByCriteria', () => {
    it('getValuesByCriteria should empty array', () => {
      const actual = getValuesByCriteria('', {
        vehicleComparator: [{ data: [{ name: 'name' }] }],
      } as any);
      expect(actual).toEqual(['']);
    });
    it('getValuesByCriteria should new array with object', () => {
      const actual = getValuesByCriteria('name', {
        vehicleComparator: [
          { data: [{ name: 'name', value: { name: 'name' } }] },
        ],
      } as any);
      expect(actual).toEqual([{ name: 'name' }]);
    });
  });

  describe('getHeading', () => {
    it('getHeading should new object with undefined on fields', () => {
      const actual = getHeading(null);

      expect(actual).toEqual({
        title: 'Heading',
        values: undefined,
      });
    });
    it('getHeading should new object with empty empty array', () => {
      const actual = getHeading([]);

      expect(actual).toEqual({
        title: 'Heading',
        values: [],
      });
    });
    it('getHeading should new object', () => {
      const actual = getHeading([
        {
          capId: 'capId',
          manufacturerName: 'manufacturerName',
          derivativeName: 'derivativeName',
          imageUrl: 'imageUrl',
        } as any,
      ]);

      expect(actual).toEqual({
        title: 'Heading',
        values: [
          {
            capId: 'capId',
            name: 'manufacturerName',
            description: 'derivativeName',
            image: 'imageUrl',
          },
        ],
      });
    });
  });

  describe('getPrice', () => {
    it('getPrice should return null', () => {
      const actual = getPrice(null, {});

      expect(actual).toEqual(null);
    });
    it('getPrice should new object', () => {
      const actual = getPrice(
        [
          {
            capId: 'capId',
            businessRate: 'businessRate',
          } as any,
        ],
        {
          lcv: 'Business',
          car: 'Personal',
        },
      );

      expect(actual).toEqual({
        title: 'Price',
        values: [
          {
            capId: 'capId',
            price: 'businessRate',
          },
        ],
      });
    });
  });

  describe('getCriterials', () => {
    it('getCriterials should new array', () => {
      const actual = getCriterials(
        {
          vehicleComparator: [{ data: [{ name: 'name' }] }],
        } as any,
        [
          {
            capId: 'capId',
            businessRate: 'businessRate',
          } as any,
        ],
        {
          lcv: 'Business',
          car: 'Personal',
        },
      );

      expect(actual).toEqual([
        { title: 'name', values: [''] },
        {
          title: 'Heading',
          values: [{ capId: 'capId', description: '', image: '', name: '' }],
        },
        { title: 'Price', values: [{ capId: 'capId', price: 'businessRate' }] },
      ]);
    });
  });

  describe('getVehiclesIds', () => {
    it('getVehiclesIds should empty array', () => {
      const actual = getVehiclesIds([]);

      expect(actual).toEqual([]);
    });
    it('getVehiclesIds should new array', () => {
      const actual = getVehiclesIds([
        {
          capId: '124',
          businessRate: 'businessRate',
        } as any,
      ]);

      expect(actual).toEqual([
        {
          capId: 124,
          vehicleType: undefined,
        },
      ]);
    });
  });
});
