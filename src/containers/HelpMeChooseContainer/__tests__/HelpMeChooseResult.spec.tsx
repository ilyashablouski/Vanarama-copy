import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { ApolloProvider } from '@apollo/client';
import HelpMeChooseResult from '../HelpMeChooseBlocks/HelpMeChooseResult';
import {
  FinanceTypeEnum,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';
import createApolloClient from '../../../apolloClient';
import { OnOffer } from '../../../../entities/global';

const client = createApolloClient({});

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockPush,
      query: {
        financeTypes: 'PCH',
        bodyStyles: '',
        fuelTypes: '',
        transmissions: '',
        terms: '',
        mileages: '',
        availability: '',
        rental: '350',
        initialPeriods: '6',
      },
    };
  },
}));

const steps = {
  financeTypes: {
    active: false,
    value: ['PCH'],
    title: 'About you',
  },
  bodyStyles: {
    active: false,
    value: [],
    title: 'Style',
  },
  fuelTypes: {
    active: false,
    value: [],
    title: 'Fuel Types',
  },
  transmissions: {
    active: false,
    value: [],
    title: 'Gearbox',
  },
  terms: {
    active: false,
    value: [],
    title: 'Lease Length',
  },
  mileages: {
    active: false,
    value: [],
    title: 'Mileage',
  },
  availability: {
    active: false,
    value: [],
    title: 'Availability',
  },
  rental: {
    active: true,
    value: '350',
    title: 'Results',
  },
  initialPeriods: {
    active: true,
    value: '6',
    title: 'Results',
  },
};
const resultsData = [
  {
    availability: 7,
    lqBodyStyle: 'Hatchback',
    derivativeId: '1',
    derivativeName: '60kW EQ Pulse Premium 17kWh 5 Doors Auto [22kWch]',
    financeType: FinanceTypeEnum.PCH,
    fuelType: 'Electric',
    initialPayment: 899.64,
    lqUrl:
      'smart-car-leasing/forfour/forfour-electric-hatchback/60kw-eq-pulse-premium-17kwh-5dr-auto-22kwch-166453.html',
    manufacturerName: 'Smart',
    mileage: 6000,
    modelName: 'Forfour Electric Hatchback',
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    rangeName: 'Forfour',
    rental: 149.94,
    term: 48,
    transmission: 'Automatic',
    url:
      'car-leasing/smart/forfour/electric-hatchback/60kw-eq-pulse-premium-17kwh-5-doors-auto-22kwch-2020',
    vehicleType: VehicleTypeEnum.CAR,
  },
  {
    availability: 7,
    lqBodyStyle: 'Hatchback',
    derivativeId: '2',
    derivativeName: '60kW EQ Pulse Premium 17kWh 5 Doors Auto [22kWch]',
    financeType: FinanceTypeEnum.PCH,
    fuelType: 'Electric',
    initialPayment: 899.64,
    lqUrl:
      'smart-car-leasing/forfour/forfour-electric-hatchback/60kw-eq-pulse-premium-17kwh-5dr-auto-22kwch-166453.html',
    manufacturerName: 'Smart',
    mileage: 6000,
    modelName: 'Forfour Electric Hatchback',
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    rangeName: 'Forfour',
    rental: 149.94,
    term: 48,
    transmission: 'Automatic',
    url:
      'car-leasing/smart/forfour/electric-hatchback/60kw-eq-pulse-premium-17kwh-5-doors-auto-22kwch-2020',
    vehicleType: VehicleTypeEnum.CAR,
  },
  {
    availability: 7,
    lqBodyStyle: 'Hatchback',
    derivativeId: '3',
    derivativeName: '60kW EQ Pulse Premium 17kWh 5 Doors Auto [22kWch]',
    financeType: FinanceTypeEnum.PCH,
    fuelType: 'Electric',
    initialPayment: 899.64,
    lqUrl:
      'smart-car-leasing/forfour/forfour-electric-hatchback/60kw-eq-pulse-premium-17kwh-5dr-auto-22kwch-166453.html',
    manufacturerName: 'Smart',
    mileage: 6000,
    modelName: 'Forfour Electric Hatchback',
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    rangeName: 'Forfour',
    rental: 149.94,
    term: 48,
    transmission: 'Automatic',
    url:
      'car-leasing/smart/forfour/electric-hatchback/60kw-eq-pulse-premium-17kwh-5-doors-auto-22kwch-2020',
    vehicleType: VehicleTypeEnum.CAR,
  },
  {
    availability: 7,
    lqBodyStyle: 'Hatchback',
    derivativeId: '4',
    derivativeName: '60kW EQ Pulse Premium 17kWh 5 Doors Auto [22kWch]',
    financeType: FinanceTypeEnum.PCH,
    fuelType: 'Electric',
    initialPayment: 899.64,
    lqUrl:
      'smart-car-leasing/forfour/forfour-electric-hatchback/60kw-eq-pulse-premium-17kwh-5dr-auto-22kwch-166453.html',
    manufacturerName: 'Smart',
    mileage: 6000,
    modelName: 'Forfour Electric Hatchback',
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    rangeName: 'Forfour',
    rental: 149.94,
    term: 48,
    transmission: 'Automatic',
    url:
      'car-leasing/smart/forfour/electric-hatchback/60kw-eq-pulse-premium-17kwh-5-doors-auto-22kwch-2020',
    vehicleType: VehicleTypeEnum.CAR,
  },
  {
    availability: 7,
    lqBodyStyle: 'Hatchback',
    derivativeId: '5',
    derivativeName: '60kW EQ Pulse Premium 17kWh 5 Doors Auto [22kWch]',
    financeType: FinanceTypeEnum.PCH,
    fuelType: 'Electric',
    initialPayment: 899.64,
    lqUrl:
      'smart-car-leasing/forfour/forfour-electric-hatchback/60kw-eq-pulse-premium-17kwh-5dr-auto-22kwch-166453.html',
    manufacturerName: 'Smart',
    mileage: 6000,
    modelName: 'Forfour Electric Hatchback',
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    rangeName: 'Forfour',
    rental: 149.94,
    term: 48,
    transmission: 'Automatic',
    url:
      'car-leasing/smart/forfour/electric-hatchback/60kw-eq-pulse-premium-17kwh-5-doors-auto-22kwch-2020',
    vehicleType: VehicleTypeEnum.CAR,
  },
  {
    availability: 7,
    lqBodyStyle: 'Hatchback',
    derivativeId: '6',
    derivativeName: '60kW EQ Pulse Premium 17kWh 5 Doors Auto [22kWch]',
    financeType: FinanceTypeEnum.PCH,
    fuelType: 'Electric',
    initialPayment: 899.64,
    lqUrl:
      'smart-car-leasing/forfour/forfour-electric-hatchback/60kw-eq-pulse-premium-17kwh-5dr-auto-22kwch-166453.html',
    manufacturerName: 'Smart',
    mileage: 6000,
    modelName: 'Forfour Electric Hatchback',
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    rangeName: 'Forfour',
    rental: 149.94,
    term: 48,
    transmission: 'Automatic',
    url:
      'car-leasing/smart/forfour/electric-hatchback/60kw-eq-pulse-premium-17kwh-5-doors-auto-22kwch-2020',
    vehicleType: VehicleTypeEnum.CAR,
  },
  {
    availability: 7,
    lqBodyStyle: 'Hatchback',
    derivativeId: '7',
    derivativeName: '60kW EQ Pulse Premium 17kWh 5 Doors Auto [22kWch]',
    financeType: FinanceTypeEnum.PCH,
    fuelType: 'Electric',
    initialPayment: 899.64,
    lqUrl:
      'smart-car-leasing/forfour/forfour-electric-hatchback/60kw-eq-pulse-premium-17kwh-5dr-auto-22kwch-166453.html',
    manufacturerName: 'Smart',
    mileage: 6000,
    modelName: 'Forfour Electric Hatchback',
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    rangeName: 'Forfour',
    rental: 149.94,
    term: 48,
    transmission: 'Automatic',
    url:
      'car-leasing/smart/forfour/electric-hatchback/60kw-eq-pulse-premium-17kwh-5-doors-auto-22kwch-2020',
    vehicleType: VehicleTypeEnum.CAR,
  },
  {
    availability: 7,
    lqBodyStyle: 'Hatchback',
    derivativeId: '8',
    derivativeName: '60kW EQ Pulse Premium 17kWh 5 Doors Auto [22kWch]',
    financeType: FinanceTypeEnum.PCH,
    fuelType: 'Electric',
    initialPayment: 899.64,
    lqUrl:
      'smart-car-leasing/forfour/forfour-electric-hatchback/60kw-eq-pulse-premium-17kwh-5dr-auto-22kwch-166453.html',
    manufacturerName: 'Smart',
    mileage: 6000,
    modelName: 'Forfour Electric Hatchback',
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    rangeName: 'Forfour',
    rental: 149.94,
    term: 48,
    transmission: 'Automatic',
    url:
      'car-leasing/smart/forfour/electric-hatchback/60kw-eq-pulse-premium-17kwh-5-doors-auto-22kwch-2020',
    vehicleType: VehicleTypeEnum.CAR,
  },
  {
    availability: 7,
    lqBodyStyle: 'Hatchback',
    derivativeId: '9',
    derivativeName: '60kW EQ Pulse Premium 17kWh 5 Doors Auto [22kWch]',
    financeType: FinanceTypeEnum.PCH,
    fuelType: 'Electric',
    initialPayment: 899.64,
    lqUrl:
      'smart-car-leasing/forfour/forfour-electric-hatchback/60kw-eq-pulse-premium-17kwh-5dr-auto-22kwch-166453.html',
    manufacturerName: 'Smart',
    mileage: 6000,
    modelName: 'Forfour Electric Hatchback',
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    rangeName: 'Forfour',
    rental: 149.94,
    term: 48,
    transmission: 'Automatic',
    url:
      'car-leasing/smart/forfour/electric-hatchback/60kw-eq-pulse-premium-17kwh-5-doors-auto-22kwch-2020',
    vehicleType: VehicleTypeEnum.CAR,
  },
  {
    availability: 7,
    lqBodyStyle: 'Hatchback',
    derivativeId: '10',
    derivativeName: '60kW EQ Pulse Premium 17kWh 5 Doors Auto [22kWch]',
    financeType: FinanceTypeEnum.PCH,
    fuelType: 'Electric',
    initialPayment: 899.64,
    lqUrl:
      'smart-car-leasing/forfour/forfour-electric-hatchback/60kw-eq-pulse-premium-17kwh-5dr-auto-22kwch-166453.html',
    manufacturerName: 'Smart',
    mileage: 6000,
    modelName: 'Forfour Electric Hatchback',
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    rangeName: 'Forfour',
    rental: 149.94,
    term: 48,
    transmission: 'Automatic',
    url:
      'car-leasing/smart/forfour/electric-hatchback/60kw-eq-pulse-premium-17kwh-5-doors-auto-22kwch-2020',
    vehicleType: VehicleTypeEnum.CAR,
  },
  {
    availability: 7,
    lqBodyStyle: 'Hatchback',
    derivativeId: '11',
    derivativeName: '60kW EQ Pulse Premium 17kWh 5 Doors Auto [22kWch]',
    financeType: FinanceTypeEnum.PCH,
    fuelType: 'Electric',
    initialPayment: 899.64,
    lqUrl:
      'smart-car-leasing/forfour/forfour-electric-hatchback/60kw-eq-pulse-premium-17kwh-5dr-auto-22kwch-166453.html',
    manufacturerName: 'Smart',
    mileage: 6000,
    modelName: 'Forfour Electric Hatchback',
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    rangeName: 'Forfour',
    rental: 149.94,
    term: 48,
    transmission: 'Automatic',
    url:
      'car-leasing/smart/forfour/electric-hatchback/60kw-eq-pulse-premium-17kwh-5-doors-auto-22kwch-2020',
    vehicleType: VehicleTypeEnum.CAR,
  },
  {
    availability: 7,
    lqBodyStyle: 'Hatchback',
    derivativeId: '12',
    derivativeName: '60kW EQ Pulse Premium 17kWh 5 Doors Auto [22kWch]',
    financeType: FinanceTypeEnum.PCH,
    fuelType: 'Electric',
    initialPayment: 899.64,
    lqUrl:
      'smart-car-leasing/forfour/forfour-electric-hatchback/60kw-eq-pulse-premium-17kwh-5dr-auto-22kwch-166453.html',
    manufacturerName: 'Smart',
    mileage: 6000,
    modelName: 'Forfour Electric Hatchback',
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    rangeName: 'Forfour',
    rental: 149.94,
    term: 48,
    transmission: 'Automatic',
    url:
      'car-leasing/smart/forfour/electric-hatchback/60kw-eq-pulse-premium-17kwh-5-doors-auto-22kwch-2020',
    vehicleType: VehicleTypeEnum.CAR,
  },
  {
    availability: 7,
    lqBodyStyle: 'Hatchback',
    derivativeId: '13',
    derivativeName: '60kW EQ Pulse Premium 17kWh 5 Doors Auto [22kWch]',
    financeType: FinanceTypeEnum.PCH,
    fuelType: 'Electric',
    initialPayment: 899.64,
    lqUrl:
      'smart-car-leasing/forfour/forfour-electric-hatchback/60kw-eq-pulse-premium-17kwh-5dr-auto-22kwch-166453.html',
    manufacturerName: 'Smart',
    mileage: 6000,
    modelName: 'Forfour Electric Hatchback',
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    rangeName: 'Forfour',
    rental: 149.94,
    term: 48,
    transmission: 'Automatic',
    url:
      'car-leasing/smart/forfour/electric-hatchback/60kw-eq-pulse-premium-17kwh-5-doors-auto-22kwch-2020',
    vehicleType: VehicleTypeEnum.CAR,
  },
];
const helpMeChooseData = {
  data: {
    helpMeChoose: {
      aggregation: {
        totalVehicles: 30,
      },
    },
  },
};

describe('<HelpMeChooseResult />', () => {
  beforeEach(async () => {
    await preloadAll();
  });

  it('should render correct', () => {
    const three = renderer
      .create(
        <ApolloProvider client={client}>
          <HelpMeChooseResult
            setLoadingStatus={jest.fn()}
            setCounterState={jest.fn()}
            counterState={1}
            resultsData={resultsData}
            setResultsData={jest.fn()}
            setPageOffset={jest.fn()}
            steps={steps}
            helpMeChooseData={helpMeChooseData}
            dataUiTestId="test-ui-id"
          />
        </ApolloProvider>,
      )
      .toJSON();

    expect(three).toMatchSnapshot();
  });

  it('test for onClearClick function ', () => {
    const setLoadingStatusMock = jest.fn();
    const setCounterStateMock = jest.fn();
    const setResultsData = jest.fn();
    const setPageOffset = jest.fn();
    render(
      <ApolloProvider client={client}>
        <HelpMeChooseResult
          setLoadingStatus={setLoadingStatusMock}
          setCounterState={setCounterStateMock}
          counterState={1}
          resultsData={resultsData}
          setResultsData={setResultsData}
          setPageOffset={setPageOffset}
          steps={steps}
          helpMeChooseData={helpMeChooseData}
          dataUiTestId="test-ui-id-2"
        />
      </ApolloProvider>,
    );

    expect(screen.getByText('Load More')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Search Again'));
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(setLoadingStatusMock).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Load More'));
    expect(setCounterStateMock).toHaveBeenCalledWith(2);
    expect(setResultsData).toHaveBeenCalledTimes(1);
    expect(setResultsData).toHaveBeenCalledTimes(1);
  });
});
