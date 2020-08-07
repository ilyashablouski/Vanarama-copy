import { useMutation, gql, useQuery } from '@apollo/client';
import React from 'react';
import SummaryFormDetailsSection from '../../components/BusinessSummaryForm/BusinessSummaryFormDetailsSection';
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
import { mapFormValues } from './mappers';
import {
  GetCompanyDetailsQuery,
  GetCompanyDetailsQueryVariables,
} from '../../../generated/GetCompanyDetailsQuery';

export const SAVE_COMPANY_DETAILS = gql`
  mutation SaveCompanyDetailsMutation($input: LimitedCompanyInputObject!) {
    createUpdateLimitedCompany(input: $input) {
      uuid
      partyUuid
    }
  }
`;

export const GET_COMPANY_DETAILS = gql`
  query GetCompanyDetailsQuery($companyUuid: ID!) {
    companyByUuid(uuid: $companyUuid) {
      ...SummaryFormDetailsSectionCompany
    }
  }
  ${SummaryFormDetailsSection.fragments.company}
`;

export const CompanyDetailsFormContainer: React.FC<ICompanyDetailsFormContainerProps> = ({
  personUuid,
  orderId,
  onCompleted,
  onError,
  isEdited,
  companyUuid,
}) => {
  const creditApplicationQuery = useGetCreditApplicationByOrderUuid(orderId);
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
          companyDetails: values,
          addresses: values.addresses,
          telephoneNumbers: values.telephoneNumbers,
          emailAddresses: [values.emailAddress],
          orderUuid: orderId,
        },
      },
    });

  const { data } = useQuery<
    GetCompanyDetailsQuery,
    GetCompanyDetailsQueryVariables
  >(GET_COMPANY_DETAILS, {
    skip: !companyUuid,
    variables: {
      companyUuid: companyUuid!,
    },
  });

  return (
    <CompanyDetailsForm
      isEdited={isEdited}
      company={data?.companyByUuid}
      onSubmit={async values => {
        const mappedFormValues = mapFormValues(values, personUuid, companyUuid);
        await handleCompanyDetailsSave(mappedFormValues)
          .then(response =>
            handleOrderUpdate(
              response.data!.createUpdateLimitedCompany!.partyUuid,
            )
              .then(() => handleCreditApplicationUpdate(mappedFormValues))
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
