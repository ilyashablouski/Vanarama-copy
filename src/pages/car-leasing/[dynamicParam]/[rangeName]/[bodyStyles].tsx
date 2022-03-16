import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import createApolloClient from '../../../../apolloClient';
import { GET_SEARCH_POD_DATA } from '../../../../containers/SearchPodContainer/gql';
import {
  bodyUrlsSlugMapper,
  countOfUniqueQueries,
  getCapsIds,
  RESULTS_PER_REQUEST,
  sortObjectGenerator,
  ssrCMSQueryExecutor,
} from '../../../../containers/SearchPageContainer/helpers';
import { RangeSearchContainer } from '../../../../containers/SearchPageContainer';
import { GET_VEHICLE_LIST } from '../../../../containers/SearchPageContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../../../containers/CustomerAlsoViewedContainer/gql';
import { GenericPageQuery } from '../../../../../generated/GenericPageQuery';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  SortObject,
  VehicleTypeEnum,
} from '../../../../../generated/globalTypes';
import {
  vehicleList,
  vehicleListVariables,
} from '../../../../../generated/vehicleList';
import {
  GetProductCard,
  GetProductCardVariables,
} from '../../../../../generated/GetProductCard';
import {
  filterList,
  filterListVariables,
  filterList_filterList as IFilterList,
} from '../../../../../generated/filterList';
import { ISearchPageProps } from '../../../../models/ISearchPageProps';
import { decodeData, encodeData } from '../../../../utils/data';
import { Nullable } from '../../../../types/common';
import { getManufacturerJson } from '../../../../utils/url';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
  vehiclesList?: Nullable<vehicleList>;
  productCardsData?: Nullable<GetProductCard>;
  responseCapIds?: Nullable<string[]>;
  filtersData?: Nullable<IFilterList>;
  manufacturerParam: string;
  rangeParam?: string;
  defaultSort?: SortObject[];
}

const Page: NextPage<IProps> = ({
  isServer,
  pageData,
  metaData,
  filtersData,
  vehiclesList: encodedData,
  productCardsData: productEncodedData,
  responseCapIds,
  rangeParam,
  manufacturerParam,
  defaultSort,
}) => {
  const router = useRouter();
  // De-obfuscate data for user
  const vehiclesList = decodeData(encodedData);
  const productCardsData = decodeData(productEncodedData);

  useEffect(() => {
    if (!router.query.make) {
      const query = {
        ...router.query,
        make: router.query.dynamicParam,
      };
      const { asPath, pathname } = router;
      router.replace(
        {
          pathname,
          query,
        },
        asPath,
        { shallow: true },
      );
    }
    // it's should executed only when page init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RangeSearchContainer
      dataUiTestId="cars-search-page"
      isServer={isServer}
      isCarSearch
      isModelPage
      pageData={pageData}
      metaData={metaData}
      preLoadFiltersData={filtersData}
      preLoadVehiclesList={vehiclesList}
      preLoadProductCardsData={productCardsData}
      preLoadResponseCapIds={responseCapIds}
      preloadManufacturer={manufacturerParam}
      preloadRange={rangeParam}
      defaultSort={defaultSort}
    />
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  const client = createApolloClient({});
  const { query } = context;
  let vehiclesList;
  let productCardsData;
  let responseCapIds;
  let defaultSort;
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
        'isModelPage',
      )) as ApolloQueryResult<GenericPageQuery>,
      getManufacturerJson(),
    ]);
    const { data: filtersData } = await client.query<
      filterList,
      filterListVariables
    >({
      query: GET_SEARCH_POD_DATA,
      variables: {
        onOffer: null,
        vehicleTypes: [VehicleTypeEnum.CAR],
        manufacturerSlug: (query?.dynamicParam as string).toLowerCase(),
        rangeSlug: (query?.rangeName as string).toLowerCase(),
        bodyStyles: [
          bodyUrlsSlugMapper[
            (context?.query
              ?.bodyStyles as string) as keyof typeof bodyUrlsSlugMapper
          ] ?? (context?.query?.bodyStyles as string).replace('-', ' '),
        ],
      },
    });
    defaultSort = sortObjectGenerator([
      {
        field: SortField.offerRanking,
        direction: SortDirection.ASC,
      },
      {
        field: SortField.availability,
        direction: SortDirection.ASC,
      },
    ]);
    if (countOfUniqueQueries(context.query) === 3) {
      vehiclesList = await client
        .query<vehicleList, vehicleListVariables>({
          query: GET_VEHICLE_LIST,
          variables: {
            vehicleTypes: [VehicleTypeEnum.CAR],
            leaseType: LeaseTypeEnum.PERSONAL,
            onOffer: null,
            first: RESULTS_PER_REQUEST,
            sort: defaultSort,
            manufacturerSlug: (context?.query
              ?.dynamicParam as string).toLowerCase(),
            rangeSlug: (context?.query?.rangeName as string).toLowerCase(),
            bodyStyles: [
              bodyUrlsSlugMapper[
                (context?.query
                  ?.bodyStyles as string) as keyof typeof bodyUrlsSlugMapper
              ] ?? (context?.query?.bodyStyles as string).replace('-', ' '),
            ],
          },
        })
        .then(resp => resp.data);

      responseCapIds = getCapsIds(vehiclesList.vehicleList?.edges || []);
      if (responseCapIds.length) {
        productCardsData = await client
          .query<GetProductCard, GetProductCardVariables>({
            query: GET_PRODUCT_CARDS_DATA,
            variables: {
              capIds: responseCapIds,
              vehicleType: VehicleTypeEnum.CAR,
            },
          })
          .then(resp => resp.data);
      }
    }
    query.make = (query.dynamicParam as string).toLowerCase();
    return {
      props: {
        pageData: data,
        migrationSlugs: migrationSlugs || null,
        metaData: data?.genericPage.metaData || null,
        isServer: !!context.req,
        filtersData: filtersData?.filterList || null,
        vehiclesList: vehiclesList ? encodeData(vehiclesList) : null,
        productCardsData: productCardsData
          ? encodeData(productCardsData)
          : null,
        responseCapIds: responseCapIds || null,
        defaultSort: defaultSort || null,
        manufacturerParam: (context?.query
          ?.dynamicParam as string).toLowerCase(),
        rangeParam: (context?.query?.rangeName as string).toLowerCase(),
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

export default Page;
