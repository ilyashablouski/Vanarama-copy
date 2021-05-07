import { NextPage, NextPageContext } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import { ISearchPageProps } from '../../models/ISearchPageProps';
import createApolloClient from '../../apolloClient';
import { ssrCMSQueryExecutor } from '../../containers/SearchPageContainer/helpers';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';

import { decodeData, encodeData } from '../../utils/data';
import { GET_TEXT_SEARCH_VEHICLES_DATA } from '../../containers/GlobalSearchContainer/gql';
import {
  fullTextSearchVehicleList,
  fullTextSearchVehicleListVariables,
} from '../../../generated/fullTextSearchVehicleList';
import GlobalSearchPageContainer from '../../containers/GlobalSearchPageContainer';
import { GET_MODEL_IMAGES } from '../../containers/SearchPageContainer/gql';
import {
  ModelImages,
  ModelImagesVariables,
  ModelImages_vehicleImages as IVehiclesImage,
} from '../../../generated/ModelImages';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
  textSearchList?: fullTextSearchVehicleList;
  vehiclesImage?: IVehiclesImage[];
  responseCapIds?: string[];
}

const Page: NextPage<IProps> = ({
  pageData,
  metaData,
  textSearchList,
  vehiclesImage,
  responseCapIds,
}) => {
  return (
    <GlobalSearchPageContainer
      vehiclesImage={vehiclesImage}
      metaData={metaData}
      responseCapIds={responseCapIds}
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
    true,
    '',
  )) as ApolloQueryResult<GenericPageQuery>;
  let responseCapIds;
  let vehiclesImage;
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
      responseCapIds = resp.data?.fullTextSearchVehicleList?.vehicles?.map(
        vehicle => vehicle.derivativeId,
      );
      if (responseCapIds?.length) {
        vehiclesImage = await client
          .query<ModelImages, ModelImagesVariables>({
            query: GET_MODEL_IMAGES,
            variables: {
              capIds: responseCapIds,
            },
          })
          .then(imagesResp => imagesResp.data?.vehicleImages);
      }
      return resp.data;
    });

  return {
    props: {
      pageData: encodeData(data),
      metaData: data?.genericPage.metaData || null,
      textSearchList: encodeData(textSearchList) || null,
      vehiclesImage: vehiclesImage || null,
      responseCapIds: responseCapIds || null,
    },
  };
}

export default Page;
