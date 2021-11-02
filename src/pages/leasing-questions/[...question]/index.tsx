import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { PageTypeEnum } from 'types/common';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import { PAGE_COLLECTION } from '../../../gql/pageCollection';
import { IInsurancePage } from '../../../models/IInsuranceProps';
import { GENERIC_PAGE_QUESTION } from '../../../containers/LeasingQuestionContainer/gql';
import createApolloClient from '../../../apolloClient';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../generated/PageCollection';
import { getPathsFromPageCollection } from '../../../utils/pageSlugs';
import { getSectionsData } from '../../../utils/getSectionsData';
import Skeleton from '../../../components/Skeleton';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../generated/GenericPageQuery';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../utils/env';
import { convertErrorToProps } from '../../../utils/helpers';
import ErrorPage from '../../_error';

const SchemaJSON = dynamic(() => import('core/atoms/schema-json'), {
  loading: () => <Skeleton count={1} />,
});
const Head = dynamic(() => import('../../../components/Head/Head'), {
  loading: () => <Skeleton count={1} />,
});
const LeasingQuestionContainer = dynamic(
  () =>
    import(
      '../../../containers/LeasingQuestionContainer/LeasingQuestionContainer'
    ),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const MultiYearInsurancePage: NextPage<IInsurancePage> = props => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.pageType === PageTypeEnum.ERROR) {
    return <ErrorPage errorData={props.error} />;
  }

  const { data } = props;

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const body = getSectionsData(['intro', 'body'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      {breadcrumbsItems && (
        <div className="row:title">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
      )}
      <LeasingQuestionContainer
        body={body}
        title={metaData?.name}
        sections={sections}
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

export async function getStaticPaths(context: GetStaticPropsContext) {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Leasing Question',
      isPreview: !!context?.preview,
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'leasing-questions'),
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IInsurancePage>> {
  try {
    const client = createApolloClient({});
    const paths = context?.params?.question as string[];

    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE_QUESTION,
      variables: {
        slug: `leasing-questions/${paths?.join('/')}`,
        isPreview: !!context?.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;
    const revalidate = DEFAULT_REVALIDATE_INTERVAL_ERROR;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return {
        notFound: true,
        revalidate,
      };
    }

    return {
      revalidate,
      props: {
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default MultiYearInsurancePage;
