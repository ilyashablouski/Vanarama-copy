import { NextPage, NextPageContext } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import { ISearchPageProps } from '../../models/ISearchPageProps';
import createApolloClient from '../../apolloClient';
import { ssrCMSQueryExecutor } from '../../containers/SearchPageContainer/helpers';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';

import { decodeData, encodeData } from '../../utils/data';
import {
  GET_CARDS_DATA,
  GET_TEXT_SEARCH_VEHICLES_DATA,
} from '../../containers/GlobalSearchContainer/gql';
import {
  fullTextSearchVehicleList,
  fullTextSearchVehicleListVariables,
} from '../../../generated/fullTextSearchVehicleList';
import GlobalSearchPageContainer from '../../containers/GlobalSearchPageContainer';

import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  GlobalSearchCardsData,
  GlobalSearchCardsData_productCard as ICardsData,
  GlobalSearchCardsDataVariables,
} from '../../../generated/GlobalSearchCardsData';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
  textSearchList?: fullTextSearchVehicleList;
  carsData?: ICardsData[];
  vansData?: ICardsData[];
  responseVansCapIds?: string[];
  responseCarsCapIds?: string[];
}

const Page: NextPage<IProps> = ({
  pageData,
  metaData,
  textSearchList,
  carsData,
  vansData,
  responseVansCapIds,
  responseCarsCapIds,
}) => {
  return (
    <GlobalSearchPageContainer
      metaData={metaData}
      carsData={carsData}
      vansData={vansData}
      responseVansCapIds={responseVansCapIds}
      responseCarsCapIds={responseCarsCapIds}
      pageData={decodeData(pageData)}
      preLoadTextSearchList={decodeData(textSearchList)}
    />
  );
};
export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({}, context);
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
  const textSearchList = await client
    .query<fullTextSearchVehicleList, fullTextSearchVehicleListVariables>({
      query: GET_TEXT_SEARCH_VEHICLES_DATA,
      variables: {
        query: contextData.query.searchTerm as string,
        from: 0,
        size: 12,
      },
    })
    .then(async resp => {
      responseCarsCapIds = resp.data?.fullTextSearchVehicleList?.vehicles
        ?.filter(vehicle => vehicle.vehicleType === VehicleTypeEnum.CAR)
        .map(vehicle => vehicle.derivativeId);
      responseVansCapIds = resp.data?.fullTextSearchVehicleList?.vehicles
        ?.filter(vehicle => vehicle.vehicleType === VehicleTypeEnum.LCV)
        .map(vehicle => vehicle.derivativeId);
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

  return {
    props: {
      pageData: encodeData(data),
      metaData: data?.genericPage.metaData || null,
      textSearchList: encodeData(textSearchList) || null,
      carsData: carsData || null,
      vansData: vansData || null,
      responseVansCapIds: responseVansCapIds || null,
      responseCarsCapIds: responseCarsCapIds || null,
    },
  };
}

export default Page;
