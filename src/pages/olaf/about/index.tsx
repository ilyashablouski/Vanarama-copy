import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AboutFormContainer from '../../../containers/AboutFormContainer/AboutFormContainer';
import OLAFContainer from '../../../containers/OLAFContainer/OLAFContainer';
import withApollo from '../../../hocs/withApollo';

const AboutYouPage: NextPage = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string;
  return (
    <OLAFContainer>
      <AboutFormContainer
        onCompleted={({ createUpdatePerson }) => {
          const url =
            router.query.redirect === 'summary'
              ? `/olaf/summary/[uuid]`
              : `/olaf/address-history/[uuid]`;

          router.push(url, url.replace('[uuid]', createUpdatePerson!.uuid));
        }}
        personUuid={uuid}
      />
    </OLAFContainer>
  );
};

export default withApollo(AboutYouPage, { getDataFromTree });
