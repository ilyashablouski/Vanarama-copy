import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AboutFormContainer from '../../../containers/AboutFormContainer/AboutFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const AboutYouPage: NextPage = () => {
  const router = useRouter();
  const { derivativeId, orderId, uuid } = router.query as QueryParams;
  return (
    <OLAFLayout>
      <AboutFormContainer
        onCompleted={({ createUpdatePerson }) => {
          const params = getUrlParam({ derivativeId, orderId });
          const url =
            router.query.redirect === 'summary'
              ? `/olaf/summary/[uuid]${params}`
              : `/olaf/address-history/[uuid]${params}`;

          router.push(url, url.replace('[uuid]', createUpdatePerson!.uuid));
        }}
        personUuid={uuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(AboutYouPage, { getDataFromTree });
