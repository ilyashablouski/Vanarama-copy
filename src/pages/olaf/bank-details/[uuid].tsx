import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import OlafContainer from '../../../components/OlafContainer';
import BankDetailsFormContainer from '../../../containers/BankDetailsFormContainer/BankDetailsFormContainer';
import withApollo from '../../../hocs/withApollo';

const BankDetailsPage: NextPage = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string;
  return (
    <OlafContainer activeStep={5}>
      <BankDetailsFormContainer
        onCompleted={() => {
          const url = `/olaf/summary/[uuid]`;
          router.push(url, url.replace('[uuid]', uuid));
        }}
        personUuid={uuid}
      />
    </OlafContainer>
  );
};

export default withApollo(BankDetailsPage, { getDataFromTree });
