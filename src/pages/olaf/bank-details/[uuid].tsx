import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import BankDetailsFormContainer from '../../../containers/BankDetailsFormContainer/BankDetailsFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';

const BankDetailsPage: NextPage = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string;
  return (
    <OLAFLayout>
      <BankDetailsFormContainer
        onCompleted={() => {
          const url = `/olaf/summary/[uuid]`;
          router.push(url, url.replace('[uuid]', uuid));
        }}
        personUuid={uuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(BankDetailsPage, { getDataFromTree });
