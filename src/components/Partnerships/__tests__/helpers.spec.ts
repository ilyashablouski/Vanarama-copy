import { getPartnershipLinks } from '../helpers';

describe('Get partnership links', () => {
  const vehicleTypes = ['Cars', 'Vans'];
  const actual = getPartnershipLinks(vehicleTypes);
  const expected = [
    {
      href: 'car-leasing/search',
      id: 'car-leasing/search',
      label: 'CARS',
    },
    {
      href: 'van-leasing/search',
      id: 'van-leasing/search',
      label: 'VANS',
    },
  ]
  it('renders successfully', () => {
    expect(actual).toEqual(expected);
  });
});
