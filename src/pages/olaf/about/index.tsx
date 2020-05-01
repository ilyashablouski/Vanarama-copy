import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import OlafContainer from '../../../components/OlafContainer';
import AboutFormContainer from '../../../containers/AboutFormContainer/AboutFormContainer';
import withApollo from '../../../hocs/withApollo';

const AboutYouPage: NextPage = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string;
  return (
    <OlafContainer activeStep={1}>
      <AboutFormContainer
        onCompleted={({ createUpdatePerson }) => {
          const url = `/olaf/address-history/[uuid]`;
          router.push(url, url.replace('[uuid]', createUpdatePerson!.uuid));
        }}
        personUuid={uuid}
      />
    </OlafContainer>
  );
};

export default withApollo(AboutYouPage, { getDataFromTree });
