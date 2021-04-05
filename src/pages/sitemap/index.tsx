import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import SimplePageContainer from '../../containers/SimplePageContainer/SimplePageContainer';
import createApolloClient from '../../apolloClient';
import { decodeData, encodeData } from '../../utils/data';

const SitemapPage: NextPage<IGenericPage> = ({
  data: encodedData,
  loading,
}) => <SimplePageContainer data={decodeData(encodedData)} loading={loading} />;

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'sitemap',
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data: encodeData(data),
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default SitemapPage;
