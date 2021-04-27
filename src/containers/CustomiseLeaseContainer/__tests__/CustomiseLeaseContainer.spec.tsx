import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CustomiseLeaseContainer from '../CustomiseLeaseContainer';
import { useQuoteDataLazyQuery } from '../gql';
import { IProps } from '../interfaces';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { useOpportunityCreation } from '../../GoldrushFormContainer/gql';

jest.mock('../gql');
jest.mock('../../GoldrushFormContainer/gql');

const getComponent = (props: IProps) => {
  return renderer.create(<CustomiseLeaseContainer {...props} />).toJSON();
};

describe('<CustomiseLeaseContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  (useOpportunityCreation as jest.Mock).mockReturnValue([
    () => {},
    { loading: false },
  ]);

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  it('should show data correctly', async () => {
    const data = {
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
    } as any;
    (useQuoteDataLazyQuery as jest.Mock).mockReturnValue([
      () => {},
      {
        loading: false,
        data,
        error: undefined,
        refetch: jest.fn(),
        leaseType: 'Personal',
        setLeaseType: jest.fn(),
      },
    ]);

    render(
      <CustomiseLeaseContainer
        quote={data}
        capId={84429}
        colourData={[{ optionId: 13990, label: 'Solid - Polar white' }]}
        trimData={[{ optionId: 104562, label: 'Leather - Cranberry red' }]}
        vehicleType={VehicleTypeEnum.CAR}
        onCompletedCallBack={jest.fn()}
        setLeadTime={jest.fn()}
        isDisabled={false}
        setIsDisabled={jest.fn()}
        leaseAdjustParams={{
          mileages: [6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000],
          terms: [24, 36, 48, 60],
          upfronts: [1, 3, 6, 9, 12],
        }}
        derivativeInfo={{
          name: '',
          manufacturer: {
            name: '',
            slug: '',
          },
          model: {
            name: '',
            slug: '',
          },
          range: {
            name: '',
            slug: '',
          },
          transmission: {
            name: 'Manual',
          },
          bodyStyle: {
            name: 'Hatchback',
          },
          bodyType: {
            name: 'Hatchback',
            slug: 'hatchback',
          },
          fuelType: {
            name: 'Diesel',
          },
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
              unit: 'kg',
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
        mileage={6000}
        setMileage={jest.fn()}
      />,
    );

    expect(screen.getByText('12000 Miles'));

    expect(screen.getByText('24 Months - 2 Years'));

    fireEvent.click(screen.getByText('Business'));

    await waitFor(() => {
      expect(screen.getByText('12000 Miles'));
    });

    await waitFor(() => {
      expect(screen.getByText('24 Months - 2 Years'));
    });

    await waitFor(() => {
      expect(screen.getByText('PM exc. VAT'));
    });
  });

  it('should show data correctly with data', async () => {
    const data = {
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
    } as any;
    (useQuoteDataLazyQuery as jest.Mock).mockReturnValue([
      () => {},
      {
        loading: false,
        data,
        error: undefined,
        refetch: jest.fn(),
      },
    ]);

    const tree = getComponent({
      quote: data,
      capId: 84429,
      colourData: [{ optionId: 13990, label: 'Solid - Polar white' }],
      trimData: [{ optionId: 104562, label: 'Leather - Cranberry red' }],
      vehicleType: VehicleTypeEnum.CAR,
      setLeadTime: jest.fn(),
      isDisabled: false,
      setIsDisabled: jest.fn(),
      leaseAdjustParams: {
        mileages: [6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000],
        terms: [24, 36, 48, 60],
        upfronts: [1, 3, 6, 9, 12],
      },
      derivativeInfo: {
        name: '',
        manufacturer: {
          name: '',
          slug: '',
        },
        model: {
          name: '',
          slug: '',
        },
        range: {
          name: '',
          slug: '',
        },
        transmission: {
          name: 'Manual',
        },
        bodyStyle: {
          name: 'Hatchback',
        },
        bodyType: {
          name: 'Hatchback',
          slug: 'hatchback',
        },
        fuelType: {
          name: 'Diesel',
        },
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
            unit: 'kg',
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
      onCompletedCallBack: jest.fn(),
      mileage: 6000,
      setMileage: jest.fn(),
    });
    expect(tree).toMatchSnapshot();
  });

  it('should show data correctly with data', async () => {
    (useQuoteDataLazyQuery as jest.Mock).mockReturnValue([
      () => {},
      {
        loading: true,
        data: undefined,
        error: undefined,
        refetch: jest.fn(),
      },
    ]);

    const tree = getComponent({
      capId: 84429,
      vehicleType: VehicleTypeEnum.CAR,
      colourData: [{ optionId: 13990, label: 'Solid - Polar white' }],
      trimData: [{ optionId: 104562, label: 'Leather - Cranberry red' }],
      isDisabled: false,
      setIsDisabled: jest.fn(),
      onCompletedCallBack: jest.fn(),
      setLeadTime: jest.fn(),
      leaseAdjustParams: {
        mileages: [6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000],
        terms: [24, 36, 48, 60],
        upfronts: [1, 3, 6, 9, 12],
      },
      derivativeInfo: {
        name: '',
        model: {
          name: '',
          slug: '',
        },
        manufacturer: {
          name: '',
          slug: '',
        },
        range: {
          name: '',
          slug: '',
        },
        transmission: {
          name: 'Manual',
        },
        bodyStyle: {
          name: 'Hatchback',
        },
        bodyType: {
          name: 'Hatchback',
          slug: 'hatchback',
        },
        fuelType: {
          name: 'Diesel',
        },
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
            unit: 'kg',
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
      mileage: 6000,
      setMileage: jest.fn(),
    });
    expect(tree).toMatchSnapshot();
  });

  it('should show data correctly', async () => {
    const data = {
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
    } as any;
    (useQuoteDataLazyQuery as jest.Mock).mockReturnValue([
      () => {},
      {
        loading: false,
        data,
        onCompleted: () => data,
        error: undefined,
        refetch: jest.fn(),
        leaseType: 'Personal',
        setLeaseType: jest.fn(),
      },
    ]);

    render(
      <CustomiseLeaseContainer
        quote={data}
        capId={84429}
        colourData={[{ optionId: 13990, label: 'Solid - Polar white' }]}
        trimData={[{ optionId: 104562, label: 'Leather - Cranberry red' }]}
        onCompletedCallBack={jest.fn()}
        vehicleType={VehicleTypeEnum.CAR}
        setLeadTime={jest.fn()}
        isDisabled={false}
        setIsDisabled={jest.fn()}
        leaseAdjustParams={{
          mileages: [6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000],
          terms: [24, 36, 48, 60],
          upfronts: [1, 3, 6, 9, 12],
        }}
        derivativeInfo={{
          name: '',
          manufacturer: {
            name: '',
            slug: '',
          },
          model: {
            name: '',
            slug: '',
          },
          range: {
            name: '',
            slug: '',
          },
          transmission: {
            name: 'Manual',
          },
          bodyStyle: {
            name: 'Hatchback',
          },
          bodyType: {
            name: 'Hatchback',
            slug: 'hatchback',
          },
          fuelType: {
            name: 'Diesel',
          },
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
              unit: 'kg',
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
        mileage={6000}
        setMileage={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByText('Request a Call Back'));

    await waitFor(() => {
      expect(screen.getByText('Please Fill In Your Details'));
    });
  });
});
