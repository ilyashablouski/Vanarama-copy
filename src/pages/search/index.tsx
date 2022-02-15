import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import {
  INotFoundPageData,
  ISearchPageProps,
} from '../../models/ISearchPageProps';
import createApolloClient from '../../apolloClient';
import {
  RESULTS_PER_REQUEST,
  ssrCMSQueryExecutor,
} from '../../containers/SearchPageContainer/helpers';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';

import { decodeData, encodeData } from '../../utils/data';
import {
  GET_CARDS_DATA,
  GET_PRODUCT_DERIVATIVES,
} from '../../containers/GlobalSearchContainer/gql';
import {
  productDerivatives as IProductDerivativesQuery,
  productDerivatives_productDerivatives_derivatives as IDerivatives,
  productDerivatives_productDerivatives as IProductDerivatives,
  productDerivativesVariables,
} from '../../../generated/productDerivatives';
import GlobalSearchPageContainer from '../../containers/GlobalSearchPageContainer';

import {
  FinanceType,
  ProductDerivativeSort,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import {
  GlobalSearchCardsData,
  GlobalSearchCardsData_productCard as ICardsData,
  GlobalSearchCardsDataVariables,
} from '../../../generated/GlobalSearchCardsData';
import {
  productFilter as IProductFilterQuery,
  productFilter_productFilter as IProductFilter,
  productFilterVariables as IProductFilterVariables,
} from '../../../generated/productFilter';
import { GET_FILTERS_DATA } from '../../containers/GlobalSearchPageContainer/gql';
import {
  buildFiltersRequestObject,
  buildInitialFilterState,
  DEFAULT_SORT,
} from '../../containers/GlobalSearchPageContainer/helpers';
import { IFiltersData } from '../../containers/GlobalSearchPageContainer/interfaces';
import { Nullable } from '../../types/common';
import { getManufacturerJson } from '../../utils/url';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
  filtersData: Nullable<IProductFilter>;
  productDerivatives?: Nullable<IProductDerivatives>;
  carsData?: Nullable<ICardsData[]>;
  vansData?: Nullable<ICardsData[]>;
  responseVansCapIds?: Nullable<string[]>;
  responseCarsCapIds?: Nullable<string[]>;
  initialFilters: IFiltersData;
  error?: ApolloError;
  notFoundPageData?: INotFoundPageData;
  defaultSort: ProductDerivativeSort[];
  isAllProductsRequest: boolean;
}

const Page: NextPage<IProps> = ({
  pageData,
  filtersData,
  initialFilters,
  metaData,
  productDerivatives,
  carsData,
  vansData,
  defaultSort,
  isAllProductsRequest,
}) => (
  <GlobalSearchPageContainer
    metaData={metaData}
    defaultSort={defaultSort}
    filtersData={filtersData}
    initialFilters={initialFilters}
    carsData={carsData}
    vansData={vansData}
    isAllProductsRequest={isAllProductsRequest}
    pageData={decodeData(pageData)}
    preLoadProductDerivatives={decodeData(productDerivatives)}
  />
);
export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  const client = createApolloClient({}, context);
  let responseCarsCapIds;
  let responseVansCapIds;
  let carsData;
  let vansData;
  let isAllProductsRequest = false;

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
        false,
        'isGlobalSearch',
      )) as ApolloQueryResult<GenericPageQuery>,
      getManufacturerJson(),
    ]);
    const initialFilters = buildInitialFilterState(context.query);
    const sortOrder = DEFAULT_SORT;
    const responseHandler = async (derivatives: IDerivatives[]) => {
      responseCarsCapIds = derivatives
        ?.filter(vehicle => vehicle?.vehicleType === VehicleTypeEnum.CAR)
        .map(vehicle => `${vehicle?.derivativeId}`);
      responseVansCapIds = derivatives
        ?.filter(vehicle => vehicle?.vehicleType === VehicleTypeEnum.LCV)
        .map(vehicle => `${vehicle?.derivativeId}`);
      if (responseCarsCapIds?.[0]) {
        carsData = await client
          .query<GlobalSearchCardsData, GlobalSearchCardsDataVariables>({
            query: GET_CARDS_DATA,
            variables: {
              capIds: responseCarsCapIds,
              vehicleType: VehicleTypeEnum.CAR,
            },
          })
          .then(({ data: respData }) => respData?.productCard);
      }
      if (responseVansCapIds?.[0]) {
        vansData = await client
          .query<GlobalSearchCardsData, GlobalSearchCardsDataVariables>({
            query: GET_CARDS_DATA,
            variables: {
              capIds: responseVansCapIds,
              vehicleType: VehicleTypeEnum.LCV,
            },
          })
          .then(({ data: respData }) => respData?.productCard);
      }
    };
    const searchTerm = decodeURIComponent(
      contextData.query.searchTerm as string,
    );
    const productDerivatives = await client
      .query<IProductDerivativesQuery, productDerivativesVariables>({
        query: GET_PRODUCT_DERIVATIVES,
        variables: {
          query: searchTerm,
          from: 0,
          size: RESULTS_PER_REQUEST,
          sort: sortOrder,
          filters: {
            ...buildFiltersRequestObject(initialFilters, false, true),
            financeTypes: [FinanceType.PCH],
          },
        },
      })
      .then(async resp => {
        if (resp.data?.productDerivatives?.total! > 0) {
          await responseHandler(
            (resp.data?.productDerivatives?.derivatives as IDerivatives[]) ||
              [],
          );
          return resp.data.productDerivatives;
        }
        return client
          .query<IProductDerivativesQuery, productDerivativesVariables>({
            query: GET_PRODUCT_DERIVATIVES,
            variables: {
              from: 0,
              size: RESULTS_PER_REQUEST,
              sort: sortOrder,
              filters: {
                ...buildFiltersRequestObject(initialFilters, false, true),
                financeTypes: [FinanceType.PCH],
              },
            },
          })
          .then(async allData => {
            isAllProductsRequest = true;
            await responseHandler(
              (allData.data?.productDerivatives
                ?.derivatives as IDerivatives[]) || [],
            );
            return allData.data.productDerivatives;
          });
      });

    const filtersData = await client
      .query<IProductFilterQuery, IProductFilterVariables>({
        query: GET_FILTERS_DATA,
        variables: {
          query: isAllProductsRequest ? undefined : searchTerm,
          filters: buildFiltersRequestObject(initialFilters, false),
        },
      })
      .then(({ data: productFilterData }) => productFilterData.productFilter)
      .catch(() => null);

    return {
      props: {
        isServer: !!context.req,
        migrationSlugs: migrationSlugs || null,
        pageData: encodeData(data),
        metaData: data?.genericPage.metaData || null,
        productDerivatives: productDerivatives
          ? encodeData(productDerivatives)
          : null,
        carsData: carsData || null,
        vansData: vansData || null,
        responseVansCapIds: responseVansCapIds || null,
        responseCarsCapIds: responseCarsCapIds || null,
        filtersData: filtersData || null,
        defaultSort: sortOrder,
        isAllProductsRequest,
        initialFilters,
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
