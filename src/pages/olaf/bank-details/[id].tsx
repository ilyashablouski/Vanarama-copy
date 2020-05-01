import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import OlafContainer from '../../../components/OlafContainer';
import BankDetailsFormContainer from '../../../containers/BankDetailsFormContainer/BankDetailsFormContainer';
import withApollo from '../../../hocs/withApollo';

const BankDetailsPage: NextPage = () => {
  const router = useRouter();
  const personUuid = router.query.id as string;

  return (
    <OlafContainer activeStep={5}>
      <BankDetailsFormContainer
        onCompleted={() => {
          router.push(`/olaf/summary/[id]`, `/olaf/summary/${personUuid}`);
        }}
        personUuid={personUuid}
      />
    </OlafContainer>
  );
};

export default withApollo(BankDetailsPage, { getDataFromTree });
