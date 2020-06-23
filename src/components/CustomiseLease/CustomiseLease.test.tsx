import React from 'react';
import renderer from 'react-test-renderer';
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
      quoteData: {
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
      data: {
        derivativeInfo: {
          colours: [{ id: '13990', optionDescription: 'Solid - Polar white' }],
          id: '84429',
          name: 'Name',
          trims: [
            { id: '104562', optionDescription: 'Leather - Cranberry red' },
          ],
        },
        leaseAdjustParams: {
          mileages: [6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000],
          terms: [24, 36, 48, 60],
          upfronts: [1, 3, 6, 9, 12],
        },
      },
    });
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = getComponent({
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
      leaseType: LeaseTypeEnum.BUSINESS,
      setMileage: jest.fn(),
      setUpfront: jest.fn(),
      setColour: jest.fn(),
      setTerm: jest.fn(),
      setTrim: jest.fn(),
      quoteData: {
        quoteByCapId: {
          colour: '13990',
          leadTime: '14-21 Day Delivery',
          leaseType: LeaseTypeEnum.BUSINESS,
          maintained: {
            monthlyRental: 61.75,
            initialRental: 61.75,
            excessMileage: 0,
          },
          mileage: 6000,
          nonMaintained: {
            monthlyRental: 605.95,
            initialRental: 605.95,
            excessMileage: 14.76,
          },
          processingFee: 0,
          stock: 'Brand New - ',
          term: 36,
          trim: '112981',
          upfront: 1,
          vehicleType: VehicleTypeEnum.CAR,
        },
      },
      data: {
        derivativeInfo: {
          colours: [{ id: '13990', optionDescription: 'Solid - Polar white' }],
          id: '84429',
          name: 'Name',
          trims: [
            { id: '104562', optionDescription: 'Leather - Cranberry red' },
          ],
        },
        leaseAdjustParams: {
          mileages: [6000, 8000, 10000, 12000, 15000],
          terms: [24, 36, 48, 60],
          upfronts: [1, 3, 6, 9, 12],
        },
      },
    });
    expect(tree).toMatchSnapshot();
  });
});
