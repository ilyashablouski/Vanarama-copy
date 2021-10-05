import { NextPage, NextPageContext } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import { GET_VEHICLE_LIST } from '../../containers/SearchPageContainer/gql';
import createApolloClient from '../../apolloClient';
import SearchPageContainer from '../../containers/SearchPageContainer';
import {
  getCapsIds,
  getCustomFuelTypesFromCookies,
  RESULTS_PER_REQUEST,
  ssrCMSQueryExecutor,
} from '../../containers/SearchPageContainer/helpers';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import {
  vehicleList,
  vehicleListVariables,
} from '../../../generated/vehicleList';
import { GET_PRODUCT_CARDS_DATA } from '../../containers/CustomerAlsoViewedContainer/gql';
import {
  GetProductCard,
  GetProductCardVariables,
} from '../../../generated/GetProductCard';
import { ISearchPageProps } from '../../models/ISearchPageProps';
import { decodeData, encodeData } from '../../utils/data';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
  vehiclesList?: vehicleList;
  productCardsData?: GetProductCard;
  responseCapIds?: string[];
}

const Page: NextPage<IProps> = ({
  isServer,
  pageData,
  metaData,
  vehiclesList,
  productCardsData,
  responseCapIds,
}) => {
  return (
    <SearchPageContainer
      isServer={isServer}
      isCarSearch={false}
      isSimpleSearchPage
      metaData={metaData}
      pageData={decodeData(pageData)}
      preLoadVehiclesList={decodeData(vehiclesList)}
      preLoadProductCardsData={decodeData(productCardsData)}
      preLoadResponseCapIds={responseCapIds}
    />
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({}, context);
  let vehiclesList;
  let productCardsData;
  let responseCapIds;
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
    '',
  )) as ApolloQueryResult<GenericPageQuery>;
  const cookieString = context?.req?.headers?.cookie || '';
  if (!Object.keys(context.query).length) {
    vehiclesList = await client
      .query<vehicleList, vehicleListVariables>({
        query: GET_VEHICLE_LIST,
        variables: {
          vehicleTypes: [VehicleTypeEnum.LCV],
          leaseType: LeaseTypeEnum.BUSINESS,
          fuelTypes: getCustomFuelTypesFromCookies(
            cookieString,
            'customSessionFuelTypes',
          ),
          onOffer: null,
          first: RESULTS_PER_REQUEST,
          sort: [
            { field: SortField.offerRanking, direction: SortDirection.ASC },
          ],
        },
      })
      .then(resp => resp.data);
    try {
      responseCapIds = getCapsIds(vehiclesList.vehicleList?.edges || []);
      if (responseCapIds.length) {
        productCardsData = await client
          .query<GetProductCard, GetProductCardVariables>({
            query: GET_PRODUCT_CARDS_DATA,
            variables: {
              capIds: responseCapIds,
              vehicleType: VehicleTypeEnum.LCV,
            },
          })
          .then(resp => resp.data);
      }
    } catch {
      return false;
    }
  }

  return {
    props: {
      context: cookieString,
      pageData: encodeData(data),
      metaData: data?.genericPage.metaData || null,
      vehiclesList: vehiclesList ? encodeData(vehiclesList) : null,
      productCardsData: productCardsData ? encodeData(productCardsData) : null,
      responseCapIds: responseCapIds || null,
      isServer: !!context.req,
    },
  };
}

export default Page;
