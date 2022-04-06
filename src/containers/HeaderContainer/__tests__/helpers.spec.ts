import {
  convertPromoImageLink,
  convertChildrenNavLink,
  getTopLinks,
} from '../helpers';

describe('convertChildrenNavLink', () => {
  it('convertChildrenNavLink should return correct array', () => {
    expect(
      convertChildrenNavLink({
        text: 'Vans Home',
        url: '/van-leasing.html',
        label: null,
      }),
    ).toEqual({
      as: '/van-leasing.html',
      href: '/van-leasing.html',
      id: '/van-leasing.html',
      label: 'Vans Home',
      query: { isChangePage: 'true' },
    });
  });
});

describe('convertPromotionalImage', () => {
  it('convertPromotionalImage should return correct array', () => {
    expect(
      convertPromoImageLink({
        url: '/ford-van-leasing/transit-custom',
        legacyUrl: '/peugeot-van-leasing/expert.html',
        image: [
          {
            file: {
              url:
                '//images.ctfassets.net/3xid768u5joa/6UiNASqKZlW2q22VdDEDFs/9f655ce3676c53e847bb2800b72de532/800x800_Vans_Optimised.jpg',
              fileName: '800x800_Vans_Optimised.jpg',
              details: {
                image: {
                  width: 100,
                  height: 100,
                },
              },
            },
          },
        ],
      }),
    ).toEqual({
      image: {
        width: 100,
        height: 100,
        fileName: '800x800_Vans_Optimised.jpg',
        url:
          '//images.ctfassets.net/3xid768u5joa/6UiNASqKZlW2q22VdDEDFs/9f655ce3676c53e847bb2800b72de532/800x800_Vans_Optimised.jpg',
      },
      url: '/peugeot-van-leasing/expert.html',
    });
  });
});

describe('getTopLinks', () => {
  const linkGroups = [
    {
      name: 'VANS',
      body: null,
      promotionalImages: [
        {
          url: 'https://www.vanarama.com/special-offers.html',
          legacyUrl: '/special-offers.html',
          image: [
            {
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/4lBOkjs2PorakwMFgccJLu/32e9b8b76735c5ab280c64661eca2b9c/800x800-Vans.jpg',
                fileName: '800x800-Vans.jpg',
                details: {
                  image: {
                    width: 800,
                    height: 800,
                  },
                },
              },
            },
          ],
        },
      ],
      links: [
        {
          text: 'Vans Home',
          url: '/van-leasing.html',
          label: null,
        },
        {
          text: 'VAN HOT OFFERS',
          url: '/special-offers.html',
          label: null,
        },
        {
          text: 'Van Leasing Explained',
          url: '/guides/van-leasing-explained',
          label: null,
        },
        {
          text: 'Van Finance',
          url: '/finance-info/van-finance-options.html',
          label: null,
        },
        {
          text: 'Van & Pickup News',
          url: '/blog/vans',
          label: null,
        },
        {
          text: 'Deranged',
          url: '/deranged-vehicles.html',
          label: null,
        },
        {
          text: 'View All Vans',
          url: '/van-leasing/search',
          label: null,
        },
      ],
      linkGroups: [
        {
          name: 'Vans By Manufacturer',
          links: [
            {
              text: 'Citroen',
              url: '/citroen-van-leasing.html',
              label: null,
            },
            {
              text: 'Fiat',
              url: '/fiat-van-leasing.html',
              label: null,
            },
            {
              text: 'Ford',
              url: '/ford-van-leasing.html',
              label: null,
            },
            {
              text: 'Isuzu',
              url: '/isuzu-van-leasing.html',
              label: null,
            },
            {
              text: 'LEVC',
              url: '/levc-van-leasing.html',
              label: null,
            },
            {
              text: 'Maxus',
              url: '/maxus-van-leasing.html',
              label: null,
            },
            {
              text: 'Mercedes-Benz',
              url: '/mercedes-benz-van-leasing.html',
              label: null,
            },
            {
              text: 'Nissan',
              url: '/nissan-van-leasing.html',
              label: null,
            },
            {
              text: 'Peugeot',
              url: '/peugeot-van-leasing.html',
              label: null,
            },
            {
              text: 'Renault',
              url: '/renault-van-leasing.html',
              label: null,
            },
            {
              text: 'Toyota',
              url: '/toyota-van-leasing.html',
              label: null,
            },
            {
              text: 'Vauxhall',
              url: '/vauxhall-van-leasing.html',
              label: null,
            },
            {
              text: 'Volkswagen',
              url: '/volkswagen-van-leasing.html',
              label: null,
            },
          ],
          promotionalImage: {
            url: null,
            legacyUrl: null,
            image: [null],
          },
        },
        {
          name: 'Vans By Size',
          links: [
            {
              text: 'Small',
              url: '/small-van-leasing.html',
              label: null,
            },
            {
              text: 'Medium',
              url: '/medium-van-leasing.html',
              label: null,
            },
            {
              text: 'Large',
              url: '/large-van-leasing.html',
              label: null,
            },
          ],
          promotionalImage: {
            url: null,
            legacyUrl: null,
            image: [null],
          },
        },
        {
          name: 'Vans By Type',
          links: [
            {
              text: 'Refrigerated',
              url: '/refrigerated-van-leasing.html',
              label: null,
            },
            {
              text: 'Tippers/Lutons',
              url: '/dropside-tipper-leasing.html',
              label: null,
            },
            {
              text: 'Crew/Minibus',
              url: '/crew-vans.html',
              label: null,
            },
            {
              text: 'Automatic',
              url: '/automatic-vans.html',
              label: null,
            },
            {
              text: 'Electric/Hybrid',
              url: '/van-leasing/electric',
              label: null,
            },
          ],
          promotionalImage: {
            url: null,
            legacyUrl: null,
            image: [null],
          },
        },
        {
          name: 'Vans By Budget',
          links: [
            {
              text: '£150 And Under',
              url: '/van-leasing/deals-under-150',
              label: null,
            },
            {
              text: '£150-£250',
              url: '/van-leasing/deals-150-250',
              label: null,
            },
            {
              text: '£250-£350',
              url: '/van-leasing/deals-250-350',
              label: null,
            },
            {
              text: '£350-£450',
              url: '/van-leasing/deals-350-450',
              label: null,
            },
          ],
          promotionalImage: {
            url: null,
            legacyUrl: null,
            image: [null],
          },
        },
      ],
    },
    {
      name: 'PICKUPS',
      body: null,
      promotionalImages: [
        {
          url: 'https://www.vanarama.com/pickup-special-offers.html',
          legacyUrl: '/pickup-special-offers.html',
          image: [
            {
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/4BrHhrNLc7xk2VfWG5EDZk/2b66cf34e93976914119407a45d0f0aa/800x800-Pickups.jpg',
                fileName: '800x800-Pickups.jpg',
                details: {
                  image: {
                    width: 800,
                    height: 800,
                  },
                },
              },
            },
          ],
        },
      ],
      links: [
        {
          text: 'Pickups Home',
          url: '/pickup-truck-leasing.html',
          label: null,
        },
        {
          text: 'PICKUP HOT OFFERS',
          url: '/pickup-special-offers.html',
          label: null,
        },
        {
          text: 'Van & Pickup News',
          url: '/blog/vans',
          label: null,
        },
        {
          text: 'Deranged',
          url: '/deranged-vehicles.html',
          label: null,
        },
        {
          text: 'View All Pickups',
          url: '/van-leasing/search?bodyStyles=Pickup',
          label: null,
        },
      ],
      linkGroups: [
        {
          name: 'Pickups By Manufacturer',
          links: [
            {
              text: 'Ford',
              url: '/ford-van-leasing/ranger.html',
              label: null,
            },
            {
              text: 'Nissan',
              url: '/nissan-van-leasing/navara.html',
              label: null,
            },
            {
              text: 'Isuzu',
              url: '/isuzu-van-leasing.html',
              label: null,
            },
            {
              text: 'SsangYong',
              url: 'https://www.vanarama.com/ssangyong-van-leasing/musso.html',
              label: null,
            },
            {
              text: 'Toyota',
              url: '/toyota-van-leasing/hilux.html',
              label: null,
            },
          ],
          promotionalImage: {
            url: null,
            legacyUrl: null,
            image: [null],
          },
        },
        {
          name: 'Bestselling',
          links: [
            {
              text: 'Ford Ranger Double Cab Wildtrak',
              url:
                '/ford-van-leasing/ranger/pick-up-double-cab-wildtrak-2-0-ecoblue-213-auto-9948.html',
              label: null,
            },
          ],
          promotionalImage: {
            url: null,
            legacyUrl: null,
            image: [null],
          },
        },
      ],
    },
    {
      name: 'CARS',
      body: null,
      promotionalImages: [
        {
          url: 'https://www.vanarama.com/car-leasing-special-offers.html',
          legacyUrl: '/car-leasing-special-offers.html',
          image: [
            {
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/3XvhAzTo3oCAhf9EHvyeWA/b6942fe9bfff852e56773fbaa2b52a12/800x800-Cars.jpg',
                fileName: '800x800-Cars.jpg',
                details: {
                  image: {
                    width: 800,
                    height: 800,
                  },
                },
              },
            },
          ],
        },
      ],
      links: [
        {
          text: 'Cars Home',
          url: '/car-leasing.html',
          label: null,
        },
        {
          text: 'CAR HOT OFFERS',
          url: '/car-leasing-special-offers.html',
          label: null,
        },
        {
          text: 'Help Me Choose',
          url: '/help-me-choose',
          label: 'New',
        },
        {
          text: 'Car Leasing Explained',
          url: '/guides/car-leasing-explained',
          label: null,
        },
        {
          text: 'Car Finance',
          url: '/lease-finance/cars',
          label: null,
        },
        {
          text: 'Car News',
          url: '/blog/cars',
          label: null,
        },
        {
          text: 'View All Cars',
          url: '/car-leasing/search',
          label: null,
        },
      ],
      linkGroups: [
        {
          name: 'Cars By Manufacturer',
          links: [
            {
              text: 'View All',
              url: '/car-leasing/all-car-manufacturers.html',
              label: null,
            },
            {
              text: 'Audi',
              url: '/audi-car-leasing.html',
              label: null,
            },
            {
              text: 'BMW',
              url: '/bmw-car-leasing.html',
              label: null,
            },
            {
              text: 'Citroen',
              url: '/citroen-car-leasing.html',
              label: null,
            },
            {
              text: 'Fiat',
              url: '/fiat-car-leasing.html',
              label: null,
            },
            {
              text: 'Ford',
              url: '/ford-car-leasing.html',
              label: null,
            },
            {
              text: 'Honda',
              url: '/honda-car-leasing.html',
              label: null,
            },
            {
              text: 'Hyundai',
              url: '/hyundai-car-leasing.html',
              label: null,
            },
            {
              text: 'Jaguar',
              url: '/jaguar-car-leasing.html',
              label: null,
            },
            {
              text: 'Kia',
              url: '/kia-car-leasing.html',
              label: null,
            },
            {
              text: 'Land Rover',
              url: '/car-leasing/land-rover',
              label: null,
            },
            {
              text: 'Mercedes-Benz',
              url: '/mercedesbenz-car-leasing.html',
              label: null,
            },
            {
              text: 'Mini',
              url: '/mini-car-leasing.html',
              label: null,
            },
            {
              text: 'Nissan',
              url: '/nissan-car-leasing.html',
              label: null,
            },
            {
              text: 'Peugeot',
              url: '/peugeot-car-leasing.html',
              label: null,
            },
            {
              text: 'Renault',
              url: '/renault-car-leasing.html',
              label: null,
            },
            {
              text: 'Seat',
              url: '/seat-car-leasing.html',
              label: null,
            },
            {
              text: 'Skoda',
              url: '/skoda-car-leasing.html',
              label: null,
            },
            {
              text: 'Tesla',
              url: '/tesla-car-leasing.html',
              label: null,
            },
            {
              text: 'Toyota',
              url: '/toyota-car-leasing.html',
              label: null,
            },
            {
              text: 'Vauxhall',
              url: '/vauxhall-car-leasing.html',
              label: null,
            },
            {
              text: 'Volkswagen',
              url: '/volkswagen-car-leasing.html',
              label: null,
            },
            {
              text: 'Volvo',
              url: '/volvo-car-leasing.html',
              label: null,
            },
          ],
          promotionalImage: {
            url: null,
            legacyUrl: null,
            image: [null],
          },
        },
        {
          name: 'Cars By Type',
          links: [
            {
              text: '4x4/SUV',
              url: '/car-leasing/4x4-suv.html',
              label: null,
            },
            {
              text: 'Convertible',
              url: '/car-leasing/convertible.html',
              label: null,
            },
            {
              text: 'Coupe',
              url: '/car-leasing/coupe.html',
              label: null,
            },
            {
              text: 'Electric',
              url: '/car-leasing/electric',
              label: null,
            },
            {
              text: 'Estate',
              url: '/car-leasing/estate.html',
              label: null,
            },
            {
              text: 'Hatchback',
              url: '/car-leasing/hatchback.html',
              label: null,
            },
            {
              text: 'Hybrid',
              url: '/car-leasing/hybrid',
              label: null,
            },
            {
              text: 'MPV/People Carrier',
              url: '/car-leasing/people-carrier.html',
              label: null,
            },
            {
              text: 'Saloon',
              url: '/car-leasing/saloon.html',
              label: null,
            },
            {
              text: 'Small',
              url: '/car-leasing/small.html',
              label: null,
            },
          ],
          promotionalImage: {
            url: null,
            legacyUrl: null,
            image: [null],
          },
        },
        {
          name: 'Cars By Budget',
          links: [
            {
              text: '£150 And Under',
              url: '/cars-under-150-per-month.html',
              label: null,
            },
            {
              text: '£150 - £250',
              url: '/cars-150-250-per-month.html',
              label: null,
            },
            {
              text: '£250-£350',
              url: '/cars-250-350-per-month.html',
              label: null,
            },
            {
              text: '£350-£450',
              url: '/cars-350-450-per-month.html',
              label: null,
            },
            {
              text: '£450-£550',
              url: '/cars-450-550-per-month.html',
              label: null,
            },
            {
              text: 'Above £550',
              url: '/cars-over-550-per-month.html',
              label: null,
            },
          ],
          promotionalImage: {
            url: null,
            legacyUrl: null,
            image: [null],
          },
        },
        {
          name: 'Guides & Reviews',
          links: [
            {
              text: 'How To Choose A Car',
              url: '/car-leasing/how-to-choose-a-car',
              label: null,
            },
            {
              text: 'Car Guides & Reviews',
              url: '/guides/cars',
              label: null,
            },
            {
              text: 'Electric Cars Explained',
              url: '/electric-leasing/cars/electric-cars-explained',
              label: null,
            },
            {
              text: 'Electric Guides',
              url: '/guides/electric',
              label: null,
            },
          ],
          promotionalImage: {
            url: null,
            legacyUrl: null,
            image: [null],
          },
        },
      ],
    },
    {
      name: 'ELECTRIC',
      body: null,
      promotionalImages: [
        {
          url: 'https://www.vanarama.com/car-leasing/electric',
          legacyUrl: null,
          image: [
            {
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/22mVNHPftTWdFl35kl6NeH/a4eca5d50a85244ae837bbcfc2e470b6/800x800-_Electric.jpg',
                fileName: '800x800- Electric.jpg',
                details: {
                  image: {
                    width: 800,
                    height: 800,
                  },
                },
              },
            },
          ],
        },
      ],
      links: [
        {
          text: 'Electric Home',
          url: '/electric-leasing',
          label: null,
        },
      ],
      linkGroups: [
        {
          name: 'Electric Cars',
          links: [
            {
              text: 'Electric Cars',
              url: '/electric-leasing/cars',
              label: null,
            },
            {
              text: 'Hot Offers',
              url: '/car-leasing/electric',
              label: null,
            },
            {
              text: 'Electric Cars Explained',
              url: '/electric-leasing/cars/electric-cars-explained',
              label: null,
            },
            {
              text: 'Electric Cars For Business',
              url: '/electric-leasing/cars/benefits-of-electric-for-business',
              label: null,
            },
            {
              text: 'Charging & Running Costs Explained',
              url:
                '/electric-leasing/cars/how-much-does-it-cost-charge-electric-car',
              label: null,
            },
            {
              text: 'Best Electric Cars 2022',
              url:
                'https://www.vanarama.com/electric-leasing/cars/the-best-electric-cars-in-2022',
              label: null,
            },
            {
              text: 'Electric Car Guides',
              url: '/guides/electric',
              label: null,
            },
          ],
          promotionalImage: {
            url: null,
            legacyUrl: null,
            image: [null],
          },
        },
        {
          name: 'Electric Vans',
          links: [
            {
              text: 'Electric Vans',
              url: '/electric-leasing/vans',
              label: null,
            },
            {
              text: 'Hot Offers',
              url: '/van-leasing/electric',
              label: null,
            },
            {
              text: 'Electric Vans Explained',
              url: '/electric-leasing/vans/electric-vans-explained',
              label: null,
            },
          ],
          promotionalImage: {
            url: null,
            legacyUrl: null,
            image: [null],
          },
        },
      ],
    },
    {
      name: 'INSURANCE',
      body: null,
      promotionalImages: [
        {
          url: '/van-insurance/multi-year-van-insurance',
          legacyUrl: '/van-insurance/multi-year-van-insurance.html',
          image: [
            {
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/6ISxU4CGg8qWOTNeZkqmyd/4a9c14cb4af3304335667a30bdd23bcb/800x800-Multi-YearInsurance.jpg',
                fileName: '800x800-Multi-YearInsurance.jpg',
                details: {
                  image: {
                    width: 800,
                    height: 800,
                  },
                },
              },
            },
          ],
        },
      ],
      links: [
        {
          text: 'Insurance Home',
          url: '/van-insurance.html',
          label: null,
        },
        {
          text: 'Multi Year Insurance',
          url: '/van-insurance/multi-year-van-insurance.html',
          label: null,
        },
        {
          text: 'Finance GAP Insurance',
          url: '/van-insurance/finance-gap-insurance.html',
          label: null,
        },
        {
          text: 'Tools in Transit Insurance',
          url: '/van-insurance/tools-in-transit.html',
          label: null,
        },
        {
          text: '7-Day Free Insurance',
          url: '/van-insurance/7-day-free-van-insurance.html',
          label: null,
        },
        {
          text: 'Short-Term Van Insurance',
          url: '/van-insurance/short-term-insurance.html',
          label: null,
        },
        {
          text: 'Frequently Asked Questions',
          url: '/van-insurance/faq.html',
          label: null,
        },
      ],
      linkGroups: null,
    },
    {
      name: 'FLEET',
      body: null,
      promotionalImages: null,
      links: [
        {
          text: 'Fleet',
          url: '/fleet.html',
          label: null,
        },
      ],
      linkGroups: null,
    },
    {
      name: 'NEWS',
      body: null,
      promotionalImages: null,
      links: [
        {
          text: 'News',
          url: '/blog',
          label: null,
        },
      ],
      linkGroups: null,
    },
  ];
  const mobileResult = [
    {
      href: '/van-leasing.html',
      label: 'VANS',
      id: '/van-leasing.html',
      promoImagesLinks: [
        {
          url: '/special-offers.html',
          image: {
            width: 800,
            height: 800,
            url:
              '//images.ctfassets.net/3xid768u5joa/4lBOkjs2PorakwMFgccJLu/32e9b8b76735c5ab280c64661eca2b9c/800x800-Vans.jpg',
            fileName: '800x800-Vans.jpg',
          },
        },
      ],
      children: [
        {
          href: '/van-leasing.html',
          label: 'Vans Home',
          id: '/van-leasing.html',
          highlightLabel: '',
        },
        {
          href: '/special-offers.html',
          label: 'VAN HOT OFFERS',
          id: '/special-offers.html',
          highlightLabel: '',
          highlight: true,
        },
        {
          label: 'Vans By Manufacturer',
          href: '',
          id: 'Vans By Manufacturer',
          children: [
            {
              label: 'Citroen',
              href: '/citroen-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/citroen-van-leasing.html',
              as: '/citroen-van-leasing.html',
            },
            {
              label: 'Fiat',
              href: '/fiat-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/fiat-van-leasing.html',
              as: '/fiat-van-leasing.html',
            },
            {
              label: 'Ford',
              href: '/ford-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/ford-van-leasing.html',
              as: '/ford-van-leasing.html',
            },
            {
              label: 'Isuzu',
              href: '/isuzu-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/isuzu-van-leasing.html',
              as: '/isuzu-van-leasing.html',
            },
            {
              label: 'LEVC',
              href: '/levc-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/levc-van-leasing.html',
              as: '/levc-van-leasing.html',
            },
            {
              label: 'Maxus',
              href: '/maxus-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/maxus-van-leasing.html',
              as: '/maxus-van-leasing.html',
            },
            {
              label: 'Mercedes-Benz',
              href: '/mercedes-benz-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/mercedes-benz-van-leasing.html',
              as: '/mercedes-benz-van-leasing.html',
            },
            {
              label: 'Nissan',
              href: '/nissan-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/nissan-van-leasing.html',
              as: '/nissan-van-leasing.html',
            },
            {
              label: 'Peugeot',
              href: '/peugeot-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/peugeot-van-leasing.html',
              as: '/peugeot-van-leasing.html',
            },
            {
              label: 'Renault',
              href: '/renault-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/renault-van-leasing.html',
              as: '/renault-van-leasing.html',
            },
            {
              label: 'Toyota',
              href: '/toyota-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/toyota-van-leasing.html',
              as: '/toyota-van-leasing.html',
            },
            {
              label: 'Vauxhall',
              href: '/vauxhall-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/vauxhall-van-leasing.html',
              as: '/vauxhall-van-leasing.html',
            },
            {
              label: 'Volkswagen',
              href: '/volkswagen-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/volkswagen-van-leasing.html',
              as: '/volkswagen-van-leasing.html',
            },
          ],
        },
        {
          label: 'Vans By Size',
          href: '',
          id: 'Vans By Size',
          children: [
            {
              label: 'Small',
              href: '/small-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/small-van-leasing.html',
              as: '/small-van-leasing.html',
            },
            {
              label: 'Medium',
              href: '/medium-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/medium-van-leasing.html',
              as: '/medium-van-leasing.html',
            },
            {
              label: 'Large',
              href: '/large-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/large-van-leasing.html',
              as: '/large-van-leasing.html',
            },
          ],
        },
        {
          label: 'Vans By Type',
          href: '',
          id: 'Vans By Type',
          children: [
            {
              label: 'Refrigerated',
              href: '/refrigerated-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/refrigerated-van-leasing.html',
              as: '/refrigerated-van-leasing.html',
            },
            {
              label: 'Tippers/Lutons',
              href: '/dropside-tipper-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/dropside-tipper-leasing.html',
              as: '/dropside-tipper-leasing.html',
            },
            {
              label: 'Crew/Minibus',
              href: '/crew-vans.html',
              query: {
                isChangePage: 'true',
              },
              id: '/crew-vans.html',
              as: '/crew-vans.html',
            },
            {
              label: 'Automatic',
              href: '/automatic-vans.html',
              query: {
                isChangePage: 'true',
              },
              id: '/automatic-vans.html',
              as: '/automatic-vans.html',
            },
            {
              label: 'Electric/Hybrid',
              href: '/van-leasing/electric',
              query: {
                isChangePage: 'true',
              },
              id: '/van-leasing/electric',
              as: '/van-leasing/electric',
            },
          ],
        },
        {
          label: 'Vans By Budget',
          href: '',
          id: 'Vans By Budget',
          children: [
            {
              label: '£150 And Under',
              href: '/van-leasing/deals-under-150',
              query: {
                isChangePage: 'true',
              },
              id: '/van-leasing/deals-under-150',
              as: '/van-leasing/deals-under-150',
            },
            {
              label: '£150-£250',
              href: '/van-leasing/deals-150-250',
              query: {
                isChangePage: 'true',
              },
              id: '/van-leasing/deals-150-250',
              as: '/van-leasing/deals-150-250',
            },
            {
              label: '£250-£350',
              href: '/van-leasing/deals-250-350',
              query: {
                isChangePage: 'true',
              },
              id: '/van-leasing/deals-250-350',
              as: '/van-leasing/deals-250-350',
            },
            {
              label: '£350-£450',
              href: '/van-leasing/deals-350-450',
              query: {
                isChangePage: 'true',
              },
              id: '/van-leasing/deals-350-450',
              as: '/van-leasing/deals-350-450',
            },
          ],
        },
        {
          href: '/guides/van-leasing-explained',
          label: 'Van Leasing Explained',
          id: '/guides/van-leasing-explained',
          highlightLabel: '',
        },
        {
          href: '/finance-info/van-finance-options.html',
          label: 'Van Finance',
          id: '/finance-info/van-finance-options.html',
          highlightLabel: '',
        },
        {
          href: '/blog/vans',
          label: 'Van & Pickup News',
          id: '/blog/vans',
          highlightLabel: '',
        },
        {
          href: '/deranged-vehicles.html',
          label: 'Deranged',
          id: '/deranged-vehicles.html',
          highlightLabel: '',
        },
        {
          href: '/van-leasing/search',
          label: 'View All Vans',
          id: '/van-leasing/search',
          highlightLabel: '',
        },
      ],
    },
    {
      href: '/pickup-truck-leasing.html',
      label: 'PICKUPS',
      id: '/pickup-truck-leasing.html',
      promoImagesLinks: [
        {
          url: '/pickup-special-offers.html',
          image: {
            width: 800,
            height: 800,
            url:
              '//images.ctfassets.net/3xid768u5joa/4BrHhrNLc7xk2VfWG5EDZk/2b66cf34e93976914119407a45d0f0aa/800x800-Pickups.jpg',
            fileName: '800x800-Pickups.jpg',
          },
        },
      ],
      children: [
        {
          href: '/pickup-truck-leasing.html',
          label: 'Pickups Home',
          id: '/pickup-truck-leasing.html',
          highlightLabel: '',
        },
        {
          href: '/pickup-special-offers.html',
          label: 'PICKUP HOT OFFERS',
          id: '/pickup-special-offers.html',
          highlightLabel: '',
          highlight: true,
        },
        {
          label: 'Pickups By Manufacturer',
          href: '',
          id: 'Pickups By Manufacturer',
          children: [
            {
              label: 'Ford',
              href: '/ford-van-leasing/ranger.html',
              query: {
                isChangePage: 'true',
              },
              id: '/ford-van-leasing/ranger.html',
              as: '/ford-van-leasing/ranger.html',
            },
            {
              label: 'Nissan',
              href: '/nissan-van-leasing/navara.html',
              query: {
                isChangePage: 'true',
              },
              id: '/nissan-van-leasing/navara.html',
              as: '/nissan-van-leasing/navara.html',
            },
            {
              label: 'Isuzu',
              href: '/isuzu-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/isuzu-van-leasing.html',
              as: '/isuzu-van-leasing.html',
            },
            {
              label: 'SsangYong',
              href: 'https://www.vanarama.com/ssangyong-van-leasing/musso.html',
              query: {
                isChangePage: 'true',
              },
              id: 'https://www.vanarama.com/ssangyong-van-leasing/musso.html',
              as: 'https://www.vanarama.com/ssangyong-van-leasing/musso.html',
            },
            {
              label: 'Toyota',
              href: '/toyota-van-leasing/hilux.html',
              query: {
                isChangePage: 'true',
              },
              id: '/toyota-van-leasing/hilux.html',
              as: '/toyota-van-leasing/hilux.html',
            },
          ],
        },
        {
          label: 'Bestselling',
          href: '',
          id: 'Bestselling',
          children: [
            {
              label: 'Ford Ranger Double Cab Wildtrak',
              href:
                '/ford-van-leasing/ranger/pick-up-double-cab-wildtrak-2-0-ecoblue-213-auto-9948.html',
              query: {
                isChangePage: 'true',
              },
              id:
                '/ford-van-leasing/ranger/pick-up-double-cab-wildtrak-2-0-ecoblue-213-auto-9948.html',
              as:
                '/ford-van-leasing/ranger/pick-up-double-cab-wildtrak-2-0-ecoblue-213-auto-9948.html',
            },
          ],
        },
        {
          href: '/blog/vans',
          label: 'Van & Pickup News',
          id: '/blog/vans',
          highlightLabel: '',
        },
        {
          href: '/deranged-vehicles.html',
          label: 'Deranged',
          id: '/deranged-vehicles.html',
          highlightLabel: '',
        },
        {
          href: '/van-leasing/search?bodyStyles=Pickup',
          label: 'View All Pickups',
          id: '/van-leasing/search?bodyStyles=Pickup',
          highlightLabel: '',
        },
      ],
    },
    {
      href: '/car-leasing.html',
      label: 'CARS',
      id: '/car-leasing.html',
      promoImagesLinks: [
        {
          url: '/car-leasing-special-offers.html',
          image: {
            width: 800,
            height: 800,
            url:
              '//images.ctfassets.net/3xid768u5joa/3XvhAzTo3oCAhf9EHvyeWA/b6942fe9bfff852e56773fbaa2b52a12/800x800-Cars.jpg',
            fileName: '800x800-Cars.jpg',
          },
        },
      ],
      children: [
        {
          href: '/car-leasing.html',
          label: 'Cars Home',
          id: '/car-leasing.html',
          highlightLabel: '',
        },
        {
          href: '/car-leasing-special-offers.html',
          label: 'CAR HOT OFFERS',
          id: '/car-leasing-special-offers.html',
          highlightLabel: '',
          highlight: true,
        },
        {
          label: 'Cars By Manufacturer',
          href: '',
          id: 'Cars By Manufacturer',
          children: [
            {
              label: 'View All',
              href: '/car-leasing/all-car-manufacturers.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/all-car-manufacturers.html',
              as: '/car-leasing/all-car-manufacturers.html',
            },
            {
              label: 'Audi',
              href: '/audi-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/audi-car-leasing.html',
              as: '/audi-car-leasing.html',
            },
            {
              label: 'BMW',
              href: '/bmw-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/bmw-car-leasing.html',
              as: '/bmw-car-leasing.html',
            },
            {
              label: 'Citroen',
              href: '/citroen-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/citroen-car-leasing.html',
              as: '/citroen-car-leasing.html',
            },
            {
              label: 'Fiat',
              href: '/fiat-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/fiat-car-leasing.html',
              as: '/fiat-car-leasing.html',
            },
            {
              label: 'Ford',
              href: '/ford-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/ford-car-leasing.html',
              as: '/ford-car-leasing.html',
            },
            {
              label: 'Honda',
              href: '/honda-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/honda-car-leasing.html',
              as: '/honda-car-leasing.html',
            },
            {
              label: 'Hyundai',
              href: '/hyundai-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/hyundai-car-leasing.html',
              as: '/hyundai-car-leasing.html',
            },
            {
              label: 'Jaguar',
              href: '/jaguar-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/jaguar-car-leasing.html',
              as: '/jaguar-car-leasing.html',
            },
            {
              label: 'Kia',
              href: '/kia-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/kia-car-leasing.html',
              as: '/kia-car-leasing.html',
            },
            {
              label: 'Land Rover',
              href: '/car-leasing/land-rover',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/land-rover',
              as: '/car-leasing/land-rover',
            },
            {
              label: 'Mercedes-Benz',
              href: '/mercedesbenz-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/mercedesbenz-car-leasing.html',
              as: '/mercedesbenz-car-leasing.html',
            },
            {
              label: 'Mini',
              href: '/mini-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/mini-car-leasing.html',
              as: '/mini-car-leasing.html',
            },
            {
              label: 'Nissan',
              href: '/nissan-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/nissan-car-leasing.html',
              as: '/nissan-car-leasing.html',
            },
            {
              label: 'Peugeot',
              href: '/peugeot-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/peugeot-car-leasing.html',
              as: '/peugeot-car-leasing.html',
            },
            {
              label: 'Renault',
              href: '/renault-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/renault-car-leasing.html',
              as: '/renault-car-leasing.html',
            },
            {
              label: 'Seat',
              href: '/seat-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/seat-car-leasing.html',
              as: '/seat-car-leasing.html',
            },
            {
              label: 'Skoda',
              href: '/skoda-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/skoda-car-leasing.html',
              as: '/skoda-car-leasing.html',
            },
            {
              label: 'Tesla',
              href: '/tesla-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/tesla-car-leasing.html',
              as: '/tesla-car-leasing.html',
            },
            {
              label: 'Toyota',
              href: '/toyota-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/toyota-car-leasing.html',
              as: '/toyota-car-leasing.html',
            },
            {
              label: 'Vauxhall',
              href: '/vauxhall-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/vauxhall-car-leasing.html',
              as: '/vauxhall-car-leasing.html',
            },
            {
              label: 'Volkswagen',
              href: '/volkswagen-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/volkswagen-car-leasing.html',
              as: '/volkswagen-car-leasing.html',
            },
            {
              label: 'Volvo',
              href: '/volvo-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/volvo-car-leasing.html',
              as: '/volvo-car-leasing.html',
            },
          ],
        },
        {
          label: 'Cars By Type',
          href: '',
          id: 'Cars By Type',
          children: [
            {
              label: '4x4/SUV',
              href: '/car-leasing/4x4-suv.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/4x4-suv.html',
              as: '/car-leasing/4x4-suv.html',
            },
            {
              label: 'Convertible',
              href: '/car-leasing/convertible.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/convertible.html',
              as: '/car-leasing/convertible.html',
            },
            {
              label: 'Coupe',
              href: '/car-leasing/coupe.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/coupe.html',
              as: '/car-leasing/coupe.html',
            },
            {
              label: 'Electric',
              href: '/car-leasing/electric',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/electric',
              as: '/car-leasing/electric',
            },
            {
              label: 'Estate',
              href: '/car-leasing/estate.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/estate.html',
              as: '/car-leasing/estate.html',
            },
            {
              label: 'Hatchback',
              href: '/car-leasing/hatchback.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/hatchback.html',
              as: '/car-leasing/hatchback.html',
            },
            {
              label: 'Hybrid',
              href: '/car-leasing/hybrid',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/hybrid',
              as: '/car-leasing/hybrid',
            },
            {
              label: 'MPV/People Carrier',
              href: '/car-leasing/people-carrier.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/people-carrier.html',
              as: '/car-leasing/people-carrier.html',
            },
            {
              label: 'Saloon',
              href: '/car-leasing/saloon.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/saloon.html',
              as: '/car-leasing/saloon.html',
            },
            {
              label: 'Small',
              href: '/car-leasing/small.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/small.html',
              as: '/car-leasing/small.html',
            },
          ],
        },
        {
          label: 'Cars By Budget',
          href: '',
          id: 'Cars By Budget',
          children: [
            {
              label: '£150 And Under',
              href: '/cars-under-150-per-month.html',
              query: {
                isChangePage: 'true',
              },
              id: '/cars-under-150-per-month.html',
              as: '/cars-under-150-per-month.html',
            },
            {
              label: '£150 - £250',
              href: '/cars-150-250-per-month.html',
              query: {
                isChangePage: 'true',
              },
              id: '/cars-150-250-per-month.html',
              as: '/cars-150-250-per-month.html',
            },
            {
              label: '£250-£350',
              href: '/cars-250-350-per-month.html',
              query: {
                isChangePage: 'true',
              },
              id: '/cars-250-350-per-month.html',
              as: '/cars-250-350-per-month.html',
            },
            {
              label: '£350-£450',
              href: '/cars-350-450-per-month.html',
              query: {
                isChangePage: 'true',
              },
              id: '/cars-350-450-per-month.html',
              as: '/cars-350-450-per-month.html',
            },
            {
              label: '£450-£550',
              href: '/cars-450-550-per-month.html',
              query: {
                isChangePage: 'true',
              },
              id: '/cars-450-550-per-month.html',
              as: '/cars-450-550-per-month.html',
            },
            {
              label: 'Above £550',
              href: '/cars-over-550-per-month.html',
              query: {
                isChangePage: 'true',
              },
              id: '/cars-over-550-per-month.html',
              as: '/cars-over-550-per-month.html',
            },
          ],
        },
        {
          label: 'Guides & Reviews',
          href: '',
          id: 'Guides & Reviews',
          children: [
            {
              label: 'How To Choose A Car',
              href: '/car-leasing/how-to-choose-a-car',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/how-to-choose-a-car',
              as: '/car-leasing/how-to-choose-a-car',
            },
            {
              label: 'Car Guides & Reviews',
              href: '/guides/cars',
              query: {
                isChangePage: 'true',
              },
              id: '/guides/cars',
              as: '/guides/cars',
            },
            {
              label: 'Electric Cars Explained',
              href: '/electric-leasing/cars/electric-cars-explained',
              query: {
                isChangePage: 'true',
              },
              id: '/electric-leasing/cars/electric-cars-explained',
              as: '/electric-leasing/cars/electric-cars-explained',
            },
            {
              label: 'Electric Guides',
              href: '/guides/electric',
              query: {
                isChangePage: 'true',
              },
              id: '/guides/electric',
              as: '/guides/electric',
            },
          ],
        },
        {
          href: '/help-me-choose',
          label: 'Help Me Choose',
          id: '/help-me-choose',
          highlightLabel: 'New',
        },
        {
          href: '/guides/car-leasing-explained',
          label: 'Car Leasing Explained',
          id: '/guides/car-leasing-explained',
          highlightLabel: '',
        },
        {
          href: '/lease-finance/cars',
          label: 'Car Finance',
          id: '/lease-finance/cars',
          highlightLabel: '',
        },
        {
          href: '/blog/cars',
          label: 'Car News',
          id: '/blog/cars',
          highlightLabel: '',
        },
        {
          href: '/car-leasing/search',
          label: 'View All Cars',
          id: '/car-leasing/search',
          highlightLabel: '',
        },
      ],
    },
    {
      href: '/electric-leasing',
      label: 'ELECTRIC',
      id: '/electric-leasing',
      promoImagesLinks: [
        {
          url: 'https://www.vanarama.com/car-leasing/electric',
          image: {
            width: 800,
            height: 800,
            url:
              '//images.ctfassets.net/3xid768u5joa/22mVNHPftTWdFl35kl6NeH/a4eca5d50a85244ae837bbcfc2e470b6/800x800-_Electric.jpg',
            fileName: '800x800- Electric.jpg',
          },
        },
      ],
      children: [
        {
          href: '/electric-leasing',
          label: 'Electric Home',
          id: '/electric-leasing',
          highlightLabel: '',
        },
        {
          label: 'Electric Cars',
          href: '/electric-leasing/cars',
          id: 'Electric Cars',
          promoImageLink: {
            url: '',
            image: {
              url: '',
              fileName: '',
            },
          },
          children: [
            {
              label: 'Electric Cars',
              href: '/electric-leasing/cars',
              query: {
                isChangePage: 'true',
              },
              id: '/electric-leasing/cars',
              as: '/electric-leasing/cars',
            },
            {
              label: 'Hot Offers',
              href: '/car-leasing/electric',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/electric',
              as: '/car-leasing/electric',
              highlight: true,
            },
            {
              label: 'Electric Cars Explained',
              href: '/electric-leasing/cars/electric-cars-explained',
              query: {
                isChangePage: 'true',
              },
              id: '/electric-leasing/cars/electric-cars-explained',
              as: '/electric-leasing/cars/electric-cars-explained',
            },
            {
              label: 'Electric Cars For Business',
              href: '/electric-leasing/cars/benefits-of-electric-for-business',
              query: {
                isChangePage: 'true',
              },
              id: '/electric-leasing/cars/benefits-of-electric-for-business',
              as: '/electric-leasing/cars/benefits-of-electric-for-business',
            },
            {
              label: 'Charging & Running Costs Explained',
              href:
                '/electric-leasing/cars/how-much-does-it-cost-charge-electric-car',
              query: {
                isChangePage: 'true',
              },
              id:
                '/electric-leasing/cars/how-much-does-it-cost-charge-electric-car',
              as:
                '/electric-leasing/cars/how-much-does-it-cost-charge-electric-car',
            },
            {
              label: 'Best Electric Cars 2022',
              href:
                'https://www.vanarama.com/electric-leasing/cars/the-best-electric-cars-in-2022',
              query: {
                isChangePage: 'true',
              },
              id:
                'https://www.vanarama.com/electric-leasing/cars/the-best-electric-cars-in-2022',
              as:
                'https://www.vanarama.com/electric-leasing/cars/the-best-electric-cars-in-2022',
            },
            {
              label: 'Electric Car Guides',
              href: '/guides/electric',
              query: {
                isChangePage: 'true',
              },
              id: '/guides/electric',
              as: '/guides/electric',
            },
          ],
        },
        {
          label: 'Electric Vans',
          href: '/electric-leasing/vans',
          id: 'Electric Vans',
          promoImageLink: {
            url: '',
            image: {
              url: '',
              fileName: '',
            },
          },
          children: [
            {
              label: 'Electric Vans',
              href: '/electric-leasing/vans',
              query: {
                isChangePage: 'true',
              },
              id: '/electric-leasing/vans',
              as: '/electric-leasing/vans',
            },
            {
              label: 'Hot Offers',
              href: '/van-leasing/electric',
              query: {
                isChangePage: 'true',
              },
              id: '/van-leasing/electric',
              as: '/van-leasing/electric',
              highlight: true,
            },
            {
              label: 'Electric Vans Explained',
              href: '/electric-leasing/vans/electric-vans-explained',
              query: {
                isChangePage: 'true',
              },
              id: '/electric-leasing/vans/electric-vans-explained',
              as: '/electric-leasing/vans/electric-vans-explained',
            },
          ],
        },
      ],
    },
    {
      href: '/van-insurance.html',
      label: 'INSURANCE',
      id: '/van-insurance.html',
      promoImagesLinks: [
        {
          url: '/van-insurance/multi-year-van-insurance.html',
          image: {
            width: 800,
            height: 800,
            url:
              '//images.ctfassets.net/3xid768u5joa/6ISxU4CGg8qWOTNeZkqmyd/4a9c14cb4af3304335667a30bdd23bcb/800x800-Multi-YearInsurance.jpg',
            fileName: '800x800-Multi-YearInsurance.jpg',
          },
        },
      ],
      children: [
        {
          href: '/van-insurance.html',
          label: 'Insurance Home',
          id: '/van-insurance.html',
          highlightLabel: '',
        },
        {
          href: '/van-insurance/multi-year-van-insurance.html',
          label: 'Multi Year Insurance',
          id: '/van-insurance/multi-year-van-insurance.html',
          highlightLabel: '',
          highlight: false,
        },
        {
          href: '/van-insurance/finance-gap-insurance.html',
          label: 'Finance GAP Insurance',
          id: '/van-insurance/finance-gap-insurance.html',
          highlightLabel: '',
        },
        {
          href: '/van-insurance/tools-in-transit.html',
          label: 'Tools in Transit Insurance',
          id: '/van-insurance/tools-in-transit.html',
          highlightLabel: '',
        },
        {
          href: '/van-insurance/7-day-free-van-insurance.html',
          label: '7-Day Free Insurance',
          id: '/van-insurance/7-day-free-van-insurance.html',
          highlightLabel: '',
        },
        {
          href: '/van-insurance/short-term-insurance.html',
          label: 'Short-Term Van Insurance',
          id: '/van-insurance/short-term-insurance.html',
          highlightLabel: '',
        },
        {
          href: '/van-insurance/faq.html',
          label: 'Frequently Asked Questions',
          id: '/van-insurance/faq.html',
          highlightLabel: '',
        },
      ],
    },
    {
      href: '/fleet.html',
      label: 'FLEET',
      id: '/fleet.html',
    },
    {
      href: '/blog',
      label: 'NEWS',
      id: '/blog',
    },
  ];
  const desktopResult = [
    {
      href: '/van-leasing.html',
      label: 'VANS',
      id: '/van-leasing.html',
      promoImagesLinks: [
        {
          url: '/special-offers.html',
          image: {
            width: 800,
            height: 800,
            url:
              '//images.ctfassets.net/3xid768u5joa/4lBOkjs2PorakwMFgccJLu/32e9b8b76735c5ab280c64661eca2b9c/800x800-Vans.jpg',
            fileName: '800x800-Vans.jpg',
          },
        },
      ],
      children: [
        {
          href: '/special-offers.html',
          label: 'VAN HOT OFFERS',
          id: '/special-offers.html',
          highlightLabel: '',
          highlight: true,
        },
        {
          label: 'Vans By Manufacturer',
          href: '',
          id: 'Vans By Manufacturer',
          children: [
            {
              label: 'Citroen',
              href: '/citroen-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/citroen-van-leasing.html',
              as: '/citroen-van-leasing.html',
            },
            {
              label: 'Fiat',
              href: '/fiat-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/fiat-van-leasing.html',
              as: '/fiat-van-leasing.html',
            },
            {
              label: 'Ford',
              href: '/ford-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/ford-van-leasing.html',
              as: '/ford-van-leasing.html',
            },
            {
              label: 'Isuzu',
              href: '/isuzu-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/isuzu-van-leasing.html',
              as: '/isuzu-van-leasing.html',
            },
            {
              label: 'LEVC',
              href: '/levc-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/levc-van-leasing.html',
              as: '/levc-van-leasing.html',
            },
            {
              label: 'Maxus',
              href: '/maxus-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/maxus-van-leasing.html',
              as: '/maxus-van-leasing.html',
            },
            {
              label: 'Mercedes-Benz',
              href: '/mercedes-benz-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/mercedes-benz-van-leasing.html',
              as: '/mercedes-benz-van-leasing.html',
            },
            {
              label: 'Nissan',
              href: '/nissan-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/nissan-van-leasing.html',
              as: '/nissan-van-leasing.html',
            },
            {
              label: 'Peugeot',
              href: '/peugeot-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/peugeot-van-leasing.html',
              as: '/peugeot-van-leasing.html',
            },
            {
              label: 'Renault',
              href: '/renault-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/renault-van-leasing.html',
              as: '/renault-van-leasing.html',
            },
            {
              label: 'Toyota',
              href: '/toyota-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/toyota-van-leasing.html',
              as: '/toyota-van-leasing.html',
            },
            {
              label: 'Vauxhall',
              href: '/vauxhall-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/vauxhall-van-leasing.html',
              as: '/vauxhall-van-leasing.html',
            },
            {
              label: 'Volkswagen',
              href: '/volkswagen-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/volkswagen-van-leasing.html',
              as: '/volkswagen-van-leasing.html',
            },
          ],
        },
        {
          label: 'Vans By Size',
          href: '',
          id: 'Vans By Size',
          children: [
            {
              label: 'Small',
              href: '/small-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/small-van-leasing.html',
              as: '/small-van-leasing.html',
            },
            {
              label: 'Medium',
              href: '/medium-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/medium-van-leasing.html',
              as: '/medium-van-leasing.html',
            },
            {
              label: 'Large',
              href: '/large-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/large-van-leasing.html',
              as: '/large-van-leasing.html',
            },
          ],
        },
        {
          label: 'Vans By Type',
          href: '',
          id: 'Vans By Type',
          children: [
            {
              label: 'Refrigerated',
              href: '/refrigerated-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/refrigerated-van-leasing.html',
              as: '/refrigerated-van-leasing.html',
            },
            {
              label: 'Tippers/Lutons',
              href: '/dropside-tipper-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/dropside-tipper-leasing.html',
              as: '/dropside-tipper-leasing.html',
            },
            {
              label: 'Crew/Minibus',
              href: '/crew-vans.html',
              query: {
                isChangePage: 'true',
              },
              id: '/crew-vans.html',
              as: '/crew-vans.html',
            },
            {
              label: 'Automatic',
              href: '/automatic-vans.html',
              query: {
                isChangePage: 'true',
              },
              id: '/automatic-vans.html',
              as: '/automatic-vans.html',
            },
            {
              label: 'Electric/Hybrid',
              href: '/van-leasing/electric',
              query: {
                isChangePage: 'true',
              },
              id: '/van-leasing/electric',
              as: '/van-leasing/electric',
            },
          ],
        },
        {
          label: 'Vans By Budget',
          href: '',
          id: 'Vans By Budget',
          children: [
            {
              label: '£150 And Under',
              href: '/van-leasing/deals-under-150',
              query: {
                isChangePage: 'true',
              },
              id: '/van-leasing/deals-under-150',
              as: '/van-leasing/deals-under-150',
            },
            {
              label: '£150-£250',
              href: '/van-leasing/deals-150-250',
              query: {
                isChangePage: 'true',
              },
              id: '/van-leasing/deals-150-250',
              as: '/van-leasing/deals-150-250',
            },
            {
              label: '£250-£350',
              href: '/van-leasing/deals-250-350',
              query: {
                isChangePage: 'true',
              },
              id: '/van-leasing/deals-250-350',
              as: '/van-leasing/deals-250-350',
            },
            {
              label: '£350-£450',
              href: '/van-leasing/deals-350-450',
              query: {
                isChangePage: 'true',
              },
              id: '/van-leasing/deals-350-450',
              as: '/van-leasing/deals-350-450',
            },
          ],
        },
        {
          href: '/guides/van-leasing-explained',
          label: 'Van Leasing Explained',
          id: '/guides/van-leasing-explained',
          highlightLabel: '',
        },
        {
          href: '/finance-info/van-finance-options.html',
          label: 'Van Finance',
          id: '/finance-info/van-finance-options.html',
          highlightLabel: '',
        },
        {
          href: '/blog/vans',
          label: 'Van & Pickup News',
          id: '/blog/vans',
          highlightLabel: '',
        },
        {
          href: '/deranged-vehicles.html',
          label: 'Deranged',
          id: '/deranged-vehicles.html',
          highlightLabel: '',
        },
        {
          href: '/van-leasing/search',
          label: 'View All Vans',
          id: '/van-leasing/search',
          highlightLabel: '',
        },
      ],
    },
    {
      href: '/pickup-truck-leasing.html',
      label: 'PICKUPS',
      id: '/pickup-truck-leasing.html',
      promoImagesLinks: [
        {
          url: '/pickup-special-offers.html',
          image: {
            width: 800,
            height: 800,
            url:
              '//images.ctfassets.net/3xid768u5joa/4BrHhrNLc7xk2VfWG5EDZk/2b66cf34e93976914119407a45d0f0aa/800x800-Pickups.jpg',
            fileName: '800x800-Pickups.jpg',
          },
        },
      ],
      children: [
        {
          href: '/pickup-special-offers.html',
          label: 'PICKUP HOT OFFERS',
          id: '/pickup-special-offers.html',
          highlightLabel: '',
          highlight: true,
        },
        {
          label: 'Pickups By Manufacturer',
          href: '',
          id: 'Pickups By Manufacturer',
          children: [
            {
              label: 'Ford',
              href: '/ford-van-leasing/ranger.html',
              query: {
                isChangePage: 'true',
              },
              id: '/ford-van-leasing/ranger.html',
              as: '/ford-van-leasing/ranger.html',
            },
            {
              label: 'Nissan',
              href: '/nissan-van-leasing/navara.html',
              query: {
                isChangePage: 'true',
              },
              id: '/nissan-van-leasing/navara.html',
              as: '/nissan-van-leasing/navara.html',
            },
            {
              label: 'Isuzu',
              href: '/isuzu-van-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/isuzu-van-leasing.html',
              as: '/isuzu-van-leasing.html',
            },
            {
              label: 'SsangYong',
              href: 'https://www.vanarama.com/ssangyong-van-leasing/musso.html',
              query: {
                isChangePage: 'true',
              },
              id: 'https://www.vanarama.com/ssangyong-van-leasing/musso.html',
              as: 'https://www.vanarama.com/ssangyong-van-leasing/musso.html',
            },
            {
              label: 'Toyota',
              href: '/toyota-van-leasing/hilux.html',
              query: {
                isChangePage: 'true',
              },
              id: '/toyota-van-leasing/hilux.html',
              as: '/toyota-van-leasing/hilux.html',
            },
          ],
        },
        {
          label: 'Bestselling',
          href: '',
          id: 'Bestselling',
          children: [
            {
              label: 'Ford Ranger Double Cab Wildtrak',
              href:
                '/ford-van-leasing/ranger/pick-up-double-cab-wildtrak-2-0-ecoblue-213-auto-9948.html',
              query: {
                isChangePage: 'true',
              },
              id:
                '/ford-van-leasing/ranger/pick-up-double-cab-wildtrak-2-0-ecoblue-213-auto-9948.html',
              as:
                '/ford-van-leasing/ranger/pick-up-double-cab-wildtrak-2-0-ecoblue-213-auto-9948.html',
            },
          ],
        },
        {
          href: '/blog/vans',
          label: 'Van & Pickup News',
          id: '/blog/vans',
          highlightLabel: '',
        },
        {
          href: '/deranged-vehicles.html',
          label: 'Deranged',
          id: '/deranged-vehicles.html',
          highlightLabel: '',
        },
        {
          href: '/van-leasing/search?bodyStyles=Pickup',
          label: 'View All Pickups',
          id: '/van-leasing/search?bodyStyles=Pickup',
          highlightLabel: '',
        },
      ],
    },
    {
      href: '/car-leasing.html',
      label: 'CARS',
      id: '/car-leasing.html',
      promoImagesLinks: [
        {
          url: '/car-leasing-special-offers.html',
          image: {
            width: 800,
            height: 800,
            url:
              '//images.ctfassets.net/3xid768u5joa/3XvhAzTo3oCAhf9EHvyeWA/b6942fe9bfff852e56773fbaa2b52a12/800x800-Cars.jpg',
            fileName: '800x800-Cars.jpg',
          },
        },
      ],
      children: [
        {
          href: '/car-leasing-special-offers.html',
          label: 'CAR HOT OFFERS',
          id: '/car-leasing-special-offers.html',
          highlightLabel: '',
          highlight: true,
        },
        {
          label: 'Cars By Manufacturer',
          href: '',
          id: 'Cars By Manufacturer',
          children: [
            {
              label: 'View All',
              href: '/car-leasing/all-car-manufacturers.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/all-car-manufacturers.html',
              as: '/car-leasing/all-car-manufacturers.html',
            },
            {
              label: 'Audi',
              href: '/audi-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/audi-car-leasing.html',
              as: '/audi-car-leasing.html',
            },
            {
              label: 'BMW',
              href: '/bmw-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/bmw-car-leasing.html',
              as: '/bmw-car-leasing.html',
            },
            {
              label: 'Citroen',
              href: '/citroen-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/citroen-car-leasing.html',
              as: '/citroen-car-leasing.html',
            },
            {
              label: 'Fiat',
              href: '/fiat-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/fiat-car-leasing.html',
              as: '/fiat-car-leasing.html',
            },
            {
              label: 'Ford',
              href: '/ford-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/ford-car-leasing.html',
              as: '/ford-car-leasing.html',
            },
            {
              label: 'Honda',
              href: '/honda-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/honda-car-leasing.html',
              as: '/honda-car-leasing.html',
            },
            {
              label: 'Hyundai',
              href: '/hyundai-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/hyundai-car-leasing.html',
              as: '/hyundai-car-leasing.html',
            },
            {
              label: 'Jaguar',
              href: '/jaguar-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/jaguar-car-leasing.html',
              as: '/jaguar-car-leasing.html',
            },
            {
              label: 'Kia',
              href: '/kia-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/kia-car-leasing.html',
              as: '/kia-car-leasing.html',
            },
            {
              label: 'Land Rover',
              href: '/car-leasing/land-rover',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/land-rover',
              as: '/car-leasing/land-rover',
            },
            {
              label: 'Mercedes-Benz',
              href: '/mercedesbenz-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/mercedesbenz-car-leasing.html',
              as: '/mercedesbenz-car-leasing.html',
            },
            {
              label: 'Mini',
              href: '/mini-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/mini-car-leasing.html',
              as: '/mini-car-leasing.html',
            },
            {
              label: 'Nissan',
              href: '/nissan-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/nissan-car-leasing.html',
              as: '/nissan-car-leasing.html',
            },
            {
              label: 'Peugeot',
              href: '/peugeot-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/peugeot-car-leasing.html',
              as: '/peugeot-car-leasing.html',
            },
            {
              label: 'Renault',
              href: '/renault-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/renault-car-leasing.html',
              as: '/renault-car-leasing.html',
            },
            {
              label: 'Seat',
              href: '/seat-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/seat-car-leasing.html',
              as: '/seat-car-leasing.html',
            },
            {
              label: 'Skoda',
              href: '/skoda-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/skoda-car-leasing.html',
              as: '/skoda-car-leasing.html',
            },
            {
              label: 'Tesla',
              href: '/tesla-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/tesla-car-leasing.html',
              as: '/tesla-car-leasing.html',
            },
            {
              label: 'Toyota',
              href: '/toyota-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/toyota-car-leasing.html',
              as: '/toyota-car-leasing.html',
            },
            {
              label: 'Vauxhall',
              href: '/vauxhall-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/vauxhall-car-leasing.html',
              as: '/vauxhall-car-leasing.html',
            },
            {
              label: 'Volkswagen',
              href: '/volkswagen-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/volkswagen-car-leasing.html',
              as: '/volkswagen-car-leasing.html',
            },
            {
              label: 'Volvo',
              href: '/volvo-car-leasing.html',
              query: {
                isChangePage: 'true',
              },
              id: '/volvo-car-leasing.html',
              as: '/volvo-car-leasing.html',
            },
          ],
        },
        {
          label: 'Cars By Type',
          href: '',
          id: 'Cars By Type',
          children: [
            {
              label: '4x4/SUV',
              href: '/car-leasing/4x4-suv.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/4x4-suv.html',
              as: '/car-leasing/4x4-suv.html',
            },
            {
              label: 'Convertible',
              href: '/car-leasing/convertible.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/convertible.html',
              as: '/car-leasing/convertible.html',
            },
            {
              label: 'Coupe',
              href: '/car-leasing/coupe.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/coupe.html',
              as: '/car-leasing/coupe.html',
            },
            {
              label: 'Electric',
              href: '/car-leasing/electric',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/electric',
              as: '/car-leasing/electric',
            },
            {
              label: 'Estate',
              href: '/car-leasing/estate.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/estate.html',
              as: '/car-leasing/estate.html',
            },
            {
              label: 'Hatchback',
              href: '/car-leasing/hatchback.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/hatchback.html',
              as: '/car-leasing/hatchback.html',
            },
            {
              label: 'Hybrid',
              href: '/car-leasing/hybrid',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/hybrid',
              as: '/car-leasing/hybrid',
            },
            {
              label: 'MPV/People Carrier',
              href: '/car-leasing/people-carrier.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/people-carrier.html',
              as: '/car-leasing/people-carrier.html',
            },
            {
              label: 'Saloon',
              href: '/car-leasing/saloon.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/saloon.html',
              as: '/car-leasing/saloon.html',
            },
            {
              label: 'Small',
              href: '/car-leasing/small.html',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/small.html',
              as: '/car-leasing/small.html',
            },
          ],
        },
        {
          label: 'Cars By Budget',
          href: '',
          id: 'Cars By Budget',
          children: [
            {
              label: '£150 And Under',
              href: '/cars-under-150-per-month.html',
              query: {
                isChangePage: 'true',
              },
              id: '/cars-under-150-per-month.html',
              as: '/cars-under-150-per-month.html',
            },
            {
              label: '£150 - £250',
              href: '/cars-150-250-per-month.html',
              query: {
                isChangePage: 'true',
              },
              id: '/cars-150-250-per-month.html',
              as: '/cars-150-250-per-month.html',
            },
            {
              label: '£250-£350',
              href: '/cars-250-350-per-month.html',
              query: {
                isChangePage: 'true',
              },
              id: '/cars-250-350-per-month.html',
              as: '/cars-250-350-per-month.html',
            },
            {
              label: '£350-£450',
              href: '/cars-350-450-per-month.html',
              query: {
                isChangePage: 'true',
              },
              id: '/cars-350-450-per-month.html',
              as: '/cars-350-450-per-month.html',
            },
            {
              label: '£450-£550',
              href: '/cars-450-550-per-month.html',
              query: {
                isChangePage: 'true',
              },
              id: '/cars-450-550-per-month.html',
              as: '/cars-450-550-per-month.html',
            },
            {
              label: 'Above £550',
              href: '/cars-over-550-per-month.html',
              query: {
                isChangePage: 'true',
              },
              id: '/cars-over-550-per-month.html',
              as: '/cars-over-550-per-month.html',
            },
          ],
        },
        {
          label: 'Guides & Reviews',
          href: '',
          id: 'Guides & Reviews',
          children: [
            {
              label: 'How To Choose A Car',
              href: '/car-leasing/how-to-choose-a-car',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/how-to-choose-a-car',
              as: '/car-leasing/how-to-choose-a-car',
            },
            {
              label: 'Car Guides & Reviews',
              href: '/guides/cars',
              query: {
                isChangePage: 'true',
              },
              id: '/guides/cars',
              as: '/guides/cars',
            },
            {
              label: 'Electric Cars Explained',
              href: '/electric-leasing/cars/electric-cars-explained',
              query: {
                isChangePage: 'true',
              },
              id: '/electric-leasing/cars/electric-cars-explained',
              as: '/electric-leasing/cars/electric-cars-explained',
            },
            {
              label: 'Electric Guides',
              href: '/guides/electric',
              query: {
                isChangePage: 'true',
              },
              id: '/guides/electric',
              as: '/guides/electric',
            },
          ],
        },
        {
          href: '/help-me-choose',
          label: 'Help Me Choose',
          id: '/help-me-choose',
          highlightLabel: 'New',
        },
        {
          href: '/guides/car-leasing-explained',
          label: 'Car Leasing Explained',
          id: '/guides/car-leasing-explained',
          highlightLabel: '',
        },
        {
          href: '/lease-finance/cars',
          label: 'Car Finance',
          id: '/lease-finance/cars',
          highlightLabel: '',
        },
        {
          href: '/blog/cars',
          label: 'Car News',
          id: '/blog/cars',
          highlightLabel: '',
        },
        {
          href: '/car-leasing/search',
          label: 'View All Cars',
          id: '/car-leasing/search',
          highlightLabel: '',
        },
      ],
    },
    {
      href: '/electric-leasing',
      label: 'ELECTRIC',
      id: '/electric-leasing',
      promoImagesLinks: [
        {
          url: 'https://www.vanarama.com/car-leasing/electric',
          image: {
            width: 800,
            height: 800,
            url:
              '//images.ctfassets.net/3xid768u5joa/22mVNHPftTWdFl35kl6NeH/a4eca5d50a85244ae837bbcfc2e470b6/800x800-_Electric.jpg',
            fileName: '800x800- Electric.jpg',
          },
        },
      ],
      children: [
        {
          label: 'Electric Cars',
          href: '/electric-leasing/cars',
          id: 'Electric Cars',
          promoImageLink: {
            url: '',
            image: {
              url: '',
              fileName: '',
            },
          },
          children: [
            {
              label: 'Hot Offers',
              href: '/car-leasing/electric',
              query: {
                isChangePage: 'true',
              },
              id: '/car-leasing/electric',
              as: '/car-leasing/electric',
              highlight: true,
            },
            {
              label: 'Electric Cars Explained',
              href: '/electric-leasing/cars/electric-cars-explained',
              query: {
                isChangePage: 'true',
              },
              id: '/electric-leasing/cars/electric-cars-explained',
              as: '/electric-leasing/cars/electric-cars-explained',
            },
            {
              label: 'Electric Cars For Business',
              href: '/electric-leasing/cars/benefits-of-electric-for-business',
              query: {
                isChangePage: 'true',
              },
              id: '/electric-leasing/cars/benefits-of-electric-for-business',
              as: '/electric-leasing/cars/benefits-of-electric-for-business',
            },
            {
              label: 'Charging & Running Costs Explained',
              href:
                '/electric-leasing/cars/how-much-does-it-cost-charge-electric-car',
              query: {
                isChangePage: 'true',
              },
              id:
                '/electric-leasing/cars/how-much-does-it-cost-charge-electric-car',
              as:
                '/electric-leasing/cars/how-much-does-it-cost-charge-electric-car',
            },
            {
              label: 'Best Electric Cars 2022',
              href:
                'https://www.vanarama.com/electric-leasing/cars/the-best-electric-cars-in-2022',
              query: {
                isChangePage: 'true',
              },
              id:
                'https://www.vanarama.com/electric-leasing/cars/the-best-electric-cars-in-2022',
              as:
                'https://www.vanarama.com/electric-leasing/cars/the-best-electric-cars-in-2022',
            },
            {
              label: 'Electric Car Guides',
              href: '/guides/electric',
              query: {
                isChangePage: 'true',
              },
              id: '/guides/electric',
              as: '/guides/electric',
            },
          ],
        },
        {
          label: 'Electric Vans',
          href: '/electric-leasing/vans',
          id: 'Electric Vans',
          promoImageLink: {
            url: '',
            image: {
              url: '',
              fileName: '',
            },
          },
          children: [
            {
              label: 'Hot Offers',
              href: '/van-leasing/electric',
              query: {
                isChangePage: 'true',
              },
              id: '/van-leasing/electric',
              as: '/van-leasing/electric',
              highlight: true,
            },
            {
              label: 'Electric Vans Explained',
              href: '/electric-leasing/vans/electric-vans-explained',
              query: {
                isChangePage: 'true',
              },
              id: '/electric-leasing/vans/electric-vans-explained',
              as: '/electric-leasing/vans/electric-vans-explained',
            },
          ],
        },
      ],
    },
    {
      href: '/van-insurance.html',
      label: 'INSURANCE',
      id: '/van-insurance.html',
      promoImagesLinks: [
        {
          url: '/van-insurance/multi-year-van-insurance.html',
          image: {
            width: 800,
            height: 800,
            url:
              '//images.ctfassets.net/3xid768u5joa/6ISxU4CGg8qWOTNeZkqmyd/4a9c14cb4af3304335667a30bdd23bcb/800x800-Multi-YearInsurance.jpg',
            fileName: '800x800-Multi-YearInsurance.jpg',
          },
        },
      ],
      children: [
        {
          href: '/van-insurance/multi-year-van-insurance.html',
          label: 'Multi Year Insurance',
          id: '/van-insurance/multi-year-van-insurance.html',
          highlightLabel: '',
          highlight: false,
        },
        {
          href: '/van-insurance/finance-gap-insurance.html',
          label: 'Finance GAP Insurance',
          id: '/van-insurance/finance-gap-insurance.html',
          highlightLabel: '',
        },
        {
          href: '/van-insurance/tools-in-transit.html',
          label: 'Tools in Transit Insurance',
          id: '/van-insurance/tools-in-transit.html',
          highlightLabel: '',
        },
        {
          href: '/van-insurance/7-day-free-van-insurance.html',
          label: '7-Day Free Insurance',
          id: '/van-insurance/7-day-free-van-insurance.html',
          highlightLabel: '',
        },
        {
          href: '/van-insurance/short-term-insurance.html',
          label: 'Short-Term Van Insurance',
          id: '/van-insurance/short-term-insurance.html',
          highlightLabel: '',
        },
        {
          href: '/van-insurance/faq.html',
          label: 'Frequently Asked Questions',
          id: '/van-insurance/faq.html',
          highlightLabel: '',
        },
      ],
    },
    {
      href: '/fleet.html',
      label: 'FLEET',
      id: '/fleet.html',
    },
    {
      href: '/blog',
      label: 'NEWS',
      id: '/blog',
    },
  ];

  it('should works correct for mobile', () => {
    expect(getTopLinks(linkGroups, true)).toMatchObject(mobileResult);
  });

  it('should works correct for desktop', () => {
    expect(getTopLinks(linkGroups, false)).toMatchObject(desktopResult);
  });
});
