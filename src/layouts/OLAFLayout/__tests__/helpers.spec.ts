import { createOlafDetails, getFunderTerm } from '../helpers';
import {
  LeaseTypeEnum,
  OrderInputObject,
} from '../../../../generated/globalTypes';
import { DEFAULT_TERM } from '../../../models/enum/OlafVariables';
import { GetLeaseCompanyData as ILeaseData } from '../../../../generated/GetLeaseCompanyData';
import { CompanyTypes } from '../../../models/enum/CompanyTypes';

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
        isFreeInsurance: null,
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
        isFreeInsurance: null,
        maintenanceDataTestId: 'about_maintenance-testID',
        fuelDataTestId: 'about_fuel-testID',
        transmissionDataTestId: 'about_transmission-testID',
        colorDataTestId: 'about_color-testID',
        trimDataTestId: 'about_trim-testID',
        descriptionDataTestId: 'about_description-testID',
      });
    });
  });
  describe('getFunderTerm', () => {
    const b2cValue = 24;
    const b2bValue = 60;
    const data = {
      creditApplicationByOrderUuid: {
        aboutDetails: {
          company_type: CompanyTypes.limited,
        },
        lineItem: {
          vehicleProduct: {
            funderId: '5',
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
      },
    } as ILeaseData;
    it('Incorrect argument object should return a default value', () => {
      const term = getFunderTerm(null, null);
      expect(term).toEqual(DEFAULT_TERM);
    });
    it('Should return correct value for b2c', () => {
      const term = getFunderTerm(
        data as ILeaseData,
        { leaseType: LeaseTypeEnum.PERSONAL } as OrderInputObject,
      );
      expect(term).toEqual(b2cValue);
    });
    it('Should return correct value for b2b', () => {
      const term = getFunderTerm(data, {
        leaseType: LeaseTypeEnum.BUSINESS,
      } as OrderInputObject);
      expect(term).toEqual(b2bValue);
    });
  });
});
