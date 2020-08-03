import { createOlafDetails } from '../helpers';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';

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
          '99 month contact (inc. VAT). Paid by Direct Debit. First due ≈ 10 days after delivery.',
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
          '0 month contact (ex. VAT). Paid by Direct Debit. First due ≈ 10 days after delivery.',
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
});
