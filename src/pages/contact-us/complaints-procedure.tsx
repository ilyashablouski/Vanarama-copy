import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import SimplePageContainer from '../../containers/SimplePageContainer/SimplePageContainer';
import createApolloClient from '../../apolloClient';

const ComplainsPage: NextPage<IGenericPage> = ({ data, loading }) => (
  <SimplePageContainer data={data} loading={loading} />
);

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'contact-us/complaints-procedure',
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default ComplainsPage;
