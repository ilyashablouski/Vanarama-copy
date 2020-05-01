import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import OlafContainer from '../../../components/OlafContainer';
import ExpensesFormContainer from '../../../containers/ExpensesFormContainer/ExpensesFormContainer';
import withApollo from '../../../hocs/withApollo';

const ExpensesPage: NextPage = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string;
  return (
    <OlafContainer activeStep={4}>
      <ExpensesFormContainer
        onCompleted={() => {
          const url = `/olaf/bank-details/[uuid]`;
          router.push(url, url.replace('[uuid]', uuid));
        }}
        personUuid={uuid}
      />
    </OlafContainer>
  );
};

export default withApollo(ExpensesPage, { getDataFromTree });
