import { gql, useMutation } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import moment from 'moment';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import {
  SaveCompanyDetailsMutation as Mutation,
  SaveCompanyDetailsMutationVariables as MutationVariables,
} from '../../../../../generated/SaveCompanyDetailsMutation';
import CompanyDetailsForm from '../../../../components/CompanyDetailsForm/CompanyDetailsForm';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { historyToMoment } from '../../../../utils/dates';

export const SAVE_COMPANY_DETAILS = gql`
  mutation SaveCompanyDetailsMutation($input: LimitedCompanyInputObject!) {
    updateLimitedCompany(input: $input) {
      uuid
    }
  }
`;

export const CompanyDetailsPage: NextPage = () => {
  const router = useRouter();
  const {
    query: { derivativeId, orderId, companyUuid },
  } = router;

  const [saveCompanyDetails] = useMutation<Mutation, MutationVariables>(
    SAVE_COMPANY_DETAILS,
    {
      onError: () => {
        toast.error(
          'Oops, an unexpected error occurred',
          'Your details could not be saved. Please try submitting the form again.',
          { dataTestId: 'company-details-error' },
        );
      },
    },
  );

  return (
    <OLAFLayout
      orderId={orderId as string}
      derivativeId={derivativeId as string}
    >
      <CompanyDetailsForm
        onSubmit={async values => {
          const searchResult =
            values.inputMode === 'search' && values.confirmedCompany;

          await saveCompanyDetails({
            variables: {
              input: {
                uuid: companyUuid as string,
                legalName: searchResult
                  ? searchResult.title
                  : values.companyName,
                companyNumber: searchResult
                  ? searchResult.companyNumber
                  : values.companyNumber,
                tradingSince: searchResult
                  ? moment(searchResult.dateOfCreation!).format('DD-MM-YYYY')
                  : historyToMoment({
                      month: values.tradingSinceMonth,
                      year: values.tradingSinceYear,
                    }).format('DD-MM-YYYY'),
                addresses: values.tradingDifferent
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
                    ],
                withTradingAddress: values.tradingDifferent,
                companyNature: values.nature,
                emailAddress: {
                  kind: 'Home',
                  value: values.email,
                  primary: true,
                },
                telephoneNumbers: [{ value: values.telephone, primary: true }],
              },
            },
          });
        }}
      />
    </OLAFLayout>
  );
};

export default withApollo(CompanyDetailsPage, {
  getDataFromTree,
});
