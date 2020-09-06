import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import withApollo from '../../hocs/withApollo';
import Head from '../../components/Head/Head';
import LeasingQuestionContainer from '../../containers/LeasingQuestionContainer/LeasingQuestionContainer';
import { useGenericPageQuestion } from '../../containers/LeasingQuestionContainer/gql';

const LeasingQuestion: NextPage = () => {
  const router = useRouter();

  const crumbs = [
    { label: 'Home', href: '/' },
    {
      label: 'Ask A Question About Van Leasing',
      href: '/van-leasing-questions',
    },
  ];

  const { data, loading, error } = useGenericPageQuestion(
    `/van-leasing-questions/${router.query.question as string}`,
  );

  if (loading) {
    return <Loading size="large" />;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data?.genericPage) {
    return null;
  }

  const metaData = data?.genericPage?.metaData;
  const sections = data.genericPage?.sections;
  const body = data.genericPage?.intro;

  return (
    <>
      <Head
        title={metaData.title || ''}
        metaDescription={metaData.metaDescription}
        metaRobots={metaData.metaRobots}
        legacyUrl={metaData.legacyUrl}
        canonicalUrl={metaData.canonicalUrl}
        publishedOn={metaData.publishedOn}
        featuredImage={data?.genericPage.featuredImage}
      />
      <LeasingQuestionContainer
        crumbs={crumbs}
        body={body}
        title={metaData?.title}
        sections={sections}
      />
    </>
  );
};

export default withApollo(LeasingQuestion, { getDataFromTree });
