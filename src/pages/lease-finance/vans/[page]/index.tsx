import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import FinanceInformationExplainedContainer from '../../../../containers/FinanceInformationExplainedContainer/FinanceInfromationExplainedContainer';
import { GENERIC_PAGE, IGenericPage } from '../../../../gql/genericPage';
import { getSectionsData } from '../../../../utils/getSectionsData';
import createApolloClient from '../../../../apolloClient';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb';

const FinanceInfo: NextPage<IGenericPage> = ({ data, error }) => {
  if (error || !data?.genericPage) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const title = getSectionsData(['metaData', 'name'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
      </div>
      <FinanceInformationExplainedContainer title={title} sections={sections} />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { page: 'business-contract-hire' } },
      { params: { page: 'business-lease-purchase' } },
      { params: { page: 'personal-contract-hire' } },
      { params: { page: 'business-finance-lease' } },
      { params: { page: 'business-contract-purchase' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, loading, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: `lease-finance/vans/${context?.params?.page}`,
      },
    });

    if (errors) return { props: { error: true } };

    return {
      props: {
        data,
        loading,
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
