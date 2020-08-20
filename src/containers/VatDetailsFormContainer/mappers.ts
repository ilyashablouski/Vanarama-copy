import { VatDetailsFormValues } from '../../components/VatDetailsForm/interfaces';
import { GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid as CreditApplication } from '../../../generated/GetCreditApplicationByOrderUuid';

export const mapFormValues = (values: VatDetailsFormValues, uuid: string) => ({
  uuid,
  isVatRegistered: values.vatRegistered,
  tradesOutsideUk: values.outsideUK,
  turnoverPercentageOutsideUk: values.outsideUK
    ? values.markets.map(_ => ({
        country: _.country,
        percentage: Number(_.percentage),
      }))
    : undefined,
  vatNumber: values.vatNumber,
});

export const mapDefaultValues = (data?: CreditApplication | null) => ({
  vatRegistered: data?.vatDetails?.vat_registered,
  vatNumber: data?.vatDetails?.vat_number,
  outsideUK: data?.vatDetails?.outside_uk,
  markets: data?.vatDetails?.markets,
  isValid: data?.vatDetails?.isValid,
});

export default mapFormValues;
