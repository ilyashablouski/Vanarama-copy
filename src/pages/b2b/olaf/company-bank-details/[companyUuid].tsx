import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import CompanyBankDetailsFormContainer from '../../../../containers/CompanyBankDetailsFormContainer/CompanyBankDetailsFormContainer';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../../hocs/withApollo';
import { getUrlParam, OLAFQueryParams } from '../../../../utils/url';

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

const CompanyBankDetailsPage: NextPage = () => {
  const router = useRouter();
  const { derivativeId, orderId, companyUuid } = router.query as QueryParams;
  return (
    <OLAFLayout>
      <CompanyBankDetailsFormContainer
        onCompleted={() => {
          const params = getUrlParam({ derivativeId, orderId });
          const url = `/olaf/summary/[companyUuid]${params}`;
          router.push(url, url.replace('[companyUuid]', companyUuid));
        }}
        companyUuid={companyUuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(CompanyBankDetailsPage, { getDataFromTree });
