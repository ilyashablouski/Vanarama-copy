import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CustomiseLeaseContainer from './CustomiseLeaseContainer';
import { useQuoteData } from './gql';
import { IProps } from './interfaces';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { useOpportunityCreation } from '../GoldrushFormContainer/gql';

jest.mock('./gql');
jest.mock('../GoldrushFormContainer/gql');

const getComponent = (props: IProps) => {
  return renderer.create(<CustomiseLeaseContainer {...props} />).toJSON();
};

describe('<CustomiseLeaseContainer />', () => {
  (useOpportunityCreation as jest.Mock).mockReturnValue([
    () => {},
    { loading: false },
  ]);

  it('should show data correctly', async () => {
    (useQuoteData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        quoteByCapId: {
          colour: '13990',
          leadTime: '14-21 Day Delivery',
          leaseType: 'PERSONAL',
          maintained: {
            monthlyRental: 61.75,
            initialRental: 61.75,
            excessMileage: 0,
          },
          mileage: 12000,
          nonMaintained: {
            monthlyRental: 605.95,
            initialRental: 605.95,
            excessMileage: 14.76,
          },
          leaseCost: {
            monthlyRental: 123,
          },
          processingFee: 0,
          stock: 'Brand New - ',
          term: 24,
          trim: '112981',
          upfront: 1,
          vehicleType: 'CAR',
        },
      },
      error: undefined,
      refetch: jest.fn(),
      leaseType: 'Personal',
      setLeaseType: jest.fn(),
    });

    render(
      <CustomiseLeaseContainer
        capId={84429}
        vehicleType={VehicleTypeEnum.CAR}
        setLeadTime={jest.fn()}
        leaseAdjustParams={{
          mileages: [6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000],
          terms: [24, 36, 48, 60],
          upfronts: [1, 3, 6, 9, 12],
        }}
        derivativeInfo={{
          colours: [{ id: '13990', optionDescription: 'Solid - Polar white' }],
          technicals: [
            {
              categoryDescription: 'Weight and Capacities',
              derivativeId: '84429',
              effectiveFrom: '2019-07-01T00:00:00.000Z',
              effectiveTo: null,
              id: '3',
              technicalDescription: 'Minimum Kerbweight',
              technicalLongDescription: 'Minimum Kerbweight',
              value: '1515',
            },
          ],
          standardEquipments: [
            {
              categoryDescription: 'Body Glass',
              derivativeId: '84429',
              effectiveFrom: '2018-06-01T00:00:00.000Z',
              effectiveTo: null,
              genericDescription: null,
              id: '1475',
              optionDescription: 'Green tinted glass',
              optionLongDescription: 'Green tinted glass',
            },
          ],
          trims: [
            { id: '104562', optionDescription: 'Leather - Cranberry red' },
          ],
        }}
        leaseType="Business"
        setLeaseType={jest.fn()}
        onCompleted={jest.fn()}
      />,
    );

    expect(screen.getByText('12000 Miles'));

    expect(screen.getByText('24 Months'));

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

  it('should show data correctly with data', async () => {
    (useQuoteData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        quoteByCapId: {
          colour: '13990',
          leadTime: '14-21 Day Delivery',
          leaseType: 'BUSINESS',
          maintained: {
            monthlyRental: 61.75,
            initialRental: 61.75,
            excessMileage: 0,
          },
          mileage: 12000,
          nonMaintained: {
            monthlyRental: 605.95,
            initialRental: 605.95,
            excessMileage: 14.76,
          },
          processingFee: 0,
          stock: 'Brand New - ',
          term: 24,
          trim: '112981',
          upfront: 1,
          vehicleType: 'CAR',
        },
      },
      error: undefined,
      refetch: jest.fn(),
    });

    const tree = getComponent({
      capId: 84429,
      vehicleType: VehicleTypeEnum.CAR,
      setLeadTime: jest.fn(),
      leaseAdjustParams: {
        mileages: [6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000],
        terms: [24, 36, 48, 60],
        upfronts: [1, 3, 6, 9, 12],
      },
      derivativeInfo: {
        colours: [{ id: '13990', optionDescription: 'Solid - Polar white' }],
        technicals: [
          {
            categoryDescription: 'Weight and Capacities',
            derivativeId: '84429',
            effectiveFrom: '2019-07-01T00:00:00.000Z',
            effectiveTo: null,
            id: '3',
            technicalDescription: 'Minimum Kerbweight',
            technicalLongDescription: 'Minimum Kerbweight',
            value: '1515',
          },
        ],
        standardEquipments: [
          {
            categoryDescription: 'Body Glass',
            derivativeId: '84429',
            effectiveFrom: '2018-06-01T00:00:00.000Z',
            effectiveTo: null,
            genericDescription: null,
            id: '1475',
            optionDescription: 'Green tinted glass',
            optionLongDescription: 'Green tinted glass',
          },
        ],
        trims: [{ id: '104562', optionDescription: 'Leather - Cranberry red' }],
      },
      leaseType: 'Personal',
      setLeaseType: jest.fn(),
      onCompleted: jest.fn(),
    });
    expect(tree).toMatchSnapshot();
  });

  it('should show data correctly with data', async () => {
    (useQuoteData as jest.Mock).mockReturnValue({
      loading: true,
      data: false,
      error: undefined,
      refetch: jest.fn(),
    });

    const tree = getComponent({
      capId: 84429,
      vehicleType: VehicleTypeEnum.CAR,
      setLeadTime: jest.fn(),
      leaseAdjustParams: {
        mileages: [6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000],
        terms: [24, 36, 48, 60],
        upfronts: [1, 3, 6, 9, 12],
      },
      derivativeInfo: {
        colours: [{ id: '13990', optionDescription: 'Solid - Polar white' }],
        technicals: [
          {
            categoryDescription: 'Weight and Capacities',
            derivativeId: '84429',
            effectiveFrom: '2019-07-01T00:00:00.000Z',
            effectiveTo: null,
            id: '3',
            technicalDescription: 'Minimum Kerbweight',
            technicalLongDescription: 'Minimum Kerbweight',
            value: '1515',
          },
        ],
        standardEquipments: [
          {
            categoryDescription: 'Body Glass',
            derivativeId: '84429',
            effectiveFrom: '2018-06-01T00:00:00.000Z',
            effectiveTo: null,
            genericDescription: null,
            id: '1475',
            optionDescription: 'Green tinted glass',
            optionLongDescription: 'Green tinted glass',
          },
        ],
        trims: [{ id: '104562', optionDescription: 'Leather - Cranberry red' }],
      },
      leaseType: 'Personal',
      setLeaseType: jest.fn(),
      onCompleted: jest.fn(),
    });
    expect(tree).toMatchSnapshot();
  });
});
