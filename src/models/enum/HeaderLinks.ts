import { LinkTypes } from './LinkTypes';

export const PHONE_NUMBER_LINK = {
  href: 'tel:01442838195',
  label: '01442 838195',
  linkType: LinkTypes.external,
};

export const TOP_BAR_LINKS = [
  { label: 'Vans', href: '/hub/vans/' },
  {
    label: 'Pickup',
    href: '/hub/pickups',
    children: [],
  },
  {
    label: 'Cars',
    href: '/hub/cars',
    children: [],
  },
  {
    label: 'Insurance',
    href: '/van-insurance/',
    children: [],
  },
  {
    label: 'More',
    href: '#',
    children: [],
  },
];
