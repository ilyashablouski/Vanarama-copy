import dynamic from 'next/dynamic';
import React from 'react';
import SoleTraderDetailsForm from '../../components/SoleTraderDetailsForm';
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import { ISoleTraderDetailsFormContainerProps } from './interface';
import { ISoleTraderDetailsFormValues } from '../../components/SoleTraderDetailsForm/interfaces';
import { formValuesToAssociate } from '../../components/SoleTraderDetailsForm/mappers';
import {
  useSoleTraderDetailsFormDataQuery,
  useUpdateSoleTraderMutation,
} from './gql';
import { UpdateSoleTraderMutation } from '../../../generated/UpdateSoleTraderMutation';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const SoleTraderDetailsFormContainer: React.FC<ISoleTraderDetailsFormContainerProps> = ({
  personUuid,
  companyUuid,
  orderId,
  isEdited,
  onCompleted,
  onError,
}) => {
  const soleTraderDetailsFormData = useSoleTraderDetailsFormDataQuery(
    personUuid,
    companyUuid,
  );
  const [updateSoleTraderDetails] = useUpdateSoleTraderMutation();
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );

  if (soleTraderDetailsFormData.loading) {
    return <Loading size="large" />;
  }

  if (soleTraderDetailsFormData.error) {
    return <p>Error: {soleTraderDetailsFormData.error.message}</p>;
  }

  if (!soleTraderDetailsFormData.data?.allDropDowns) {
    return null;
  }

  if (!soleTraderDetailsFormData.data?.personByUuid?.addresses) {
    return null;
  }

  const handleSoleTraderDetailsSave = (values: ISoleTraderDetailsFormValues) =>
    updateSoleTraderDetails({
      variables: {
        input: {
          uuid: companyUuid,
          associate: formValuesToAssociate(values, personUuid),
        },
      },
    });

  const handleCreditApplicationUpdate = (
    values: ISoleTraderDetailsFormValues,
    resp: UpdateSoleTraderMutation,
  ) =>
    createUpdateApplication({
      variables: {
        input: {
          soleTraderDetails: {
            uuid: companyUuid,
            associate: {
              ...formValuesToAssociate(values, personUuid),
              addresses:
                resp?.updateCompanySoleTrader?.associates?.[0].addresses,
            },
          },
          orderUuid: orderId,
        },
      },
    });

  return (
    <SoleTraderDetailsForm
      soleTrader={
        soleTraderDetailsFormData.data!.companyByUuid?.associates?.[0]
      }
      person={soleTraderDetailsFormData.data!.personByUuid}
      dropdownData={soleTraderDetailsFormData.data!.allDropDowns}
      isEdited={isEdited}
      onSubmit={async values => {
        handleSoleTraderDetailsSave(values)
          .then(({ data }) =>
            handleCreditApplicationUpdate(
              values,
              data || ({} as UpdateSoleTraderMutation),
            ),
          )
          .then(onCompleted)
          .catch(onError);
      }}
    />
  );
};

export default SoleTraderDetailsFormContainer;
