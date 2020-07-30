import { VatDetailsFormValues } from '../../components/VatDetailsForm/interfaces';

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

export default mapFormValues;
