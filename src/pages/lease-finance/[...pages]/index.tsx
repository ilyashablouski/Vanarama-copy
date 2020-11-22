import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import { useRouter } from 'next/router';
import FinanceInformationExplainedContainer from '../../../containers/FinanceInformationExplainedContainer/FinanceInfromationExplainedContainer';
import { PAGE_COLLECTION } from '../../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../../utils/pageSlugs';
import FinanceExplainedContainer from '../../../containers/FinanceExplainedContainer/FinanceExplainedContainer';
import { GENERIC_PAGE, IGenericPage } from '../../../gql/genericPage';
import createApolloClient from '../../../apolloClient';
import { getSectionsData } from '../../../utils/getSectionsData';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../generated/PageCollection';

const EligibilityChecker: NextPage<IGenericPage> = ({ data, error }) => {
  const router = useRouter();

  if (error || !data?.genericPage) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const title = getSectionsData(['metaData', 'name'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  if (router.asPath.split('/').length > 3) {
    return (
      <>
        <div className="row:title">
          <Breadcrumb items={breadcrumbsItems} />
        </div>
        <FinanceInformationExplainedContainer
          title={title}
          sections={sections}
        />
      </>
    );
  }

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
      </div>
      <FinanceExplainedContainer data={data} />
    </>
  );
};

export async function getStaticPaths() {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Lease Finance',
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'lease-finance'),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const paths = context?.params?.pages as string[];

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: `lease-finance/${paths?.join('/')}`,
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

export default EligibilityChecker;
