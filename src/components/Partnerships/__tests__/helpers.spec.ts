import { VehiclesTypeEnum } from '../../../../entities/global';
import { getPartnershipLinks } from '../helpers';

describe(getPartnershipLinks, () => {
  const vehicleTypes = ['Cars', 'Vans'];
  const actual = getPartnershipLinks(vehicleTypes);
  const expected = [
    {
      href: 'car-leasing/search',
      id: 'car-leasing/search',
      label: VehiclesTypeEnum.CARS,
    },
    {
      href: 'van-leasing/search',
      id: 'van-leasing/search',
      label: VehiclesTypeEnum.VANS,
    },
  ];
  it('should return partnership links based on vehicleType array', () => {
    expect(actual).toEqual(expected);
  });
});
