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

const FinanceInfo: NextPage<IGenericPage> = ({ data }) => {
  if (!data?.genericPage) {
    return <></>;
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
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default FinanceInfo;
