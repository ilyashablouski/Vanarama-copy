import { NextPage, NextPageContext } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import { ServerResponse } from 'http';
import { ISearchPageProps } from '../../models/ISearchPageProps';
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
  productDerivativesVariables,
} from '../../../generated/productDerivatives';
import GlobalSearchPageContainer from '../../containers/GlobalSearchPageContainer';

import {
  FinanceTypeEnum,
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
  buildInitialFilterState,
  DEFAULT_SORT,
} from '../../containers/GlobalSearchPageContainer/helpers';
import { IFiltersData } from '../../containers/GlobalSearchPageContainer/interfaces';
import { notFoundPageHandler } from '../../utils/url';
import PageNotFoundContainer from '../../containers/PageNotFoundContainer/PageNotFoundContainer';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
  filtersData: IProductFilter;
  productDerivatives?: IProductDerivativesQuery;
  carsData?: ICardsData[];
  vansData?: ICardsData[];
  responseVansCapIds?: string[];
  responseCarsCapIds?: string[];
  initialFilters: IFiltersData;
  defaultSort: ProductDerivativeSort[];
}

const Page: NextPage<IProps> = ({
  pageData,
  filtersData,
  initialFilters,
  metaData,
  productDerivatives,
  carsData,
  vansData,
  error,
  notFoundPageData,
  defaultSort,
}) => {
  if (error) {
    return (
      <PageNotFoundContainer
        featured={notFoundPageData?.featured}
        cards={notFoundPageData?.cards}
        name={notFoundPageData?.name}
      />
    );
  }
  return (
    <GlobalSearchPageContainer
      metaData={metaData}
      defaultSort={defaultSort}
      filtersData={filtersData}
      initialFilters={initialFilters}
      carsData={carsData}
      vansData={vansData}
      pageData={decodeData(pageData)}
      preLoadProductDerivatives={decodeData(productDerivatives)}
    />
  );
};
export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({}, context);
  // TODO: Should be removed after GlobalSearch release
  const isEnableGSFeature = context?.req?.headers?.cookie?.includes(
    'DIG-5552=1',
  );
  if (!isEnableGSFeature) {
    return notFoundPageHandler(context.res as ServerResponse, client);
  }
  const contextData = {
    req: {
      url: context.req?.url || '',
    },
    query: { ...context.query },
  };
  const { data } = (await ssrCMSQueryExecutor(
    client,
    contextData,
    false,
    'isGlobalSearch',
  )) as ApolloQueryResult<GenericPageQuery>;
  let responseCarsCapIds;
  let responseVansCapIds;
  let carsData;
  let vansData;
  const sortOrder = DEFAULT_SORT;
  const productDerivatives = await client
    .query<IProductDerivativesQuery, productDerivativesVariables>({
      query: GET_PRODUCT_DERIVATIVES,
      variables: {
        query: contextData.query.searchTerm as string,
        from: 0,
        size: RESULTS_PER_REQUEST,
        sort: sortOrder,
        filters: {
          financeTypes: [FinanceTypeEnum.PCH],
        },
      },
    })
    .then(async resp => {
      responseCarsCapIds = resp.data?.productDerivatives?.derivatives
        ?.filter(vehicle => vehicle?.vehicleType === VehicleTypeEnum.CAR)
        .map(vehicle => `${vehicle?.derivativeId}`);
      responseVansCapIds = resp.data?.productDerivatives?.derivatives
        ?.filter(vehicle => vehicle?.vehicleType === VehicleTypeEnum.LCV)
        .map(vehicle => `${vehicle?.derivativeId}`);
      if (responseCarsCapIds?.[0]) {
        carsData = await client
          .query<GlobalSearchCardsData, GlobalSearchCardsDataVariables>({
            query: GET_CARDS_DATA,
            variables: {
              capIds: responseCarsCapIds as string[],
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
              capIds: responseVansCapIds as string[],
              vehicleType: VehicleTypeEnum.LCV,
            },
          })
          .then(({ data: respData }) => respData?.productCard);
      }
      return resp.data;
    });

  const filtersData = await client
    .query<IProductFilterQuery, IProductFilterVariables>({
      query: GET_FILTERS_DATA,
      variables: {
        query: contextData.query.searchTerm as string,
      },
    })
    .then(({ data: productFilterData }) => productFilterData.productFilter);

  const initialFilters = buildInitialFilterState(context.query);

  return {
    props: {
      pageData: encodeData(data),
      metaData: data?.genericPage.metaData || null,
      productDerivatives: encodeData(productDerivatives) || null,
      carsData: carsData || null,
      vansData: vansData || null,
      responseVansCapIds: responseVansCapIds || null,
      responseCarsCapIds: responseCarsCapIds || null,
      filtersData: filtersData || null,
      defaultSort: sortOrder,
      initialFilters,
    },
  };
}

export default Page;
