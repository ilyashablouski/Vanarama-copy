import DefaultErrorPage from 'next/error';
import dynamic from 'next/dynamic';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import createApolloClient from '../../apolloClient';
import Skeleton from '../../components/Skeleton';

const LeasingQuestionsContainer = dynamic(
  () =>
    import(
      '../../containers/LeasingQuestionsContainer/LeasingQuestionsContainer'
    ),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const FinanceInfo: NextPage<IGenericPage> = ({ data, error }) => {
  if (error || !data?.genericPage) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return <LeasingQuestionsContainer data={data} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'leasing-questions',
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

export default FinanceInfo;
