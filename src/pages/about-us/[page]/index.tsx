import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { ApolloError } from '@apollo/client';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import withApollo from '../../../hocs/withApollo';
import SimplePageContainer from '../../../containers/SipmlePageContainer/SipmlePageContainer';
import createApolloClient from '../../../apolloClient';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { getSectionsData } from '../../../utils/getSectionsData';

interface IAboutUsPage {
  data: GenericPageQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

const AboutUsPage: NextPage<IAboutUsPage> = ({ data, loading, error }) => {
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
      </div>
      <SimplePageContainer
        data={data}
        loading={loading || !data}
        error={error}
      />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { page: 'meet-the-directors' } },
      { params: { page: 'five-star-service' } },
      { params: { page: 'price-protection-guarantee' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = createApolloClient({}, context as NextPageContext);
  const { data, loading, errors } = await client.query({
    query: GENERIC_PAGE,
    variables: {
      slug: `about-us/${context?.params?.page}`,
    },
  });
  return {
    props: {
      data,
      loading,
      error: errors ? errors[0] : null,
    },
  };
}

export default withApollo(AboutUsPage);
