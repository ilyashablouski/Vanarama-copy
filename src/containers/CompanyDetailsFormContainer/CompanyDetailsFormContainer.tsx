import { gql, useMutation } from '@apollo/client';
import React from 'react';
import {
  SaveCompanyDetailsMutation as Mutation,
  SaveCompanyDetailsMutationVariables as MutationVariables,
} from '../../../generated/SaveCompanyDetailsMutation';
import {
  LeaseTypeEnum,
  LimitedCompanyInputObject,
} from '../../../generated/globalTypes';
import CompanyDetailsForm from '../../components/CompanyDetailsForm/CompanyDetailsForm';

import { useCreateUpdateOrder } from '../../gql/order';
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import { ICompanyDetailsFormContainerProps } from './interfaces';
import { mapFormValues } from './mappers';
import { SAVE_COMPANY_DETAILS } from '../../pages/b2b/olaf/company-details/[personUuid]';

export const CompanyDetailsFormContainer: React.FC<ICompanyDetailsFormContainerProps> = ({
  personUuid,
  orderId,
  onCompleted,
  onError,
}) => {
  const [saveCompanyDetails] = useMutation<Mutation, MutationVariables>(
    SAVE_COMPANY_DETAILS,
  );
  const [createUpdateOrder] = useCreateUpdateOrder(() => {});
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );

  const handleCompanyDetailsSave = (input: LimitedCompanyInputObject) =>
    saveCompanyDetails({
      variables: {
        input,
      },
    });

  const handleOrderUpdate = (partyUuid: string) =>
    createUpdateOrder({
      variables: {
        input: {
          partyUuid,
          leaseType: LeaseTypeEnum.BUSINESS,
          lineItems: [],
        },
      },
    });

  const handleCreditApplicationUpdate = (values: LimitedCompanyInputObject) =>
    createUpdateApplication({
      variables: {
        input: {
          addresses: values.addresses,
          telephoneNumbers: values.telephoneNumbers,
          emailAddresses: [values.emailAddress],
          orderUuid: orderId,
        },
      },
    });

  return (
    <CompanyDetailsForm
      onSubmit={async values => {
        const mappedFormValues = mapFormValues(values, personUuid);

        await handleCompanyDetailsSave(mappedFormValues)
          .then(({ data }) =>
            handleOrderUpdate(data!.createUpdateLimitedCompany!.partyUuid)
              .then(() => handleCreditApplicationUpdate(mappedFormValues))
              .then(() => onCompleted(data!.createUpdateLimitedCompany!.uuid)),
          )
          .catch(onError);
      }}
    />
  );
};

export default CompanyDetailsFormContainer;
