import { useMutation, gql } from '@apollo/client';
import React, { useMemo } from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import {
  SaveCompanyDetailsMutation as Mutation,
  SaveCompanyDetailsMutationVariables as MutationVariables,
  SaveCompanyDetailsMutation_createUpdateLimitedCompany as Company,
} from '../../../generated/SaveCompanyDetailsMutation';
import {
  LeaseTypeEnum,
  LimitedCompanyInputObject,
} from '../../../generated/globalTypes';
import CompanyDetailsForm from '../../components/CompanyDetailsForm/CompanyDetailsForm';
import { ICompanyDetailsFormValues } from '../../components/CompanyDetailsForm/interfaces';
import { useCreateUpdateOrder } from '../../gql/order';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../gql/creditApplication';
import { ICompanyDetailsFormContainerProps } from './interfaces';
import {
  mapFormValues,
  mapDefaultValues,
  mapCompanyDetailsToCreditApplication,
} from './mappers';
import { formValuesToInputCreditApplication } from '../../mappers/mappersCreditApplication';
import { responseToInitialFormValues } from '../BusinessAboutFormContainer/mappers';

export const SAVE_COMPANY_DETAILS = gql`
  mutation SaveCompanyDetailsMutation($input: LimitedCompanyInputObject!) {
    createUpdateLimitedCompany(input: $input) {
      uuid
      partyUuid
      addresses {
        lineOne
        lineTwo
        lineThree
        city
        county
        postcode
        country
        startedOn
        endedOn
        propertyStatus
        serviceId
        kind
      }
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

  const companyDetailsRaw = data?.creditApplicationByOrderUuid?.companyDetails;
  const aboutDetailsRaw = data?.creditApplicationByOrderUuid?.aboutDetails;

  const company = useMemo(
    () => (companyDetailsRaw ? mapDefaultValues(companyDetailsRaw) : undefined),
    [companyDetailsRaw],
  );

  const aboutDetails = useMemo(
    () =>
      aboutDetailsRaw
        ? responseToInitialFormValues(aboutDetailsRaw)
        : undefined,
    [aboutDetailsRaw],
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
          uuid: orderId,
        },
      },
    });

  const handleCreditApplicationUpdate = (
    values: ICompanyDetailsFormValues,
    companyData: Company | null,
  ) =>
    createUpdateApplication({
      variables: {
        input: formValuesToInputCreditApplication({
          ...data?.creditApplicationByOrderUuid,
          companyDetails: mapCompanyDetailsToCreditApplication(
            values,
            companyData,
            aboutDetails,
          ),
          orderUuid: orderId,
        }),
      },
    });

  if (loading) {
    return <Loading />;
  }

  return (
    <CompanyDetailsForm
      isEdited={isEdited}
      company={company}
      onSubmit={async values => {
        const mappedFormValues = mapFormValues(
          values,
          personUuid,
          companyUuid,
          aboutDetails?.companyType,
        );

        await handleCompanyDetailsSave(mappedFormValues)
          .then(response =>
            handleOrderUpdate(
              response.data!.createUpdateLimitedCompany!.partyUuid,
            )
              .then(() =>
                handleCreditApplicationUpdate(
                  values,
                  response.data!.createUpdateLimitedCompany,
                ),
              )
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
