import { gql } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../../utils/url';
import CompanyDetailsFormContainer from '../../../../containers/CompanyDetailsFormContainer';

export const SAVE_COMPANY_DETAILS = gql`
  mutation SaveCompanyDetailsMutation($input: LimitedCompanyInputObject!) {
    createUpdateLimitedCompany(input: $input) {
      uuid
      partyUuid
    }
  }
`;

const handleSubmitError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
    { dataTestId: 'company-details-error' },
  );

type QueryParams = OLAFQueryParams & {
  personUuid: string;
};

export const CompanyDetailsPage: NextPage = () => {
  const router = useRouter();
  const { personUuid, derivativeId, orderId } = router.query as QueryParams;

  const handleSubmitCompletion = (companyUuid: string) => {
    const params = getUrlParam({ derivativeId, orderId });
    const url = `/b2b/olaf/vat-details/[companyUuid]${params}`;
    router.push(url, url.replace('[companyUuid]', companyUuid));
  };

  return (
    <OLAFLayout>
      <CompanyDetailsFormContainer
        personUuid={personUuid}
        orderId={orderId}
        onCompleted={handleSubmitCompletion}
        onError={handleSubmitError}
      />
    </OLAFLayout>
  );
};

export default withApollo(CompanyDetailsPage);
