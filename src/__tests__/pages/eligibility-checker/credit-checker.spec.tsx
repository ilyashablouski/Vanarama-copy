import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import Router from 'next/router';
import renderer from 'react-test-renderer';
import CreditChecker from '../../../pages/eligibility-checker/credit-checker';
import { PRODUCT_CARD_CONTENT } from '../../../gql/productCard';
import { ProductCardData } from '../../../../generated/ProductCardData';

jest.mock('../../../containers/SearchPodContainer', () => () => {
  return <div />;
});

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/eligibility-checker/credit-checker',
      query: {
        score: 75,
      },
    };
  },
  push: jest.fn(),
}));

const mocks: MockedResponse[] = [
  {
    request: {
      query: PRODUCT_CARD_CONTENT,
      variables: { type: 'CAR', size: 9, offer: true },
    },
    result: {
      data: {
        productCarousel: [
          {
            averageRating: 4.8,
            businessRate: 164.88,
            capId: '83615',
            derivativeName: '1.0 EcoBoost 125 ST-Line Nav 5dr',
            imageUrl:
              'https://images.autorama.co.uk/Photos/Vehicles/155485/im_3411.jpg',
            isOnOffer: true,
            keyInformation: [
              {
                name: 'Transmission',
                value: 'Manual',
              },
              {
                name: 'Fuel Type',
                value: 'Petrol',
              },
              {
                name: 'Emissions',
                value: '97',
              },
              {
                name: 'Fuel Economy',
                value: '67.3',
              },
            ],
            leadTime: '10-14 Day Delivery',
            manufacturerName: 'Ford',
            offerPosition: 1,
            personalRate: 197.88,
            rangeName: 'Focus',
          },
        ],
      } as ProductCardData,
    },
  },
];

describe('<CreditChecker />', () => {
  it('should render title, link and text correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreditChecker />
      </MockedProvider>,
    );

    await waitFor(() => expect(screen.getByText('Choose Your Vehicle')));
    expect(screen.getByText('Not sure? We can')).toBeInTheDocument();
    expect(screen.getByText('help you choose')).toBeInTheDocument();
  });

  it('should trigger route push when clicking car Choose Your Vehicle', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreditChecker />
      </MockedProvider>,
    );

    await waitFor(() => expect(screen.getByText('Choose Your Vehicle')));
    fireEvent.click(screen.getByText('Choose Your Vehicle'));
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith('/car-leasing/'),
    );
  });
});
