/* eslint-disable @typescript-eslint/camelcase */
import { createOlafDetails, useFunderTerm } from '../helpers';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';
import { GetOlafData_orderByUuid } from '../../../../generated/GetOlafData';
import { DEFAULT_TERM } from '../../../models/enum/OlafVariables';

jest.mock('@apollo/client', () => ({
  useApolloClient: () => ({
    readQuery: () => ({
      creditApplicationByOrderUuid: {
        aboutDetails: {
          company_type: 'Limited',
        },
      },
    }),
  }),
  gql: jest.fn(),
}));

jest.mock('../../../gql/creditApplication');
describe('helpers', () => {
  describe('createOlafDetails', () => {
    it('should return new object', () => {
      const leaseType = LeaseTypeEnum.PERSONAL;
      const offer = {
        monthlyPayment: 600,
        depositPayment: 1200,
        depositMonths: 100,
        annualMileage: 50,
        maintenance: true,
        colour: 'colour',
        trim: 'trim',
        description: 'description',
        term: 100,
      } as any;
      const derivative = {
        fuelType: { name: 'fuelTypeName' },
        transmission: { name: 'transmissionName' },
      } as any;
      const actual = createOlafDetails(leaseType, offer, derivative);

      expect(actual).toEqual({
        price: 600,
        priceDescription: 'Per Month Inc.VAT',
        available: 'Now',
        initailRental: '£1200 (inc. VAT)',
        contractLength: '100 month',
        annualMileage: '50 miles',
        maintenance: 'Yes',
        fuel: derivative?.fuelType.name,
        transmission: derivative?.transmission.name,
        color: offer.colour,
        trim: offer.trim,
        description:
          '99 monthly payments (inc. VAT). Paid by direct debit. Initial Rental is taken around 10 days after delivery and each month on the same date thereafter for the length of the contract.',
        initialRentalDataTestId: 'about_intial-rental-testID',
        controlLengthDataTestId: 'about_control-length-testID',
        annualMileageDataTestId: 'about_annual-mileage-testID',
        annualMileageBoosterDataTestId: 'about_annual-milage-booster-testID',
        damageCoverDataTestId: 'about_damage-cover-testID',
        maintenanceDataTestId: 'about_maintenance-testID',
        fuelDataTestId: 'about_fuel-testID',
        transmissionDataTestId: 'about_transmission-testID',
        colorDataTestId: 'about_color-testID',
        trimDataTestId: 'about_trim-testID',
        descriptionDataTestId: 'about_description-testID',
      });
    });
    it('should return new object with - element', () => {
      const leaseType = LeaseTypeEnum.BUSINESS;
      const offer = {} as any;
      const derivative = null as any;
      const actual = createOlafDetails(leaseType, offer, derivative);

      expect(actual).toEqual({
        price: 0,
        priceDescription: `Per Month Ex.VAT`,
        available: 'Now',
        initailRental: '-',
        contractLength: '-',
        annualMileage: '-',
        maintenance: 'No',
        fuel: '-',
        transmission: '-',
        color: '-',
        trim: '-',
        description:
          '0 monthly payments (ex. VAT). Paid by direct debit. Initial Rental is taken around 10 days after delivery and each month on the same date thereafter for the length of the contract.',
        initialRentalDataTestId: 'about_intial-rental-testID',
        controlLengthDataTestId: 'about_control-length-testID',
        annualMileageDataTestId: 'about_annual-mileage-testID',
        annualMileageBoosterDataTestId: 'about_annual-milage-booster-testID',
        damageCoverDataTestId: 'about_damage-cover-testID',
        maintenanceDataTestId: 'about_maintenance-testID',
        fuelDataTestId: 'about_fuel-testID',
        transmissionDataTestId: 'about_transmission-testID',
        colorDataTestId: 'about_color-testID',
        trimDataTestId: 'about_trim-testID',
        descriptionDataTestId: 'about_description-testID',
      });
    });
  });
  describe('useFunderTerm', () => {
    const b2cValue = 24;
    const b2bValue = 60;
    const data = {
      leaseType: 'BUSINESS',
      lineItems: [
        {
          vehicleProduct: {
            funderData: {
              funder_name: 'Hitachi',
              b2c: {
                address_history: b2cValue,
                employment_history: b2cValue,
              },
              b2b: {
                limited: {
                  address_history: b2bValue,
                },
                sole_trader: {
                  address_history: b2bValue,
                },
                partnership: {
                  address_history: b2bValue,
                },
              },
            },
          },
        },
      ],
    };
    it('Incorrect argument object should return a default value', () => {
      const term = useFunderTerm({} as GetOlafData_orderByUuid);
      expect(term).toEqual(DEFAULT_TERM);
    });
    it('Should return correct value for b2c', () => {
      const newData = { ...data, leaseType: LeaseTypeEnum.PERSONAL };
      const term = useFunderTerm(newData as GetOlafData_orderByUuid);
      expect(term).toEqual(b2cValue);
    });
    it('Should return correct value for b2b', () => {
      const newData = { ...data, leaseType: LeaseTypeEnum.BUSINESS };
      const term = useFunderTerm(newData as GetOlafData_orderByUuid);
      expect(term).toEqual(b2bValue);
    });
  });
});
