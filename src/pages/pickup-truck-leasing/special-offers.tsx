import { NextPage, NextPageContext } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import { GET_VEHICLE_LIST } from '../../containers/SearchPageContainer/gql';
import createApolloClient from '../../apolloClient';
import {
  getCapsIds,
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
      isPickups
      pageData={pageData}
      metaData={metaData}
      preLoadVehiclesList={vehiclesList}
      preLoadProductCardsData={productCardsData}
      preLoadResponseCapIds={responseCapIds}
    />
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({}, context);
  let vehiclesList;
  let productCardsData;
  let responseCapIds;
  const { data } = (await ssrCMSQueryExecutor(
    client,
    context,
    false,
    'isSpecialOfferPage',
  )) as ApolloQueryResult<any>;
  if (!Object.keys(context.query).length) {
    vehiclesList = await client
      .query({
        query: GET_VEHICLE_LIST,
        variables: {
          vehicleTypes: [VehicleTypeEnum.LCV],
          leaseType: LeaseTypeEnum.BUSINESS,
          onOffer: true,
          first: 9,
          sortField: SortField.offerRanking,
          sortDirection: SortDirection.ASC,
          bodyStyles: ['Pickup'],
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
      pageData: data,
      metaData: data.genericPage.metaData,
      isServer: !!context.req,
      vehiclesList: vehiclesList || null,
      productCardsData: productCardsData || null,
      responseCapIds: responseCapIds || null,
    },
  };
}

export default Page;
