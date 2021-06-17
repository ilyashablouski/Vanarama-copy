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
  vatRegistered: data?.vatDetailsV2?.vatRegistered ?? false,
  vatNumber: data?.vatDetailsV2?.vatNumber ?? '',
  outsideUK: data?.vatDetailsV2?.outsideUk ?? false,
  markets: data?.vatDetailsV2?.markets ?? [],
  isValid: false,
});

export default mapFormValues;
