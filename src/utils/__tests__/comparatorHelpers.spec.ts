import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  changeCompares,
  isCorrectCompareType,
  deleteCompare,
  getCompares,
  getVehiclesForComparator,
  isCompared,
} from '../comparatorHelpers';

describe('comparatorHelpers', () => {
  describe('changeCompares', () => {
    it('changeCompares should return promise', () => {
      jest.mock('localforage', () => ({
        getItem: null,
        setItem: jest.fn(),
      }));

      const actual = changeCompares({ capId: 'capId' } as any);

      expect(actual).toEqual(new Promise(() => []));
    });
  });
  describe('isCorrectCompareType', () => {
    it('isCorrectCompareType should return false', () => {
      let actual = isCorrectCompareType();
      expect(actual).toEqual(false);

      actual = isCorrectCompareType(null, null);
      expect(actual).toEqual(false);

      actual = isCorrectCompareType(
        { vehicleType: VehicleTypeEnum.LCV, bodyStyle: 'bodyStyle' } as any,
        [
          {
            vehicleType: VehicleTypeEnum.CAR,
            bodyStyle: 'bodyStyle',
          } as any,
        ],
      );
      expect(actual).toEqual(false);

      actual = isCorrectCompareType(
        { vehicleType: VehicleTypeEnum.CAR, bodyStyle: 'bodyStyle' } as any,
        [
          {
            vehicleType: VehicleTypeEnum.LCV,
            bodyStyle: 'bodyStyle',
          } as any,
        ],
      );
      expect(actual).toEqual(false);
    });
    it('isCorrectCompareType should return true', () => {
      const actual = isCorrectCompareType(
        { vehicleType: VehicleTypeEnum.CAR, bodyStyle: 'bodyStyle' } as any,
        [
          {
            vehicleType: VehicleTypeEnum.LCV,
            bodyStyle: 'Pickup',
          } as any,
        ],
      );
      expect(actual).toEqual(true);
    });
  });
  describe('deleteCompare', () => {
    it('deleteCompare should return promise', () => {
      jest.mock('localforage', () => ({
        getItem: null,
      }));

      const actual = deleteCompare({ capId: 'capId' } as any);

      expect(actual).toEqual(new Promise(() => []));
    });
  });
  describe('getCompares', () => {
    it('getCompares should return promise', () => {
      jest.mock('localforage', () => ({
        getItem: jest.fn(),
      }));

      const actual = getCompares();

      expect(actual).toEqual(new Promise(() => {}));
    });
  });
  describe('getVehiclesForComparator', () => {
    it('getVehiclesForComparator should return new array', () => {
      const actual = getVehiclesForComparator([
        {
          capId: 'capId',
          derivativeName: 'derivativeName',
          manufacturerName: 'manufacturerName',
          rangeName: 'rangeName',
        } as any,
      ]);

      expect(actual).toEqual([
        {
          capId: 'capId',
          derivativeName: 'derivativeName',
          manufacturerName: 'manufacturerName',
          rangeName: 'rangeName',
        },
      ]);
    });
  });

  describe('isCompared', () => {
    it('isCompared should return undefined if arguments equal null', () => {
      const actual = isCompared(null, null);

      expect(actual).toEqual(undefined);
    });
    it('isCompared should return true if compareVehicles item capId equal product capId', () => {
      const actual = isCompared(
        [{ capId: 'capId_1' }, { capId: 'capId' } as any],
        {
          capId: 'capId',
        } as any,
      );

      expect(actual).toEqual(true);
    });
    it('isCompared should return false if compareVehicles item capId equal product capId', () => {
      const actual = isCompared(
        [{ capId: 'capId_1' }, { capId: 'capId' } as any],
        {
          capId: 'capId_2',
        } as any,
      );

      expect(actual).toEqual(false);
    });
  });
});
