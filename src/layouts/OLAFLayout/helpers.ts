import { useApolloClient } from '@apollo/client';
import { createContext } from 'react';
import { GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA } from '../../gql/creditApplication';
import { DEFAULT_TERM } from '../../models/enum/OlafVariables';
import { CompanyTypes } from '../../models/enum/CompanyTypes';
import { GetMyOrders_myOrders_lineItems_vehicleProduct as VehicleProduct } from '../../../generated/GetMyOrders';
import { GetDerivatives_derivatives as Derivatives } from '../../../generated/GetDerivatives';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import { GetOlafData_orderByUuid as OrderByUuid } from '../../../generated/GetOlafData';

/**
 * @param leaseType - string, offer leaseType
 * @param offer - offer
 * @param derivative - derivative data for offer car
 */
export const createOlafDetails = (
  leaseType: string,
  offer: VehicleProduct,
  derivative: Derivatives,
) => ({
  price: offer.monthlyPayment || 0,
  priceDescription: `Per Month ${
    leaseType === LeaseTypeEnum.PERSONAL ? 'Inc' : 'Ex'
  }.VAT`,
  available: 'Now',
  initailRental: offer.depositPayment
    ? `£${offer.depositPayment} (${
        leaseType === LeaseTypeEnum.PERSONAL ? 'inc.' : 'ex.'
      } VAT)`
    : '-',
  contractLength: offer.depositMonths ? `${offer.depositMonths} month` : '-',
  annualMileage: offer.annualMileage ? `${offer.annualMileage} miles` : '-',
  maintenance: offer.maintenance ? 'Yes' : 'No',
  fuel: derivative?.fuelType.name || '-',
  transmission: derivative?.transmission.name || '-',
  color: offer.colour || '-',
  trim: offer.trim || '-',
  description: `${(offer.depositMonths || 1) - 1} monthly payments (${
    leaseType === LeaseTypeEnum.PERSONAL ? 'inc.' : 'ex.'
  } VAT). Paid by direct debit. Initial Rental is taken around 10 days after delivery and each month on the same date thereafter for the length of the contract.`,
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

// get funder term for address/employement history
export const useFunderTerm = (orderByUuid?: OrderByUuid | undefined | null) => {
  const client = useApolloClient();
  const data = orderByUuid?.lineItems?.[0].vehicleProduct || ({} as any);
  if (Object.values(data).length > 0) {
    if (orderByUuid?.leaseType === LeaseTypeEnum.PERSONAL) {
      return data.funderData?.b2c.address_history || DEFAULT_TERM;
    }
    try {
      const {
        creditApplicationByOrderUuid: { aboutDetails },
      } = client.readQuery({
        query: GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA,
        variables: {
          id: orderByUuid?.uuid,
        },
      }) as any;
      switch (aboutDetails.company_type) {
        case CompanyTypes.limited:
          return data.funderData?.b2b.limited.address_history;
        case CompanyTypes.partnership:
          return data.funderData?.b2b.partnership.address_history;
        case CompanyTypes.soleTrader:
          return data.funderData?.b2b.sole_trader.address_history;
        default:
          return DEFAULT_TERM;
      }
    } catch (err) {
      return DEFAULT_TERM;
    }
  } else return DEFAULT_TERM;
};

export const OlafContext = createContext({ requiredMonths: DEFAULT_TERM });
