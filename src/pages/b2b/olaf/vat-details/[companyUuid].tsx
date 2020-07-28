import { gql, useMutation } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import {
  UpdateVatDetailsMutation as Mutation,
  UpdateVatDetailsMutationVariables as MutationVariables,
} from '../../../../../generated/UpdateVatDetailsMutation';
import VatDetailsForm from '../../../../components/VatDetailsForm/VatDetailsForm';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams, getUrlParam } from '../../../../utils/url';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../../../gql/creditApplication';

export const UPDATE_VAT_DETAILS = gql`
  mutation UpdateVatDetailsMutation($input: LimitedCompanyInputObject!) {
    createUpdateLimitedCompany(input: $input) {
      uuid
      isVatRegistered
      tradesOutsideUk
      turnoverPercentageOutsideUk {
        country
        percentage
      }
      vatNumber
    }
  }
`;

const handleSubmitError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
  );

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const VatDetailsPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid, derivativeId, orderId } = router.query as QueryParams;
  const [updateVatDetails] = useUpdateVatDetails();
  const creditApplication = useGetCreditApplicationByOrderUuid(orderId);
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );

  const handleSubmitCompletion = () => {
    const params = getUrlParam({ derivativeId, orderId });
    const url = `/b2b/olaf/director-details/[companyUuid]${params}`;
    router.push(url, url.replace('[companyUuid]', companyUuid));
  };

  return (
    <OLAFLayout>
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
                    ...creditApplication.data?.creditApplicationByOrderUuid,
                    orderUuid: orderId,
                  },
                },
              }),
            )
            .then(handleSubmitCompletion)
            .catch(handleSubmitError);
        }}
      />
    </OLAFLayout>
  );
};

function useUpdateVatDetails() {
  return useMutation<Mutation, MutationVariables>(UPDATE_VAT_DETAILS);
}

export default withApollo(VatDetailsPage, { getDataFromTree });
