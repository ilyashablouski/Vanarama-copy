import { createOfferCards, getProductPlaceholderList } from '../helpers';

describe('createOfferCards', () => {
  it('createOfferCards should return correct array', () => {
    expect(createOfferCards(1, 2, 3)).toEqual([
      {
        header: 'Vans',
        imageSrc:
          'https://dev.vanarama-nonprod.com/Assets/images/comparator/modal/cap-51392-171678.png',
        redirect: '/van-leasing/search',
        totalCount: 1,
      },
      {
        header: 'Pickups',
        imageSrc:
          'https://dev.vanarama-nonprod.com/Assets/images/comparator/modal/cap-44067-160978.png',
        redirect: '/van-leasing/search?bodyStyles=Pickup',
        totalCount: 2,
      },
      {
        header: 'Cars',
        imageSrc:
          'https://dev.vanarama-nonprod.com/Assets/images/comparator/modal/cap-88928-161019.png',
        redirect: '/car-leasing/search',
        totalCount: 3,
      },
    ]);
  });
});

describe('getProductPlaceholderList', () => {
  it('getProductPlaceholderList should return correct array', () => {
    expect(getProductPlaceholderList(12)).toEqual([]);
  });
  it('getProductPlaceholderList should return correct array', () => {
    expect(getProductPlaceholderList(1)).toEqual([{ capId: 0 }, { capId: 1 }]);
  });
});
