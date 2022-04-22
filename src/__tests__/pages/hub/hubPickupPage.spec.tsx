import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import { ImageProps } from 'next/image';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { HubPickupPageData } from '../../../../generated/HubPickupPageData';
import { HUB_PICKUP_CONTENT } from '../../../gql/hub/hubPickupPage';
import { GET_SEARCH_POD_DATA } from '../../../containers/SearchPodContainer/gql';
import { mockSearchPodResponse } from '../../../../__mocks__/searchpod';
import { ProductCardData } from '../../../../generated/ProductCardData';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { PickupsPage } from '../../../pages/pickup-truck-leasing';
import { VehicleListUrl_vehicleList as IVehicleList } from '../../../../generated/VehicleListUrl';
import { PageTypeEnum } from '../../../types/common';
import { OnOffer } from '../../../../entities/global';

/**
 * NOTE: Mock the SearchPodContainer as it is out of scope for this test and is doing state
 * updates after the test has finished.
 */
jest.mock('../../../containers/SearchPodContainer', () => () => {
  return <div />;
});
jest.mock('../../../containers/OrdersInformation/gql');
jest.mock('../../../gql/vehicleList');

jest.mock('next/image', () => ({ src, alt }: ImageProps) => (
  <img src={src.toString()} alt={alt} />
));
jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter() {
    return {
      asPath: '/hub/pickups',
      query: {
        score: 75,
      },
    };
  },
}));

const DATA = {
  hubPickupPage: {
    id: '5tOAQJdo25VZUbiuUWLCnd',
    sections: {
      hero: {
        title: 'Pickup Truck Leasing Deals',
        titleTag: 'h2',
        body:
          'Brand New Pickups, In Stock Delivered Fast And Free __From Just £195pm__',
        image: {
          title: 'Pickups-Hub-Hero-Image',
          file: {
            url:
              '//images.ctfassets.net/3xid768u5joa/6vZ9Rxd6NxxmvTSdTX1T6U/919ab2e8c97ae1dcc6d8f23b7c5e2650/Pickups-Hub-Hero-Image.png',
            details: {
              image: {
                width: 100,
                height: 100,
              },
            },
          },
        },
      },
      leadText: {
        heading: 'Best Pickup Truck Leasing Deals In The UK',
        titleTag: 'h1',
        description: 'Brand New Pickup Trucks, Delivered Free From Just £195pm',
      },
      featured1: {
        title: 'Looking For The Perfect Pickup?',
        titleTag: 'h2',
        body:
          "### Vanarama Is The UK's Only Independent Pickup Truck Specialist\n\nWith low monthly payments, leasing a pickup has become an affordable & easy way to get a stunning, practical vehicle that's a joy to drive. Combining car-like quality with the practicality of a commercial vehicle, pickups are the perfect choice for many of our customers. And with such a long history in the pickup market, it’s no wonder thousands of loyal customers come back to lease a brand new one from us, year after year! \n\n\n### Luxury & Comfort\nThe modern pickup now holds its own against a top specification car with ith cruise control, air conditioning, leather seats, Sat Nav & Bluetooth all included as standard.\n\n### The Ultimate On & Off-Road Machine\nPick Trucks have a huge towing capability & a sturdy, spacious load bed - ideal for easy access to your load & your tools.\n\n### Great To Look At & Amazing To Drive\nMany of our professional trade customers opt for a pickup even though they’re no longer 'on the tools', with luxurious trucks presenting a professional image.\n",
        image: null,
        layout: [''],
      },
      featured2: {
        title: 'Why Choose Vanarama For Your Pickup?',
        titleTag: 'h2',
        body:
          "At Vanarama, you’ll get the widest choice of pickup trucks & the best advice from our dedicated team of experienced pickup truck experts. Whether you need a workhorse to carry heavy cargo or double cab pickup to seat family members in comfort, you’ll find it at Vanarama.\n\nOur enhanced buying power from working with manufacturers and a large panel of funders, allows us to deliver unbeatable pickup leasing offers. Choose from the most popular models like the Ford Ranger, Toyota Hilux, Nissan Navara & Mitsubishi L200.\n\nLooking for pickup accessories? We can supply a wide range of pickup accessories & fit them to our brand new vehicle in our workshop by our qualified technicians. What's more, you can add the cost of any accessories to your monthly payments. You won't get this service anywhere else.\n",
        image: null,
        layout: [''],
      },
      rowText: {
        heading: 'How Does Pickup Leasing Works?',
        titleTag: 'h2',
        subHeading: null,
        body:
          'Leasing a pickup is really simple. You drive a brand new vehicle & pay fixed monthly rentals over 2-5 years after paying an initial rental at the start of your contract. At the end of your agreement, you simply hand the pickup back & choose which new truck to upgrade to.\n\nEverything you need to know about lease contracts, delivery & more is a click away in our easy to understand leasing guides.',
      },
      steps: {
        heading: 'Leasing - The Simple Way To Get Your Brand New Vehicle',
        titleTag: 'h2',
        steps: [
          {
            title: 'Check',
            body:
              'See if you’re eligible to lease without affecting your credit score by using our quick & easy Eligibility Checker.',
          },
          {
            title: 'Choose',
            body:
              'Get the car you want from our range of manufacturers - from something sporty to something for all the family.',
          },
          {
            title: 'Apply',
            body:
              "To lease your new car, we'll just need a few details to apply for finance from one of our funding partners.",
          },
          {
            title: 'Drive',
            body:
              'And that’s it - once you’ve been approved, your brand new car will be delivered direct to your door.',
          },
        ],
      },
      tiles1: {
        name: 'Wide Range of Optional Accessories',
        titleTag: 'h2',
        tilesTitle: 'Wide Range of Optional Accessories',
        tiles: [
          {
            title: 'Hardtops',
            link: null,
            body:
              'Wider & longer than a car with a surprisingly large load space.',
            image: {
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/2hTF5J2RcsUY8jjw3mfY3B/ce4967691ac9033a66fc347b13986fb5/ivan-answers-van-leasing-questions.jpg',
              },
            },
          },
          {
            title: 'Bed Liners',
            link: null,
            body:
              'The most popular size of van on UK roads, ideal for all trades.',
            image: {
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/2hTF5J2RcsUY8jjw3mfY3B/ce4967691ac9033a66fc347b13986fb5/ivan-answers-van-leasing-questions.jpg',
              },
            },
          },
          {
            title: 'Storage Systems',
            link: null,
            body:
              'The biggest vans around, large vans can carry large & heavy loads.',
            image: {
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/2hTF5J2RcsUY8jjw3mfY3B/ce4967691ac9033a66fc347b13986fb5/ivan-answers-van-leasing-questions.jpg',
              },
            },
          },
          {
            title: 'Roller Covers',
            link: null,
            body:
              'Car-like comfort, off-road capability & heavy load carrying.',
            image: {
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/2hTF5J2RcsUY8jjw3mfY3B/ce4967691ac9033a66fc347b13986fb5/ivan-answers-van-leasing-questions.jpg',
              },
            },
          },
        ],
      },
      tiles2: {
        name: 'Benefits Grid',
        titleTag: 'h2',
        tilesTitle: 'Why Lease With Vanarama',
        tiles: [
          {
            title: 'Price Promise',
            link: null,
            body:
              "You won't find this with any of our competitors. Honest pricing & nothing hidden.",
            image: {
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/1ZIIHCFIqBIVkse5D80ymR/59d962d5cf10c6f689c847ddab436218/price-promise.jpg',
              },
              title: 'price-promise',
            },
          },
          {
            title: 'Customer Reviews',
            link: null,
            body:
              'We love our customers and our customers love us, 96% of them would recommend us.',
            image: {
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/27vSXvAmh2dn3wh58xoJkP/368c1854210afeaa24f0700fc7c509fc/Icon-Contract-RGB_Contract-Colour-400px-RGB.png',
              },
              title: 'Smiths-Vanarama-Deal',
            },
          },
          {
            title: 'Quote Online',
            link: null,
            body: 'Get your quote in seconds with iVan.',
            image: {
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/3KhuHOZWIeppLEsCTcouiY/a384211adc3f246728f3c5fd9d8cf637/Insurance-Icon.png',
              },
              title: 'Insurance-Icon',
            },
          },
          {
            title: 'Confused About Leasing?',
            link: null,
            body: 'Everything you need to know is a click away.',
            image: {
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/3a609lEJL2WBF9fBG9V6N6/9bbcee8eba6f7deecfbbab92582283e2/Fleet-Icon.png',
              },
              title: 'Fleet-Icon',
            },
          },
        ],
      },
    },
  },
} as HubPickupPageData;

const vehicleListUrl: IVehicleList = {
  totalCount: 1,
  pageInfo: {
    startCursor: 'startCursor',
    endCursor: 'endCursor',
    hasNextPage: false,
    hasPreviousPage: false,
  },
  edges: [
    {
      cursor: 'cursor',
      node: {
        vehicleType: VehicleTypeEnum.LCV,
        derivativeId: '44514',
        url: '/ford/focus/10-ecoBoost-125-st-line-nav-5dr',
        legacyUrl: null,
      },
    },
  ],
};

const productsData = {
  productCarousel: [
    {
      capId: '44514',
      isOnOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
      manufacturerName: 'Citroen',
      derivativeName: '1.5 BlueHDi 650Kg Enterprise 75ps',
      rangeName: 'Berlingo',
      imageUrl:
        'https://images.autorama.co.uk/Photos/Cap/Vehicles/161237/cap-44514-161237.jpg',
      leadTime: 'Factory Order',
      averageRating: 4.7,
      businessRate: 139,
      personalRate: 186.98,
      offerPosition: null,
      keyInformation: [
        {
          name: 'Transmission',
          value: 'Manual',
        },
        {
          name: 'Fuel Type',
          value: 'Diesel',
        },
        {
          name: 'Emissions',
          value: '111',
        },
        {
          name: 'Fuel Economy',
          value: '67.2',
        },
      ],
      vehicleType: VehicleTypeEnum.LCV,
    },
  ],
} as ProductCardData;

const filterList = {
  filterList: {
    vehicleTypes: [VehicleTypeEnum.LCV],
    groupedRangesWithSlug: [
      {
        parent: { label: 'Citroën', slug: 'Citroën' },
        children: [
          { label: 'Berlingo', slug: 'Berlingo' },
          { label: 'Dispatch', slug: 'Dispatch' },
          { label: 'Relay', slug: 'Relay' },
        ],
      },
      {
        parent: { label: 'Dacia', slug: 'Dacia' },
        children: [{ label: 'Duster', slug: 'Duster' }],
      },
      {
        parent: { label: 'BMW', slug: 'BMW' },
        children: [
          { label: '3 series', slug: '3 series' },
          { label: '4 series', slug: '4 series' },
        ],
      },
    ],
    bodyStyles: ['Dropside Tipper', 'Large Van'],
    transmissions: ['Automatic', 'Manual'],
    fuelTypes: ['diesel', 'iii'],
  },
};

const mocked: MockedResponse[] = [
  {
    request: {
      query: HUB_PICKUP_CONTENT,
    },
    result: {
      data: DATA,
    },
  },
  {
    request: {
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.LCV],
      },
    },
    result: {
      data: {
        ...mockSearchPodResponse,
      },
    },
  },
];

describe('<PickupsPage />', () => {
  beforeEach(async () => {
    await preloadAll();
    render(
      <MockedProvider addTypename={false} mocks={mocked}>
        <PickupsPage
          pageType={PageTypeEnum.DEFAULT}
          data={DATA}
          productsPickup={productsData}
          vehicleListUrlData={vehicleListUrl}
          searchPodVansData={filterList}
        />
      </MockedProvider>,
    );
  });

  it('should successfully query all hub PickupsPage data', async () => {
    await waitFor(() => {
      expect(screen.getByText('DEAL OF THE MONTH')).toBeInTheDocument();
    });
  });

  it('should have link in View All Pickups', async () => {
    await screen.findByText('View All Pickups');

    expect(screen.getByTestId('view-all-pickups')).toHaveAttribute(
      'href',
      '/pickup-special-offers.html',
    );
  });

  it('should have correct link in Here path', async () => {
    expect(screen.getByText('Here')).toHaveAttribute('href', '/fan-hub.html');
  });
});
