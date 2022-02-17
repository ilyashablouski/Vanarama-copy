import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { Nullable } from 'types/common';
import {
  GET_MANUFACTURER_LIST,
  GET_LEGACY_URLS,
} from '../../containers/SearchPageContainer/gql';
import createApolloClient from '../../apolloClient';
import { ssrCMSQueryExecutor } from '../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../containers/SearchPageContainer';
import withApollo from '../../hocs/withApollo';
import {
  manufacturerPage,
  manufacturerPage_manufacturerPage_sections as sections,
} from '../../../generated/manufacturerPage';
import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  manufacturerList,
  manufacturerListVariables,
} from '../../../generated/manufacturerList';
import { ISearchPageProps } from '../../models/ISearchPageProps';
import {
  genericPagesQuery,
  genericPagesQueryVariables,
  genericPagesQuery_genericPages as IGenericPage,
} from '../../../generated/genericPagesQuery';
import { formatToSlugFormat, getManufacturerJson } from '../../utils/url';
import { decodeData, encodeData } from '../../utils/data';

interface IProps extends ISearchPageProps {
  topInfoSection?: Nullable<sections>;
  manufacturers: Nullable<manufacturerList>;
  manufacturersUrls: IGenericPage['items'];
}

const Page: NextPage<IProps> = ({
  isServer,
  topInfoSection: topInfoSectionEncodedData,
  metaData,
  manufacturers,
  manufacturersUrls: encodedData,
}) => (
  <SearchPageContainer
    dataUiTestId="cars-search-page"
    isServer={isServer}
    isCarSearch
    isAllManufacturersPage
    metaData={metaData}
    topInfoSection={decodeData(topInfoSectionEncodedData)}
    preLoadManufacturers={manufacturers}
    manufacturersUrls={decodeData(encodedData)}
  />
);

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  const client = createApolloClient({}, context);
  let manufacturers;

  try {
    const contextData = {
      req: {
        url: context.resolvedUrl || '',
      },
      query: { ...context.query },
    };
    const [{ data }, migrationSlugs] = await Promise.all([
      (await ssrCMSQueryExecutor(
        client,
        contextData,
        true,
        'isAllManufacturersPage',
      )) as ApolloQueryResult<manufacturerPage>,
      getManufacturerJson(),
    ]);
    if (!Object.keys(context.query).length) {
      manufacturers = await client
        .query<manufacturerList, manufacturerListVariables>({
          query: GET_MANUFACTURER_LIST,
          variables: {
            vehicleType: VehicleTypeEnum.CAR,
            leaseType: LeaseTypeEnum.PERSONAL,
          },
        })
        .then(resp => resp.data);
    }
    const slugs = manufacturers?.manufacturerList?.map(manufacturer => {
      return `car-leasing/${formatToSlugFormat(
        manufacturer?.manufacturerName || '',
      )}`;
    });
    const manufacturersUrls =
      slugs &&
      (await client
        .query<genericPagesQuery, genericPagesQueryVariables>({
          query: GET_LEGACY_URLS,
          variables: {
            slugs,
            isPreview: !!context?.preview,
          },
        })
        .then(resp => resp?.data?.genericPages?.items));
    return {
      props: {
        topInfoSection: data.manufacturerPage.sections
          ? encodeData(data.manufacturerPage.sections)
          : null,
        metaData: data.manufacturerPage.metaData,
        migrationSlugs: migrationSlugs || null,
        isServer: !!context.req,
        manufacturers: manufacturers || null,
        manufacturersUrls: manufacturersUrls
          ? encodeData(manufacturersUrls)
          : null,
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

export default withApollo(Page);
