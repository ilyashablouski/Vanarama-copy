import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';
import CustomiseLease from '../CustomiseLease';
import { IProps } from '../interface';
import {
  LeaseTypeEnum,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';

jest.mock('next/router');

function getComponent(props: IProps) {
  return renderer.create(<CustomiseLease {...props} />).toJSON();
}

describe('<CustomiseLease />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  it('renders correctly', () => {
    const tree = getComponent({
      mileage: 6000,
      colour: 13990,
      trim: 112981,
      screenY: 0,
      colourList: [{ optionId: 13990, label: 'Solid - Polar white' }],
      trimList: [{ optionId: 104562, label: 'Leather - Cranberry red' }],
      terms: [
        { label: '24', value: '24', active: false },
        { label: '36', value: '36', active: true },
      ],
      upfronts: [
        { label: '1', value: '1', active: false },
        { label: '3', value: '3', active: true },
      ],
      leaseTypes: [
        { label: 'Personal', value: 'Personal', active: false },
        { label: 'Business', value: 'Business', active: true },
      ],
      mileages: [6000, 8000, 10000],
      setLeaseType: jest.fn(),
      leaseType: LeaseTypeEnum.PERSONAL,
      setMileage: jest.fn(),
      setUpfront: jest.fn(),
      setColour: jest.fn(),
      setTerm: jest.fn(),
      setTrim: jest.fn(),
      data: {
        quoteByCapId: {
          colour: '13990',
          leadTime: '14-21 Day Delivery',
          leaseType: LeaseTypeEnum.PERSONAL,
          maintenanceCost: {
            monthlyRental: 61.75,
            initialRental: 61.75,
            excessMileage: 0,
          },
          mileage: 8000,
          leaseCost: {
            monthlyRental: 605.95,
            initialRental: 605.95,
            excessMileage: 14.76,
          },
          nextBestPrice: {
            maintained: 70,
            nonMaintained: 60,
          },
          processingFee: 0,
          stock: 'Brand New - ',
          term: 24,
          funderId: 3,
          trim: '112981',
          upfront: 1,
          vehicleType: VehicleTypeEnum.CAR,
        },
      },
      isModalShowing: false,
      setIsModalShowing: jest.fn(),
      setMaintenance: jest.fn(),
      maintenance: false,
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
        range: {
          name: '',
          slug: '',
        },
        model: {
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
        trims: [{ id: '104562', optionDescription: 'Leather - Cranberry red' }],
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
      },
      isDisabled: false,
      setIsInitialLoading: jest.fn(),
      setIsDisabled: jest.fn(),
      onSubmit: jest.fn(),
      showCallBackForm: jest.fn(),
      lineItem: {} as any,
    });

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = getComponent({
      trim: 112981,
      colourList: [{ optionId: 13990, label: 'Solid - Polar white' }],
      trimList: [{ optionId: 104562, label: 'Leather - Cranberry red' }],
      colour: 13990,
      terms: [
        { label: '24', value: '24', active: false },
        { label: '36', value: '36', active: true },
      ],
      upfronts: [
        { label: '1', value: '1', active: false },
        { label: '3', value: '3', active: true },
      ],
      leaseTypes: [
        { label: 'Personal', value: 'Personal', active: false },
        { label: 'Business', value: 'Business', active: true },
      ],
      isModalShowing: false,
      setIsModalShowing: jest.fn(),
      setMaintenance: jest.fn(),
      maintenance: false,
      mileage: 6000,
      mileages: [6000, 8000, 10000],
      setLeaseType: jest.fn(),
      leaseType: LeaseTypeEnum.PERSONAL,
      setMileage: jest.fn(),
      setUpfront: jest.fn(),
      setColour: jest.fn(),
      setTerm: jest.fn(),
      setTrim: jest.fn(),
      showCallBackForm: jest.fn(),
      isDisabled: false,
      setIsInitialLoading: jest.fn(),
      setIsDisabled: jest.fn(),
      screenY: 0,
      data: {
        quoteByCapId: {
          colour: '13990',
          leadTime: '14-21 Day Delivery',
          leaseType: LeaseTypeEnum.BUSINESS,
          funderId: 3,
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
          trim: '112981',
          upfront: 1,
          vehicleType: VehicleTypeEnum.CAR,
        },
      },
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
        trims: [{ id: '104562', optionDescription: 'Leather - Cranberry red' }],
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
      },
      onSubmit: jest.fn(),
      lineItem: {} as any,
    });
    expect(tree).toMatchSnapshot();
  });

  const resetMocks = () => {
    return {
      setTerm: jest.fn(),
      setLeaseType: jest.fn(),
      setMileage: jest.fn(),
      setUpfront: jest.fn(),
      setColour: jest.fn(),
      setTrim: jest.fn(),
      setMaintenance: jest.fn(),
      setIsModalShowing: jest.fn(),
      setLeadTime: jest.fn(),
      setIsInitialLoading: jest.fn(),
      setIsDisabled: jest.fn(),
    };
  };

  let mocks = resetMocks();
  beforeEach(() => {
    mocks = resetMocks();
  });

  it('change correctly', async () => {
    render(
      <CustomiseLease
        {...mocks}
        trim={112981}
        colour={13990}
        screenY={0}
        isDisabled={false}
        terms={[
          { label: '24', value: '24', active: false },
          { label: '36', value: '36', active: true },
          { label: '50', value: '50', active: false },
          { label: '77', value: '77', active: false },
        ]}
        upfronts={[
          { label: '1', value: '1', active: false },
          { label: '3', value: '3', active: true },
        ]}
        leaseTypes={[
          { label: 'Personal', value: 'Personal', active: false },
          { label: 'Business', value: ' Business', active: true },
        ]}
        mileage={6000}
        mileages={[6000, 8000, 10000]}
        leaseType={LeaseTypeEnum.PERSONAL}
        isModalShowing={false}
        maintenance={false}
        colourList={[
          { optionId: 13990, label: 'Solid - Polar white' },
          { optionId: 13991, label: 'Solid - Polar black' },
        ]}
        trimList={[
          { optionId: 104562, label: 'Leather - Cranberry red' },
          { optionId: 104563, label: 'Leather - Cranberry black' },
        ]}
        data={{
          quoteByCapId: {
            colour: '13990',
            leadTime: '14-21 Day Delivery',
            leaseType: LeaseTypeEnum.BUSINESS,
            funderId: 3,
            nextBestPrice: {
              maintained: 70,
              nonMaintained: 60,
            },
            leaseCost: {
              monthlyRental: 61.75,
              initialRental: 61.75,
              excessMileage: 0,
            },
            mileage: 8000,
            maintenanceCost: {
              monthlyRental: 605.95,
              initialRental: 605.95,
              excessMileage: 14.76,
            },
            processingFee: 0,
            stock: 'Brand New - ',
            term: 24,
            trim: '112981',
            upfront: 1,
            vehicleType: VehicleTypeEnum.CAR,
          },
        }}
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
          colours: [
            { id: '13990', optionDescription: 'Solid - Polar white' },
            { id: '13991', optionDescription: 'Solid - Polar black' },
          ],
          trims: [
            { id: '104562', optionDescription: 'Leather - Cranberry red' },
            { id: '104563', optionDescription: 'Leather - Cranberry black' },
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
        }}
        onSubmit={jest.fn()}
        showCallBackForm={jest.fn()}
        lineItem={{} as any}
      />,
    );

    fireEvent.click(screen.getByText('77'));
    expect(mocks.setTerm).toBeCalled();

    fireEvent.click(screen.getByText('1'));
    expect(mocks.setUpfront).toBeCalled();

    fireEvent.click(screen.getByText('Personal'));
    expect(mocks.setLeaseType).toBeCalled();

    fireEvent.change(screen.getByTestId('13990'));
    fireEvent.click(screen.getByText('Solid - Polar black'));
    expect(mocks.setColour).toBeCalled();

    fireEvent.change(screen.getByTestId('112981'));
    fireEvent.click(screen.getByText('Leather - Cranberry black'));
    expect(mocks.setTrim).toBeCalled();

    fireEvent.click(
      screen.getByText(
        'YES, I want peace of mind and to keep things hassle-free',
      ),
    );
    expect(mocks.setMaintenance).toBeCalled();

    fireEvent.click(screen.getByText("See What's Included"));
    expect(mocks.setIsModalShowing).toBeCalled();
  });
});
