import { LinkTypes } from './LinkTypes';

export const PHONE_NUMBER_LINK = {
  href: 'tel:01442838195',
  label: '01442 838195',
  linkType: LinkTypes.external,
};

export const FLEET_PHONE_NUMBER_LINK = {
  href: 'tel:01442507645',
  label: '01442 507645',
  linkType: LinkTypes.external,
};

export const TOP_BAR_LINKS = [
  {
    label: 'Offers',
    href: '/van-leasing/',
    highlight: true,
    id: '98bb3f76-0126-4448-aae2-f54476b3f887',
  },
  {
    label: 'Vans',
    href: '/hub/vans',
    children: [
      {
        label: 'VANS Special Offers',
        href: '',
        highlight: true,
        id: '162c3136-cd80-469b-a690-6806ad22c6a4',
      },
      {
        label: 'Vans By Manufacturer',
        href: '',
        children: [
          {
            label: 'Citroen',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/van-leasing/Citroen',
          },
          {
            label: 'Ford',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/van-leasing/Ford',
          },
          {
            label: 'Benz',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/van-leasing/Benz',
          },
          {
            label: 'Nissan',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/van-leasing/Nissan',
          },
          {
            label: 'Renault',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/van-leasing/Renault',
          },
          {
            label: 'Vauxhall',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/van-leasing/Vauxhall',
          },
          {
            label: 'Fiat',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/van-leasing/Fiat',
          },
          {
            label: 'Isuzu',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/van-leasing/Isuzu',
          },
          {
            label: 'Mitsubishi',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/van-leasing/Mitsubishi',
          },
          {
            label: 'Peugeot',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/van-leasing/Peugeot',
          },
          {
            label: 'Toyota',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/van-leasing/Toyota',
          },
          {
            label: 'Volkswagen',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/van-leasing/Volkswagen',
          },
        ],
        id: 'b21cfa5d-e57f-4d7e-867f-4a1870cfb879',
      },
      {
        label: 'Vans By Size',
        href: '',
        children: [
          {
            label: 'Small',
            href: '/van-leasing',
            as: '/van-leasing?bodyStyles=Small Van',
            query: {
              bodyStyles: 'Small Van',
              isChangePage: 'true',
            },
          },
          {
            label: 'Medium',
            href: '/van-leasing',
            as: '/van-leasing?bodyStyles=Medium Van',
            query: {
              bodyStyles: 'Medium Vam',
              isChangePage: 'true',
            },
          },
          {
            label: 'Large',
            href: '/van-leasing',
            as: '/van-leasing?bodyStyles=Large Van',
            query: {
              bodyStyles: 'Large Van',
              isChangePage: 'true',
            },
          },
        ],
        id: '43df3e0b-f248-457d-bf3c-ec1fe4def7e3',
      },
      {
        label: 'Vans By Type',
        href: '',
        children: [
          {
            label: 'Refrigerated',
            href: '/van-leasing',
            as: '/van-leasing?bodyStyles=Refrigerated Van',
            query: {
              bodyStyles: 'Refrigerated Van',
              isChangePage: 'true',
            },
          },
          {
            label: 'Tippers/Lutons',
            as: '/van-leasing?bodyStyles=Dropside Tipper,Luton Box Van',
            href: '/van-leasing',
            query: {
              bodyStyles: ['Dropside Tipper', 'Luton Box Van'],
              isChangePage: 'true',
            },
          },
          {
            label: 'Crew/Minibus',
            href: '/van-leasing',
            as: '/van-leasing?bodyStyles=Minibus',
            query: {
              bodyStyles: 'Minibus',
              isChangePage: 'true',
            },
          },
          {
            label: 'Specialist',
            as: '/van-leasing?bodyStyles=Specialist',
            href: '/van-leasing',
            query: {
              bodyStyles: 'Specialist',
              isChangePage: 'true',
            },
          },
        ],
        id: '44c0f32b-f034-4b84-ac49-0c2b76140c96',
      },
      {
        label: 'Van Leasing Explained',
        href: '/van-leasing/finance-options',
        id: 'f601c25c-4529-43e3-abaf-8d9fbf0af941',
      },
    ],
    id: '0422f873-0ae6-4fe0-961f-7a40b7073281',
  },
  {
    label: 'Pickups',
    href: '/hub/pickups',
    children: [
      {
        label: 'Pickups Special offers',
        href: '/pickup-truck-leasing/special-offers',
        highlight: true,
        id: 'b7b2b49e-ee30-4ad5-93f7-b367d8c6d0ae',
      },
      {
        label: 'Pickups By Manufacturer',
        href: '',
        children: [
          {
            label: 'Citroen',
            href: '/van-leasing/[dynamicParam]',
            query: {
              isChangePage: 'true',
              bodyStyles: 'Pickup',
            },
            as: '/van-leasing/Citroen?bodyStyles=Pickup',
          },
          {
            label: 'Ford',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true', bodyStyles: 'Pickup' },
            as: '/van-leasing/Ford?bodyStyles=Pickup',
          },
          {
            label: 'Benz',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true', bodyStyles: 'Pickup' },
            as: '/van-leasing/Benz?bodyStyles=Pickup',
          },
          {
            label: 'Nissan',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true', bodyStyles: 'Pickup' },
            as: '/van-leasing/Nissan?bodyStyles=Pickup',
          },
          {
            label: 'Renault',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true', bodyStyles: 'Pickup' },
            as: '/van-leasing/Renault?bodyStyles=Pickup',
          },
          {
            label: 'Vauxhall',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true', bodyStyles: 'Pickup' },
            as: '/van-leasing/Vauxhall?bodyStyles=Pickup',
          },
          {
            label: 'Fiat',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true', bodyStyles: 'Pickup' },
            as: '/van-leasing/Fiat?bodyStyles=Pickup',
          },
          {
            label: 'Isuzu',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true', bodyStyles: 'Pickup' },
            as: '/van-leasing/Isuzu?bodyStyles=Pickup',
          },
          {
            label: 'Mitsubishi',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true', bodyStyles: 'Pickup' },
            as: '/van-leasing/Mitsubishi?bodyStyles=Pickup',
          },
          {
            label: 'Peugeot',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true', bodyStyles: 'Pickup' },
            as: '/van-leasing/Peugeot?bodyStyles=Pickup',
          },
          {
            label: 'Toyota',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true', bodyStyles: 'Pickup' },
            as: '/van-leasing/Toyota?bodyStyles=Pickup',
          },
          {
            label: 'Volkswagen',
            href: '/van-leasing/[dynamicParam]',
            query: { isChangePage: 'true', bodyStyles: 'Pickup' },
            as: '/van-leasing/Volkswagen?bodyStyles=Pickup',
          },
        ],
        id: 'ea7b59db-5f3e-40a2-9fab-e0567515a88c',
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
        id: '5e0d3e95-5264-4f8f-bb95-c231794cc6b2',
      },
    ],
    id: 'c5ce53d2-fb0a-42c7-bd8b-8e60d351fee3',
  },
  {
    label: 'Cars',
    href: '/hub/cars',
    children: [
      {
        label: 'Car Special Offers',
        href: '/car-leasing/special-offers',
        highlight: true,
        id: '831f7a18-d3f8-4019-9ddd-e54fbe9f6af7',
      },
      {
        label: 'Cars By Manufacturer',
        href: '',
        children: [
          {
            label: 'Audi',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Audi',
          },
          {
            label: 'BMW',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/BMW',
          },
          {
            label: 'Ford',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Ford',
          },
          {
            label: 'Hyundai',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Hyundai',
          },
          {
            label: 'Jaguar',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Jaguar',
          },
          {
            label: 'Kia',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Kia',
          },
          {
            label: 'Land Rover',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Land Rover',
          },
          {
            label: 'Mercedes-Benz',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Mercedes-Benz',
          },
          {
            label: 'Mini',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Mini',
          },
          {
            label: 'Nissan',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Nissan',
          },
          {
            label: 'Peugeot',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Peugeot',
          },
          {
            label: 'Seat',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Seat',
          },
          {
            label: 'Skoda',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Skoda',
          },
          {
            label: 'Smart',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Smart',
          },
          {
            label: 'Tesla',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Tesla',
          },
          {
            label: 'Toyota',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Toyota',
          },
          {
            label: 'Vauxhall',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Vauxhall',
          },
          {
            label: 'Volkswagen',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Volkswagen',
          },
          {
            label: 'Volvo',
            href: '/car-leasing/[dynamicParam]',
            query: { isChangePage: 'true' },
            as: '/car-leasing/Volvo',
          },
          {
            label: 'View All',
            href: '/car-leasing/all-car-manufacturers',
          },
        ],
        id: 'ffd8b86a-9234-4d40-bfa8-085ce9807133',
      },
      {
        label: 'Cars By BodyStyle',
        href: '',
        children: [
          {
            label: '4x4/SUV',
            href: '/car-leasing',
            as: '/car-leasing?bodyStyles=4x4',
            query: {
              bodyStyles: '4x4',
              isChangePage: 'true',
            },
          },
          {
            label: 'Coupe',
            href: '/car-leasing',
            as: '/car-leasing?bodyStyles=Coupe',
            query: {
              bodyStyles: 'Coupe',
              isChangePage: 'true',
            },
          },
          {
            label: 'Estate',
            href: '/car-leasing',
            as: '/car-leasing?bodyStyles=Estate',
            query: {
              bodyStyles: 'Estate',
              isChangePage: 'true',
            },
          },
          {
            label: 'Hatchback',
            href: '/car-leasing',
            as: '/car-leasing?bodyStyles=Hatchback',
            query: {
              bodyStyles: 'Hatchback',
              isChangePage: 'true',
            },
          },
          {
            label: 'Prestige',
            href: '/car-leasing',
            as: '/car-leasing?bodyStyles=Prestige',
            query: {
              bodyStyles: 'Prestige',
              isChangePage: 'true',
            },
          },
          {
            label: 'Small',
            href: '/car-leasing',
            as: '/car-leasing?bodyStyles=Small',
            query: {
              bodyStyles: 'Small',
              isChangePage: 'true',
            },
          },
          {
            label: 'Convertible',
            href: '/car-leasing',
            as: '/car-leasing?bodyStyles=Convertible',
            query: {
              bodyStyles: 'Convertible',
              isChangePage: 'true',
            },
          },
          {
            label: 'Eco',
            href: '/car-leasing',
            as: '/car-leasing?bodyStyles=Eco',
            query: {
              bodyStyles: 'Eco',
              isChangePage: 'true',
            },
          },
          {
            label: 'Family',
            href: '/car-leasing',
            as: '/car-leasing?bodyStyles=Family',
            query: {
              bodyStyles: 'Family',
              isChangePage: 'true',
            },
          },
          {
            label: 'People Carrier',
            href: '/car-leasing',
            as: '/car-leasing?bodyStyles=People Carrier',
            query: {
              bodyStyles: 'People Carrier',
              isChangePage: 'true',
            },
          },
          {
            label: 'Saloon',
            href: '/car-leasing',
            as: '/car-leasing?bodyStyles=Saloon',
            query: {
              bodyStyles: 'Saloon',
              isChangePage: 'true',
            },
          },
          {
            label: 'View All',
            href: '/car-leasing/search',
          },
        ],
        id: '666d9983-41e9-45e4-9a5d-64d184526ff7',
      },
      {
        label: 'Car Leasing Explained',
        href: '/car-leasing/finance-options',
        id: 'f601c25c-4529-43e3-abaf-8d9fbf0af941',
      },
    ],
    id: 'bcbe1020-8d08-4c8d-81e5-f1fc0ae0fdbe',
  },
  {
    label: 'Insurance',
    href: '/van-insurance/',
    children: [
      {
        label: 'Multi-Year Insurance',
        href: '',
        id: '4fed6d8d-b7f4-4538-b2dd-b3352c5e5178',
      },
      {
        label: 'Finance GAP Insurance',
        href: '',
        id: '90ed2bb4-6b7b-4c8e-bb48-567b7df582b2',
      },
      {
        label: 'Tools in Transit Insurance',
        href: '',
        id: '40abd85d-0c2d-4fed-920f-660bd07e7c2a',
      },
      {
        label: '7-Day Free Insurance',
        href: '',
        id: 'e73b51b5-0b7e-4a55-9f3e-1ddc86f93c54',
      },
      {
        label: 'Short-Term Insurance',
        href: '',
        id: '7b8e80a7-b089-45f1-92c4-ad96c6f3f062',
      },
      {
        label: 'Frequently Asked Questions',
        href: '',
        id: 'c9c6fb2e-5dd3-48a8-ba6e-a47bd666e410',
      },
    ],
    id: '90f2f81f-be50-4499-8545-9db26156802e',
  },
  {
    label: 'Fleet',
    href: '/fleet/',
    children: [],
    id: 'ea4dbb42-0c82-4643-800b-a65f0762b245',
  },
  {
    label: 'News',
    href: '/van-insurance/',
    children: [],
    id: '14cbae26-9812-4550-8c28-d769c3d53c14',
  },
];
