import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import BankDetailsFormContainer from '../../../containers/BankDetailsFormContainer/BankDetailsFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const CompanyBankDetailsPage: NextPage = () => {
  const router = useRouter();
  const { derivativeId, orderId, uuid } = router.query as QueryParams;
  return (
    <OLAFLayout>
      <BankDetailsFormContainer
        onCompleted={() => {
          const params = getUrlParam({ derivativeId, orderId });
          const url = `/olaf/summary/[uuid]${params}`;
          router.push(url, url.replace('[uuid]', uuid));
        }}
        personUuid={uuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(CompanyBankDetailsPage, { getDataFromTree });
