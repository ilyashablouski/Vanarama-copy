import React from 'react';
// import { gql } from '@apollo/client';
import CompanyDetailsForm from '../../components/SoleTraderCompanyDetailsForm';
import { ISoleTraderCompanyDetailsFormValues } from '../../components/SoleTraderCompanyDetailsForm/interfaces';
import { ISoleTraderCompanyDetailsFormContainerProps } from './interfaces';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
// import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import { useUpdateSoleTraderCompanyMutation } from './gql';
import { useCreateUpdateOrder } from '../../gql/order';
import { mapFormValues } from './mappers';

/* const GET_PARTY_ID = gql`
  query companyByUuid($id: ID!) {
    companyByUuid(uuid: $id) {
      partyUuid
    }
  }
`; */

const SoleTraderCompanyDetailsFormContainer: React.FC<ISoleTraderCompanyDetailsFormContainerProps> = ({
  orderId,
  personUuid,
  companyUuid,
  onCompleted,
  onError,
}) => {
  const [updateSoleTraderCompanyDetails] = useUpdateSoleTraderCompanyMutation();
  const [createUpdateOrder] = useCreateUpdateOrder(() => {});

  const handleSoleTraderCompanyDetailsSave = (
    values: ISoleTraderCompanyDetailsFormValues,
  ) =>
    updateSoleTraderCompanyDetails({
      variables: {
        input: {
          uuid: companyUuid,
          person: { uuid: personUuid },
          ...mapFormValues(values),
        },
      },
    });

  const handleOrderUpdate = (partyUuid: string) =>
    createUpdateOrder({
      variables: {
        input: {
          partyUuid,
          leaseType: LeaseTypeEnum.BUSINESS,
          lineItems: [],
          uuid: orderId,
        },
      },
    });

  return (
    <CompanyDetailsForm
      onSubmit={async values => {
        handleSoleTraderCompanyDetailsSave(values)
          .then(response => {
            handleOrderUpdate(
              response.data!.createUpdateSoleTraderCompany!.partyUuid,
            );
          })
          .then(onCompleted)
          .catch(onError);
      }}
    />
  );
};

export default SoleTraderCompanyDetailsFormContainer;
