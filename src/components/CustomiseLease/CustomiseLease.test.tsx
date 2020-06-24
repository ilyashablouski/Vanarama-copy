import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';
import CustomiseLease from './CustomiseLease';
import { IProps } from './interfase';
import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';

jest.mock('next/router');

function getComponent(props: IProps) {
  return renderer.create(<CustomiseLease {...props} />).toJSON();
}

describe('<CustomiseLease />', () => {
  it('renders correctly', () => {
    const tree = getComponent({
      trim: 112981,
      terms: [
        { label: '24', active: true },
        { label: '36', active: false },
      ],
      upfronts: [
        { label: '1', active: true },
        { label: '3', active: false },
      ],
      leaseTypes: [
        { label: 'Personal', active: true },
        { label: 'Business', active: false },
      ],
      mileages: ['6K', '8K', '10K'],
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
          maintained: {
            monthlyRental: 61.75,
            initialRental: 61.75,
            excessMileage: 0,
          },
          mileage: 8000,
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
          vehicleType: VehicleTypeEnum.CAR,
        },
      },
      leaseAdjustParams: {
        mileages: [6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000],
        terms: [24, 36, 48, 60],
        upfronts: [1, 3, 6, 9, 12],
      },
      derivativeInfo: {
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
    });

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = getComponent({
      trim: 112981,
      terms: [
        { label: '24', active: false },
        { label: '36', active: true },
      ],
      upfronts: [
        { label: '1', active: false },
        { label: '3', active: true },
      ],
      leaseTypes: [
        { label: 'Personal', active: false },
        { label: 'Business', active: true },
      ],
      mileages: ['6K', '8K', '10K'],
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
          leaseType: LeaseTypeEnum.BUSINESS,
          maintained: {
            monthlyRental: 61.75,
            initialRental: 61.75,
            excessMileage: 0,
          },
          mileage: 8000,
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
          vehicleType: VehicleTypeEnum.CAR,
        },
      },
      leaseAdjustParams: {
        mileages: [6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000],
        terms: [24, 36, 48, 60],
        upfronts: [1, 3, 6, 9, 12],
      },
      derivativeInfo: {
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
        terms={[
          { label: '24', active: false },
          { label: '36', active: true },
          { label: '50', active: false },
          { label: '77', active: false },
        ]}
        upfronts={[
          { label: '1', active: false },
          { label: '3', active: true },
        ]}
        leaseTypes={[
          { label: 'Personal', active: false },
          { label: 'Business', active: true },
        ]}
        mileages={['6K', '8K', '10K']}
        leaseType={LeaseTypeEnum.PERSONAL}
        data={{
          quoteByCapId: {
            colour: '13990',
            leadTime: '14-21 Day Delivery',
            leaseType: LeaseTypeEnum.BUSINESS,
            maintained: {
              monthlyRental: 61.75,
              initialRental: 61.75,
              excessMileage: 0,
            },
            mileage: 8000,
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
            vehicleType: VehicleTypeEnum.CAR,
          },
        }}
        leaseAdjustParams={{
          mileages: [6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000],
          terms: [24, 36, 48, 60],
          upfronts: [1, 3, 6, 9, 12],
        }}
        derivativeInfo={{
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
  });
});
