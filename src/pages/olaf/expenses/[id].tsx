import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import OlafContainer from '../../../components/OlafContainer';
import ExpensesFormContainer from '../../../containers/ExpensesFormContainer/ExpensesFormContainer';
import withApollo from '../../../hocs/withApollo';

const ExpensesPage: NextPage = () => {
  const router = useRouter();
  const personUuid = router.query.id as string;
  return (
    <OlafContainer activeStep={4}>
      <ExpensesFormContainer
        personUuid={personUuid}
        onCompleted={() => {
          router.push(
            `/olaf/bank-details/[id]`,
            `/olaf/bank-details/${personUuid}`,
          );
        }}
      />
    </OlafContainer>
  );
};

export default withApollo(ExpensesPage, { getDataFromTree });
