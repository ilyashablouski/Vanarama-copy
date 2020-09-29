import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import withApollo from '../../hocs/withApollo';
import Head from '../../components/Head/Head';
import LeasingQuestionContainer from '../../containers/LeasingQuestionContainer/LeasingQuestionContainer';
import { useGenericPageQuestion } from '../../containers/LeasingQuestionContainer/gql';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const LeasingQuestion: NextPage = () => {
  const router = useRouter();

  const { data, loading, error } = useGenericPageQuestion(
    router.asPath.slice(1),
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data?.genericPage) {
    return null;
  }

  const metaData = data?.genericPage?.metaData;
  const sections = data.genericPage?.sections;
  const body = data.genericPage?.intro;

  return (
    <>
      <LeasingQuestionContainer
        body={body}
        title={metaData?.name}
        sections={sections}
      />
      <Head
        metaData={metaData}
        featuredImage={data?.genericPage.featuredImage}
      />
    </>
  );
};

export default withApollo(LeasingQuestion, { getDataFromTree });
