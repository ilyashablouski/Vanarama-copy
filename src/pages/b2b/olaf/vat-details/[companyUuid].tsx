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

export const UPDATE_VAT_DETAILS = gql`
  mutation UpdateVatDetailsMutation($input: LimitedCompanyInputObject!) {
    updateLimitedCompany(input: $input) {
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

type QueryParams = {
  companyUuid: string;
};

export const VatDetailsPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid } = router.query as QueryParams;
  const updateVatDetails = useUpdateVatDetails();

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
          });
        }}
      />
    </OLAFLayout>
  );
};

function useUpdateVatDetails() {
  const [updateVatDetails] = useMutation<Mutation, MutationVariables>(
    UPDATE_VAT_DETAILS,
    {
      onError: () =>
        toast.error(
          'Oops, an unexpected error occurred',
          'Your details could not be saved. Please try submitting the form again.',
        ),
    },
  );

  return updateVatDetails;
}

export default withApollo(VatDetailsPage, { getDataFromTree });
