import {
  getCategory,
  getCategoryAboutYouData,
  pushToDataLayer,
} from '../dataLayerHelpers';

describe('dataLayerHelpers', () => {
  describe('getCategory', () => {
    it('getCategory should return Pickup', () => {
      const actual = getCategory({ cars: false, vans: false, pickups: true });

      expect(actual).toEqual('Pickup');
    });
    it('getCategory should return Car', () => {
      const actual = getCategory({ cars: true, vans: false, pickups: false });

      expect(actual).toEqual('Car');
    });
    it('getCategory should return Van', () => {
      const actual = getCategory({ cars: false, vans: true, pickups: false });

      expect(actual).toEqual('Van');
    });
  });

  describe('getCategoryAboutYouData', () => {
    it('getCategoryAboutYouData should return Pickup', () => {
      const actual = getCategoryAboutYouData({
        bodyType: { name: 'Pick-Up' },
      } as any);

      expect(actual).toEqual('Pickup');
    });
    it('getCategoryAboutYouData should return Van', () => {
      const actual = getCategoryAboutYouData({
        bodyType: { name: 'Van' },
      } as any);

      expect(actual).toEqual('Van');
    });
  });

  describe('pushToDataLayer', () => {
    it('pushToDataLayer should push to window', () => {
      (window.dataLayer as object[]) = [
        {
          bodyType: { name: 'Pick-Up' },
        },
      ];
      pushToDataLayer({
        bodyType: { name: 'Pick-Up-test' },
      } as any);

      expect(window.dataLayer).toEqual([
        {
          bodyType: { name: 'Pick-Up' },
        },
        {
          bodyType: { name: 'Pick-Up-test' },
        },
      ]);
    });
  });
});
