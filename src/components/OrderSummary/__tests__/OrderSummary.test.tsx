import React from 'react';
import { render, screen } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import OrderSummary from '../OrderSummary';
import {
  LeaseTypeEnum,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';

jest.mock('next/router');

describe('<CustomiseLease />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly', () => {
    render(
      <OrderSummary
        quoteByCapId={{
          colour: '13990',
          funderId: 3,
          leadTime: '14-21 Day Delivery',
          leaseType: LeaseTypeEnum.PERSONAL,
          maintenanceCost: {
            monthlyRental: 61.75,
            initialRental: 61.75,
            excessMileage: 0,
          },
          nextBestPrice: {
            maintained: 70,
            nonMaintained: 60,
          },
          mileage: 8000,
          leaseCost: {
            monthlyRental: 605.95,
            initialRental: 605.95,
            excessMileage: 14.76,
          },
          processingFee: 0,
          stock: 'Brand New - ',
          term: 24,
          trim: '104562',
          upfront: 1,
          vehicleType: VehicleTypeEnum.CAR,
        }}
        colours={[{ id: '13990', optionDescription: 'Solid - Polar white' }]}
        trims={[{ id: '104562', optionDescription: 'Leather - Cranberry red' }]}
        trim={112981}
        stateVAT="inc"
        maintenance={false}
      />,
    );

    expect(screen.getByText('FREE')).toBeInTheDocument();

    expect(screen.getByText('24 months')).toBeInTheDocument();

    expect(screen.getByText('24 months')).toBeInTheDocument();

    expect(screen.getByText('8000 miles')).toBeInTheDocument();

    expect(screen.getByText('Solid - Polar white')).toBeInTheDocument();

    expect(screen.getByText('Leather - Cranberry red')).toBeInTheDocument();

    expect(screen.getByText('14-21 Day Delivery')).toBeInTheDocument();
  });
});
