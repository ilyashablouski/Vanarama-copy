import { gql, useMutation } from '@apollo/client';
import moment from 'moment';
import React from 'react';
import {
  SaveCompanyDetailsMutation as Mutation,
  SaveCompanyDetailsMutationVariables as MutationVariables,
} from '../../../generated/SaveCompanyDetailsMutation';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import CompanyDetailsForm from '../../components/CompanyDetailsForm/CompanyDetailsForm';
import { historyToMoment } from '../../utils/dates';
import { useCreateUpdateOrder } from '../../gql/order';
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import { ICompanyDetailsFormContainerProps } from './interfaces';

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
}) => {
  const [saveCompanyDetails] = useMutation<Mutation, MutationVariables>(
    SAVE_COMPANY_DETAILS,
  );
  const [createUpdateOrder] = useCreateUpdateOrder(() => {});
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );

  return (
    <CompanyDetailsForm
      onSubmit={async values => {
        const searchResult =
          values.inputMode === 'search' && values.companySearchResult;
        const addresses = values.tradingDifferent
          ? [
              {
                serviceId: values.registeredAddress.id,
                kind: 'registered',
              },
              {
                serviceId: values.tradingAddress.id,
                kind: 'trading',
              },
            ]
          : [
              {
                serviceId: values.registeredAddress.id,
                kind: 'registered',
              },
            ];
        const emailAddress = {
          kind: 'Home',
          value: values.email,
          primary: true,
        };
        const telephoneNumbers = [{ value: values.telephone, primary: true }];

        await saveCompanyDetails({
          variables: {
            input: {
              person: { uuid: personUuid },
              companyType: 'Limited',
              legalName: searchResult ? searchResult.title : values.companyName,
              companyNumber: searchResult
                ? searchResult.companyNumber
                : values.companyNumber,
              tradingSince: searchResult
                ? moment(searchResult.dateOfCreation!).format('DD-MM-YYYY')
                : historyToMoment({
                    month: values.tradingSinceMonth,
                    year: values.tradingSinceYear,
                  }).format('DD-MM-YYYY'),
              addresses,
              withTradingAddress: values.tradingDifferent,
              companyNature: values.nature,
              emailAddress,
              telephoneNumbers,
            },
          },
        })
          .then(({ data }) =>
            createUpdateOrder({
              variables: {
                input: {
                  partyUuid: data!.createUpdateLimitedCompany!.partyUuid,
                  leaseType: LeaseTypeEnum.BUSINESS,
                  lineItems: [],
                },
              },
            })
              .then(() =>
                createUpdateApplication({
                  variables: {
                    input: {
                      addresses,
                      telephoneNumbers,
                      emailAddresses: [emailAddress],
                      orderUuid: orderId,
                    },
                  },
                }),
              )
              .then(() => onCompleted(data!.createUpdateLimitedCompany!.uuid)),
          )
          .catch(onError);
      }}
    />
  );
};

export default CompanyDetailsFormContainer;
