import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import withApollo from '../../hocs/withApollo';
import FAQContainer from '../../containers/FAQContainer/FAQContainer';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import createApolloClient from '../../apolloClient';

const EligibilityChecker: NextPage<IGenericPage> = ({ data, error }) => {
  if (error || !data?.genericPage) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const metaData = data?.genericPage?.metaData;
  const sections = data.genericPage?.sections;
  const intro = data.genericPage?.intro;

  return (
    <FAQContainer title={metaData.name} sections={sections} intro={intro} />
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'insurance/faq',
      },
    });
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default withApollo(EligibilityChecker);
