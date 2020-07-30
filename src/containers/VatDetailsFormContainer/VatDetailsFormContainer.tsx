import React from 'react';
import VatDetailsForm from '../../components/VatDetailsForm/VatDetailsForm';
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import { useUpdateVatDetails } from './gql';
import { IVatDetailsFormContainerProps } from './interfaces';

export const VatDetailsFormContainer: React.FC<IVatDetailsFormContainerProps> = ({
  companyUuid,
  orderId,
  onCompleted,
  onError,
}) => {
  const [updateVatDetails] = useUpdateVatDetails();
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );

  return (
    <VatDetailsForm
      onSubmit={async values => {
        await updateVatDetails({
          variables: {
            input: {
              uuid: companyUuid,
              isVatRegistered: values.vatRegistered,
              tradesOutsideUk: values.outsideUK,
              turnoverPercentageOutsideUk: values.outsideUK
                ? values.markets.map(_ => ({
                    country: _.country,
                    percentage: Number(_.percentage),
                  }))
                : undefined,
              vatNumber: values.vatNumber,
            },
          },
        })
          .then(() =>
            createUpdateApplication({
              variables: {
                input: {
                  orderUuid: orderId,
                },
              },
            }),
          )
          .then(onCompleted)
          .catch(onError);
      }}
    />
  );
};

export default VatDetailsFormContainer;
