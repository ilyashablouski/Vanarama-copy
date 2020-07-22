import { LinkTypes } from './LinkTypes';

export const PHONE_NUMBER_LINK = {
  href: 'tel:01442838195',
  label: '01442 838195',
  linkType: LinkTypes.external,
};

export const TOP_BAR_LINKS = [
  { label: 'Offers', href: '/van-leasing/', highlight: true },
  {
    label: 'Vans',
    href: '/van-leasing/',
    children: [
      {
        label: 'VANS Special Offers',
        href: '',
        highlight: true,
      },
      {
        label: 'Vans By Manufacturer',
        href: '',
        children: [
          {
            label: 'Citroen',
            href: '/van-leasing/citroen',
          },
          {
            label: 'Ford',
            href: '/van-leasing/ford',
          },
          {
            label: 'Benz',
            href: '/van-leasing/benz',
          },
          {
            label: 'Nissan',
            href: '/van-leasing/nissan',
          },
          {
            label: 'Renault',
            href: '/van-leasing/renault',
          },
          {
            label: 'Vauxhall',
            href: '/van-leasing/vauxhall',
          },
          {
            label: 'Fiat',
            href: '/van-leasing/fiat',
          },
          {
            label: 'Isuzu',
            href: '/van-leasing/isuzu',
          },
          {
            label: 'Mitsubishi',
            href: '/van-leasing/mitsubishi',
          },
          {
            label: 'Peugeot',
            href: '/van-leasing/peugeot',
          },
          {
            label: 'Toyota',
            href: '/van-leasing/toyota',
          },
          {
            label: 'Volkswagen',
            href: '/van-leasing/volkswagen',
          },
        ],
      },
      {
        label: 'Vans By Size',
        href: '',
        children: [
          {
            label: 'Small',
            href: '/van-leasing',
          },
          {
            label: 'Medium',
            href: '/van-leasing',
          },
          {
            label: 'Large',
            href: '/van-leasing',
          },
        ],
      },
      {
        label: 'Vans By Type',
        href: '',
        children: [
          {
            label: 'Refrigerated',
            href: '/van-leasing',
          },
          {
            label: 'Tippers/Lutons',
            href: '/van-leasing',
          },
          {
            label: 'Crew/Minibus',
            href: '/van-leasing',
          },
          {
            label: 'Specialist',
            href: '/van-leasing',
          },
        ],
      },
    ],
  },
  {
    label: 'Pickup',
    href: '/van-leasing?bodyStyles=Pickup',
    children: [
      {
        label: 'Pickups Special offers',
        href: '',
        highlight: true,
      },
      {
        label: 'Pickups By Manufacturer',
        href: '',
        children: [
          {
            label: 'Citroen',
            href: '/van-leasing/citroen?bodyStyles=Pickup',
          },
          {
            label: 'Ford',
            href: '/van-leasing/ford?bodyStyles=Pickup',
          },
          {
            label: 'Benz',
            href: '/van-leasing/benz?bodyStyles=Pickup',
          },
          {
            label: 'Nissan',
            href: '/van-leasing/nissan?bodyStyles=Pickup',
          },
          {
            label: 'Renault',
            href: '/van-leasing/renault?bodyStyles=Pickup',
          },
          {
            label: 'Vauxhall',
            href: '/van-leasing/vauxhall?bodyStyles=Pickup',
          },
          {
            label: 'Fiat',
            href: '/van-leasing/fiat?bodyStyles=Pickup',
          },
          {
            label: 'Isuzu',
            href: '/van-leasing/isuzu?bodyStyles=Pickup',
          },
          {
            label: 'Mitsubishi',
            href: '/van-leasing/mitsubishi?bodyStyles=Pickup',
          },
          {
            label: 'Peugeot',
            href: '/van-leasing/peugeot?bodyStyles=Pickup',
          },
          {
            label: 'Toyota',
            href: '/van-leasing/toyota?bodyStyles=Pickup',
          },
          {
            label: 'Volkswagen',
            href: '/van-leasing/volkswagen?bodyStyles=Pickup',
          },
        ],
      },
      {
        label: 'Best Selling',
        href: '',
        children: [
          {
            label: 'Ford Ranger Wildtrack',
            href:
              '/van-leasing/ford/ranger/pick-up-double-cab-wildtrak-3-2-ecoblue-200-auto',
          },
          {
            label: 'Nissan Navara Tekna Auto',
            href:
              '/van-leasing/nissan/navara/double-cab-pick-up-tekna-2-3dci-190-tt-4wd-auto',
          },
          {
            label: 'Toyota Hilux Invincible X Auto',
            href:
              '/van-leasing/toyota/hilux/invincible-x-d/cab-pick-up-2-4-d-4d-auto',
          },
          {
            label: 'Mitsubishi L200 Barbarian Auto',
            href:
              '/van-leasing/mitsubishi/l200/double-cab-di-d-150-barbarian-4wd-auto',
          },
        ],
      },
    ],
  },
  {
    label: 'Cars',
    href: '/car-leasing/',
    children: [
      {
        label: 'Car Special Offers',
        href: '',
        highlight: true,
      },
      {
        label: 'Cars By Manufacturer',
        href: '',
        children: [
          {
            label: 'Audi',
            href: '/car-leasing/',
          },
          {
            label: 'BMW',
            href: '/car-leasing/',
          },
          {
            label: 'Ford',
            href: '/car-leasing/',
          },
          {
            label: 'Hyundai',
            href: '/car-leasing/',
          },
          {
            label: 'Jaguar',
            href: '/car-leasing/',
          },
          {
            label: 'Kia',
            href: '/car-leasing/',
          },
          {
            label: 'Land Rover',
            href: '/car-leasing/',
          },
          {
            label: 'Mercedes-Benz',
            href: '/car-leasing/',
          },
          {
            label: 'Mini',
            href: '/car-leasing/',
          },
          {
            label: 'Nissan',
            href: '/car-leasing/',
          },
          {
            label: 'Peugeot',
            href: '/car-leasing/',
          },
          {
            label: 'Seat',
            href: '/car-leasing/',
          },
          {
            label: 'Shkoda',
            href: '/car-leasing/',
          },
          {
            label: 'Smart',
            href: '/car-leasing/',
          },
          {
            label: 'Tesla',
            href: '/car-leasing/',
          },
          {
            label: 'Toyota',
            href: '/car-leasing/',
          },
          {
            label: 'Vauxhall',
            href: '/car-leasing/',
          },
          {
            label: 'Volkswagen',
            href: '/car-leasing/',
          },
          {
            label: 'Volvo',
            href: '/car-leasing/',
          },
          {
            label: 'View All',
            href: '/car-leasing/',
          },
        ],
      },
      {
        label: 'Cars By BodyStyle',
        href: '',
        children: [
          {
            label: '4x4/SUV',
            href: '/car-leasing?bodyStyle=4x4,suv',
          },
          {
            label: 'Coupe',
            href: '/car-leasing/?bodyStyle=coupe',
          },
          {
            label: 'Estate',
            href: '/car-leasing/?bodyStyle=estate',
          },
          {
            label: 'Hatchback',
            href: '/car-leasing/?bodyStyle=hatchback',
          },
          {
            label: 'Prestige',
            href: '/car-leasing/?bodyStyle=prestige',
          },
          {
            label: 'Small',
            href: '/car-leasing/?bodyStyle=small',
          },
          {
            label: 'Convertible',
            href: '/car-leasing/?bodyStyle=convertible',
          },
          {
            label: 'Eco',
            href: '/car-leasing/?bodyStyle=eco',
          },
          {
            label: 'Family',
            href: '/car-leasing/?bodyStyle=family',
          },
          {
            label: 'People Carrier',
            href: '/car-leasing/?bodyStyle=peopleCarrier',
          },
          {
            label: 'Saloon',
            href: '/car-leasing/?bodyStyle=saloon',
          },
          {
            label: 'View All',
            href: '/car-leasing',
          },
        ],
      },
    ],
  },
  {
    label: 'Insurance',
    href: '/van-insurance/',
    children: [
      {
        label: 'Multi-Year Insurance',
        href: '',
      },
      {
        label: 'Finance GAP Insurance',
        href: '',
      },
      {
        label: 'Tools in Transit Insurance',
        href: '',
      },
      {
        label: '7-Day Free Insurance',
        href: '',
      },
      {
        label: 'Short-Term Insurance',
        href: '',
      },
      {
        label: 'Frequently Asked Questions',
        href: '',
      },
    ],
  },
  {
    label: 'Fleet',
    href: '/van-insurance/',
    children: [],
  },
  {
    label: 'News',
    href: '/van-insurance/',
    children: [],
  },
];
