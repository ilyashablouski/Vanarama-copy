import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
// import { LazyLoadComponent } from 'react-lazy-load-image-component';
import SchemaJSON from 'core/atoms/schema-json';
import LeasingArticleContainer from '../../../../containers/LeasingArticleContainer/LeasingArticleContainer';
import ContentHubContainer from '../../../../containers/EvContentHubContainer';
import Breadcrumbs from '../../../../core/atoms/breadcrumbs-v2';
import createApolloClient from '../../../../apolloClient';
import { getSectionsData } from '../../../../utils/getSectionsData';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../../generated/GenericPageQuery';
import { GENERIC_PAGE } from '../../../../gql/genericPage';
import Head from '../../../../components/Head/Head';
import { decodeData, encodeData } from '../../../../utils/data';

interface IProps {
  data: GenericPageQuery;
  isContentHubPage: boolean;
}

export const EVHubPage: NextPage<IProps> = ({
  data: encodedData,
  isContentHubPage,
}) => {
  const data = decodeData(encodedData) as GenericPageQuery;
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const title = metaData.name;
  const sections = getSectionsData(['sections'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);
  const featuredImageUrl = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.genericPage,
  );
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));
  if (isContentHubPage) {
    return <ContentHubContainer data={data} />;
  }
  return (
    <>
      {breadcrumbsItems && (
        <div className="row:title">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
      )}
      <LeasingArticleContainer
        body={body}
        title={title}
        sections={sections}
        image={featuredImageUrl}
      />
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const param = context?.params?.evHubParam as string;
    const path = `electric-leasing/cars/${param}`;
    const isContentHubPage = [
      'electric-car-charging-everything-you-need-to-know',
      'electric-cars-and-the-environment',
      'how-electric-cars-work',
      'your-guide-to-ev-range',
    ].includes(param);

    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: path,
        sectionsAsArray: isContentHubPage,
        isPreview: !!context?.preview,
      },
    });

    return {
      props: {
        data: encodeData(data),
        isContentHubPage,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return { notFound: true };
    }

    // throw any other errors
    // Next will render our custom pages/_error
    throw error;
  }
}

export default EVHubPage;
