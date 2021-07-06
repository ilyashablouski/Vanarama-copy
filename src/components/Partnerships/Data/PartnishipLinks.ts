import { VehiclesTypeEnum } from '../../../../entities/global';

// eslint-disable-next-line import/prefer-default-export
export const PartnershipsLinks = [
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
  {
    href: 'van-leasing/search?bodyStyles=Pickup',
    id: 'van-leasing/search?bodyStyles=Pickup',
    label: VehiclesTypeEnum.PICKUPS,
  },
];
