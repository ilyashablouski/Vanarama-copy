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
import { LeaseTypeEnum } from '../../../../../generated/globalTypes'
import CompanyDetailsForm from '../../../../components/CompanyDetailsForm/CompanyDetailsForm';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { historyToMoment } from '../../../../utils/dates';
import { getUrlParam, OLAFQueryParams } from '../../../../utils/url';
import { useCreateUpdateOrder } from '../../../../gql/order';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../../../gql/creditApplication';

export const SAVE_COMPANY_DETAILS = gql`
  mutation SaveCompanyDetailsMutation($input: LimitedCompanyInputObject!) {
    createUpdateLimitedCompany(input: $input) {
      uuid
      partyUuid
    }
  }
`;

type QueryParams = OLAFQueryParams & {
  personUuid: string;
};

export const CompanyDetailsPage: NextPage = () => {
  const router = useRouter();
  const { personUuid, derivativeId, orderId } = router.query as QueryParams;

  const creditApplication = useGetCreditApplicationByOrderUuid(orderId);
  const [saveCompanyDetails] = useMutation<Mutation, MutationVariables>(
    SAVE_COMPANY_DETAILS,
    // {
    //   onCompleted: result => {
    //     const params = getUrlParam({ derivativeId, orderId });
    //     const url = `/b2b/olaf/vat-details/[companyUuid]${params}`;
    //     router.push(
    //       url,
    //       url.replace('[companyUuid]', result.createUpdateLimitedCompany!.uuid),
    //     );
    //   },
    //   onError: () => {
    //     toast.error(
    //       'Oops, an unexpected error occurred',
    //       'Your details could not be saved. Please try submitting the form again.',
    //       { dataTestId: 'company-details-error' },
    //     );
    //   },
    // },
  );
  const [createUpdateOrder] = useCreateUpdateOrder(() => {});
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );

  return (
    <OLAFLayout>
      <CompanyDetailsForm
        onSubmit={async values => {
          const searchResult =
            values.inputMode === 'search' && values.companySearchResult;

          await saveCompanyDetails({
            variables: {
              input: {
                person: { uuid: personUuid },
                companyType: 'Limited',
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
          })
            .then(({ data }) =>
              createUpdateOrder({
                variables: {
                  input: {
                    partyUuid: data!.createUpdateLimitedCompany!.partyUuid,
                    leaseType: LeaseTypeEnum.BUSINESS,
                    lineItems: [
                      // @ts-ignore
                      creditApplication.data!.creditApplicationByOrderUuid!
                        .lineItem,
                    ],
                  },
                },
              }),
            )
            .then(() =>
              createUpdateApplication({
                variables: {
                  input: {
                    ...creditApplication.data?.creditApplicationByOrderUuid,
                    orderUuid: orderId,
                  },
                },
              }),
            )
            .catch();
        }}
      />
    </OLAFLayout>
  );
};

export default withApollo(CompanyDetailsPage, {
  getDataFromTree,
});
