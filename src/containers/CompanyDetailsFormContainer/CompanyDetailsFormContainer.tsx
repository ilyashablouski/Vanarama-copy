import { useMutation, gql } from '@apollo/client';
import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
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
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../gql/creditApplication';
import { ICompanyDetailsFormContainerProps } from './interfaces';
import { mapFormValues, mapDefaultValues } from './mappers';

export const SAVE_COMPANY_DETAILS = gql`
  mutation SaveCompanyDetailsMutation($input: LimitedCompanyInputObject!) {
    createUpdateLimitedCompany(input: $input) {
      uuid
      partyUuid
    }
  }
`;

export const CompanyDetailsFormContainer: React.FC<ICompanyDetailsFormContainerProps> = ({
  personUuid,
  orderId,
  onCompleted,
  onError,
  isEdited,
  companyUuid,
}) => {
  const [saveCompanyDetails] = useMutation<Mutation, MutationVariables>(
    SAVE_COMPANY_DETAILS,
  );
  const [createUpdateOrder] = useCreateUpdateOrder(() => {});
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );
  const { data, loading } = useGetCreditApplicationByOrderUuid(orderId);

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
          vatDetails: data?.creditApplicationByOrderUuid?.vatDetails,
          directorsDetails:
            data?.creditApplicationByOrderUuid?.directorsDetails,
          bankAccounts: data?.creditApplicationByOrderUuid?.bankAccounts,
          companyDetails: values,
          orderUuid: orderId,
        },
      },
    });

  if (loading) {
    return <Loading />;
  }

  const company = data?.creditApplicationByOrderUuid?.companyDetails
    ? mapDefaultValues(data?.creditApplicationByOrderUuid?.companyDetails)
    : undefined;

  return (
    <CompanyDetailsForm
      isEdited={isEdited}
      company={company}
      onSubmit={async values => {
        const mappedFormValues = mapFormValues(values, personUuid, companyUuid);

        await handleCompanyDetailsSave(mappedFormValues)
          .then(response =>
            handleOrderUpdate(
              response.data!.createUpdateLimitedCompany!.partyUuid,
            )
              .then(() => handleCreditApplicationUpdate(values))
              .then(() =>
                onCompleted(response.data!.createUpdateLimitedCompany!.uuid),
              ),
          )
          .catch(onError);
      }}
    />
  );
};

export default CompanyDetailsFormContainer;
