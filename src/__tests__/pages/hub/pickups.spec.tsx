import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import Router from 'next/router';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { HubPickupPageData } from '../../../../generated/HubPickupPageData';
import { HUB_PICKUP_CONTENT } from '../../../gql/hubPickupPage';
import { PRODUCT_CARD_CONTENT } from '../../../gql/productCard';
import { GET_SEARCH_POD_DATA } from '../../../containers/SearchPodContainer/gql';
import { PickupsPage } from '../../../pages/hub/pickups';
import { mockSearchPodResponse } from '../../../../__mocks__/searchpod';
import { ProductCardData } from '../../../../generated/ProductCardData';

/**
 * NOTE: Mock the SearchPodContainer as it is out of scope for this test and is doing state
 * updates after the test has finished.
 */
jest.mock('../../../containers/SearchPodContainer', () => () => {
  return <div />;
});

jest.mock('next/router', () => ({ push: jest.fn() }));

const mocked: MockedResponse[] = [
  {
    request: {
      query: HUB_PICKUP_CONTENT,
    },
    result: {
      data: {
        hubPickupPage: {
          id: '52KVGyEpzhiH8tqLIEK5Tz',
          sections: {
            hero: {
              title: 'Pickup Truck Leasing Deals',
              body:
                'Brand New Pickups, In Stock Delivered Fast And Free __From Just £195pm__',
              image: null,
            },
            leadText: {
              heading: 'Large Sales Heading',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aspernatur fugiat.',
            },
            featured1: {
              title: 'Pickup Truck Leasing Deals UK',
              body:
                "If you're looking to drive a brand new car, van or truck without any of the hassle",
              image: null,
            },
            featured2: {
              title: 'Why Choose Vanarama For Your Pickup?',
              body: 'Vanarama is more than just a broker or leasing company,',
              image: null,
            },
            rowText: {
              heading: 'Not Sure How Pickup Leasing Works?',
              subHeading:
                'Everything you need to know is a click away in our easy to understand guide',
              body: 'Leasing a pickup is really simple.',
            },
            steps: {
              heading: 'Leasing - The Simple Way To Get Your Brand New Vehicle',
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
            accessories: {
              name: 'Wide Range of Optional Accessories',
              accessories: [
                {
                  title: 'Hardtops',
                  body: 'Lorem ipsum.',
                  image: null,
                },
                {
                  title: 'Bed Liners',
                  body: 'Lorem ipsum.',
                  image: null,
                },
                {
                  title: 'Storage Systems',
                  body: 'Lorem ipsum.',
                  image: null,
                },
                {
                  title: 'Roller Covers',
                  body: 'Lorem ipsum.',
                  image: null,
                },
              ],
            },
            tiles: {
              name: 'Tiles',
              tiles: [
                {
                  title: 'Price Protection',
                  body:
                    'Pretium facilisi etiam pretium, cras interdum enim, nullam.',
                  image: null,
                },
                {
                  title: 'Customer Reviews',
                  body:
                    'Pretium facilisi etiam pretium, cras interdum enim, nullam.',
                  image: null,
                },
                {
                  title: 'Quote Online',
                  body:
                    'Pretium facilisi etiam pretium, cras interdum enim, nullam.',
                  image: null,
                },
                {
                  title: 'Confused About Leasing?',
                  body:
                    'Pretium facilisi etiam pretium, cras interdum enim, nullam.',
                  image: null,
                },
              ],
            },
          },
        },
      } as HubPickupPageData,
    },
  },
  {
    request: {
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: ['LCV'],
      },
    },
    result: () => {
      return {
        data: {
          ...mockSearchPodResponse,
        },
      };
    },
  },
  {
    request: {
      query: PRODUCT_CARD_CONTENT,
      variables: {
        type: 'LCV',
        subType: 'PICKUP',
        size: 9,
        offer: true,
      },
    },
    result: () => {
      return {
        data: {
          productCarousel: [
            {
              capId: '44514',
              isOnOffer: true,
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
            },
          ],
        } as ProductCardData,
      };
    },
  },
];

describe('<PickupsPage />', () => {
  beforeEach(async () => {
    await preloadAll();
    render(
      <MockedProvider addTypename={false} mocks={mocked}>
        <PickupsPage />
      </MockedProvider>,
    );
  });

  it('should successfully query all hub PickupsPage data', async () => {
    await waitFor(() => {
      expect(
        screen.getByText('Why Choose Vanarama For Your Pickup?'),
      ).toBeInTheDocument();
    });
  });

  it('should trigger route push when clicking deal of the month View Offer', async () => {
    await screen.findByTestId('deal-of-month__view-offer');
    fireEvent.click(screen.getByTestId('deal-of-month__view-offer'));
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith('/pickups/pickup-details/44514'),
    );
  });

  it('should trigger route push when clicking View All Pickups', async () => {
    await screen.findByText('View All Pickups');
    fireEvent.click(screen.getByText('View All Pickups'));
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith('/van-leasing'),
    );
  });

  it('should trigger router push when clicking product View Offer', async () => {
    await screen.findAllByText('View Offer');
    fireEvent.click(screen.getAllByText('View Offer')[0]);
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith('/pickups/pickup-details/44514'),
    );
  });
});
