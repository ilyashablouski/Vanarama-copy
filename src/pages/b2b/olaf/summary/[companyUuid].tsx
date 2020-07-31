import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import BusinessSummaryFormContainer from '../../../../containers/BusinessSummaryFormContainer/BusinessSummaryFormContainer';
import withApollo from '../../../../hocs/withApollo';
import { SummaryFormDetailsSectionCompany } from '../../../../../generated/SummaryFormDetailsSectionCompany';
import { OLAFQueryParams } from 'utils/url';

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

const BusinessSummaryPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid, derivativeId, orderId } = router.query as QueryParams;
  return (
    <OLAFLayout>
      <BusinessSummaryFormContainer orderId={orderId} companyUuid={companyUuid} />
    </OLAFLayout>
  );
};

export default withApollo(BusinessSummaryPage, { getDataFromTree });
