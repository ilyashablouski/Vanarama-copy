import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AboutFormContainer from '../../../containers/AboutFormContainer/AboutFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam } from '../../../utils/url';

const AboutYouPage: NextPage = () => {
  const router = useRouter();
  const {
    query: { uuid, derivativeId, orderId },
  } = router;
  return (
    <OLAFLayout
      orderId={orderId as string}
      derivativeId={derivativeId as string}
    >
      <AboutFormContainer
        onCompleted={({ createUpdatePerson }) => {
          const url =
            router.query.redirect === 'summary'
              ? `/olaf/summary/[uuid]${getUrlParam({ orderId, derivativeId })}`
              : `/olaf/address-history/[uuid]${getUrlParam({
                  orderId,
                  derivativeId,
                })}`;

          router.push(url, url.replace('[uuid]', createUpdatePerson!.uuid));
        }}
        personUuid={uuid as string}
      />
    </OLAFLayout>
  );
};

export default withApollo(AboutYouPage, { getDataFromTree });
