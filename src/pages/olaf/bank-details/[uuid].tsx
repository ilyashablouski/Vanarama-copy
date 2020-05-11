import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import BankDetailsFormContainer from '../../../containers/BankDetailsFormContainer/BankDetailsFormContainer';
import OLAFContainer from '../../../containers/OLAFContainer/OLAFContainer';
import withApollo from '../../../hocs/withApollo';

const BankDetailsPage: NextPage = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string;
  return (
    <OLAFContainer>
      <BankDetailsFormContainer
        onCompleted={() => {
          const url = `/olaf/summary/[uuid]`;
          router.push(url, url.replace('[uuid]', uuid));
        }}
        personUuid={uuid}
      />
    </OLAFContainer>
  );
};

export default withApollo(BankDetailsPage, { getDataFromTree });
