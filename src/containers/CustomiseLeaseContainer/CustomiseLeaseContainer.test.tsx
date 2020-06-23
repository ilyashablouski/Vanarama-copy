import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import CustomiseLeaseContainer from './CustomiseLeaseContainer';
import { GET_DETAILS_DATA, GET_QUOTE_DATA } from './gql';

import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';

const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_DETAILS_DATA,
      variables: {
        capIdDetails: '84429',
        vehicleType: VehicleTypeEnum.CAR,
      },
    },
    result: {
      data: {
        derivativeInfo: {
          colours: [
            {
              id: '13990',
              optionDescription: 'Solid - Polar white',
              __typename: 'Colour',
            },
          ],
          id: '84429',
          name: 'C200 AMG Line Premium 2 Doors 9G-Tronic',
          trims: [
            {
              id: '15002',
              optionDescription: 'Leather - Black',
              __typename: 'Trim',
            },
          ],
          __typename: 'Derivative',
        },
        leaseAdjustParams: {
          mileages: [6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000],
          terms: [24, 36, 48, 60],
          upfronts: [1, 3, 6, 9, 12],
          __typename: 'LeaseAdjustType',
        },
      },
    },
  },
  {
    request: {
      query: GET_QUOTE_DATA,
      variables: {
        capId: '84429',
        colour: 13990,
        leaseType: LeaseTypeEnum.PERSONAL,
        mileage: 12000,
        term: 24,
        trim: 15002,
        upfront: 1,
        vehicleType: VehicleTypeEnum.CAR,
      },
    },
    result: {
      data: {
        quoteByCapId: {
          colour: '13990',
          leadTime: '14-21 Day Delivery',
          leaseType: 'PERSONAL',
          maintained: {
            monthlyRental: 61.75,
            initialRental: 61.75,
            excessMileage: 0,
            __typename: 'RentalCost',
          },
          mileage: 12000,
          nonMaintained: {
            monthlyRental: 605.95,
            initialRental: 605.95,
            excessMileage: 14.76,
            __typename: 'RentalCost',
          },
          processingFee: 0,
          stock: 'Brand New - ',
          term: 24,
          trim: '112981',
          upfront: 1,
          vehicleType: 'CAR',
          __typename: 'Quote',
        },
      },
    },
  },
  {
    request: {
      query: GET_QUOTE_DATA,
      variables: {
        capId: '84429',
        colour: 13990,
        leaseType: LeaseTypeEnum.BUSINESS,
        mileage: 12000,
        term: 24,
        trim: 15002,
        upfront: 1,
        vehicleType: VehicleTypeEnum.CAR,
      },
    },
    result: {
      data: {
        quoteByCapId: {
          colour: '13990',
          leadTime: '14-21 Day Delivery',
          leaseType: 'BUSINESS',
          maintained: {
            monthlyRental: 61.75,
            initialRental: 61.75,
            excessMileage: 0,
            __typename: 'RentalCost',
          },
          mileage: 12000,
          nonMaintained: {
            monthlyRental: 605.95,
            initialRental: 605.95,
            excessMileage: 14.76,
            __typename: 'RentalCost',
          },
          processingFee: 0,
          stock: 'Brand New - ',
          term: 24,
          trim: '112981',
          upfront: 1,
          vehicleType: 'CAR',
          __typename: 'Quote',
        },
      },
    },
  },
];

describe('<PersonalInformation />', () => {
  it('should show data correctly', async () => {
    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CustomiseLeaseContainer
          capId={84429}
          vehicleType={VehicleTypeEnum.CAR}
        />
      </MockedProvider>,
    );

    // // Wait for the initial query to resolve
    await waitFor(() => screen.getByText('Customise Your Lease'));

    // // ASSERT
    await waitFor(() => {
      expect(screen.getByText('12000 Miles'));
    });

    await waitFor(() => {
      expect(screen.getByText('24 Months'));
    });

    await waitFor(() => {
      expect(screen.getByText('£605.95 inc. VAT'));
    });

    fireEvent.click(screen.getByText('Business'));

    await waitFor(() => {
      expect(screen.getByText('12000 Miles'));
    });

    await waitFor(() => {
      expect(screen.getByText('24 Months'));
    });

    await waitFor(() => {
      expect(screen.getByText('PM exc. VAT'));
    });
  });
});
