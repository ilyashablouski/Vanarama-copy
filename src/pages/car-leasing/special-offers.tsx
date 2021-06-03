import { NextPage, NextPageContext } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import { GET_VEHICLE_LIST } from '../../containers/SearchPageContainer/gql';
import createApolloClient from '../../apolloClient';
import {
  getCapsIds,
  RESULTS_PER_REQUEST,
  ssrCMSQueryExecutor,
} from '../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../containers/SearchPageContainer';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import { vehicleList } from '../../../generated/vehicleList';
import { GET_PRODUCT_CARDS_DATA } from '../../containers/CustomerAlsoViewedContainer/gql';
import { GetProductCard } from '../../../generated/GetProductCard';
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
      isSpecialOfferPage
      isCarSearch
      pageData={decodeData(pageData)}
      metaData={metaData}
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
    true,
    'isSpecialOfferPage',
  )) as ApolloQueryResult<GenericPageQuery>;
  if (!Object.keys(context.query).length) {
    vehiclesList = await client
      .query({
        query: GET_VEHICLE_LIST,
        variables: {
          vehicleTypes: [VehicleTypeEnum.CAR],
          leaseType: LeaseTypeEnum.PERSONAL,
          onOffer: true,
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
          .query({
            query: GET_PRODUCT_CARDS_DATA,
            variables: {
              capIds: responseCapIds,
              vehicleType: VehicleTypeEnum.CAR,
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
      pageData: encodeData(data),
      metaData: data?.genericPage.metaData || null,
      isServer: !!context.req,
      vehiclesList: encodeData(vehiclesList) || null,
      productCardsData: encodeData(productCardsData) || null,
      responseCapIds: responseCapIds || null,
    },
  };
}

export default Page;
