import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import BusinessSummaryFormContainer from '../../../../containers/BusinessSummaryFormContainer/BusinessSummaryFormContainer';
import withApollo from '../../../../hocs/withApollo';

type QueryParams = {
  companyUuid: string;
};

const BusinessSummaryPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid } = router.query as QueryParams;
  return (
    <OLAFLayout>
      <BusinessSummaryFormContainer companyUuid={companyUuid} />
    </OLAFLayout>
  );
};

export default withApollo(BusinessSummaryPage, { getDataFromTree });
