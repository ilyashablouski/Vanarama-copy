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
      onSubmit={async ({ markets, outsideUK, vatNumber, vatRegistered }) => {
        await updateVatDetails({
          variables: {
            input: {
              uuid: companyUuid,
              isVatRegistered: vatRegistered,
              tradesOutsideUk: outsideUK,
              turnoverPercentageOutsideUk: outsideUK
                ? markets.map(_ => ({
                    country: _.country,
                    percentage: Number(_.percentage),
                  }))
                : undefined,
              vatNumber,
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
