import { NextPage } from 'next';
import { PreviewNextPageContext } from 'types/common';
import createApolloClient from '../apolloClient';
import { HomePageData } from '../../generated/HomePageData';
import { ALL_HOME_CONTENT } from '../gql/homepage';
import HomePageContainer from '../containers/HomePageContainer';
import { IHomePageContainer } from '../containers/HomePageContainer/HomePageContainer';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import { GET_SEARCH_POD_DATA } from '../containers/SearchPodContainer/gql';
import {
  filterList as IFilterList,
  filterListVariables as IFilterListVariables,
} from '../../generated/filterList';
import { specialOffersRequest } from '../utils/offers';
import { decodeData, encodeData } from '../utils/data';

export const HomePage: NextPage<IHomePageContainer> = ({
  data,
  loading,
  productsVanDerivatives,
  productsCarDerivatives,
  productsPickupDerivatives,
  productsCar,
  productsPickup,
  productsVan,
  searchPodVansData,
  searchPodCarsData,
  vehicleListUrlData,
}) => (
  <HomePageContainer
    loading={loading}
    data={decodeData(data)}
    productsCar={productsCar}
    productsPickup={productsPickup}
    productsVan={productsVan}
    productsVanDerivatives={productsVanDerivatives}
    productsCarDerivatives={productsCarDerivatives}
    productsPickupDerivatives={productsPickupDerivatives}
    searchPodVansData={decodeData(searchPodVansData)}
    searchPodCarsData={decodeData(searchPodCarsData)}
    vehicleListUrlData={decodeData(vehicleListUrlData)}
  />
);

export async function getServerSideProps(context: PreviewNextPageContext) {
  const client = createApolloClient({}, context);
  const { data, loading } = await client.query<HomePageData>({
    query: ALL_HOME_CONTENT,
    variables: {
      isPreview: context?.preview || false,
    },
  });
  const {
    productsVanDerivatives,
    productsCarDerivatives,
    productsPickupDerivatives,
    productsCar,
    productsPickup,
    productsVan,
    vehicleListUrlData,
  } = await specialOffersRequest(client);
  const [
    { data: searchPodVansData },
    { data: searchPodCarsData },
  ] = await Promise.all([
    client.query<IFilterList, IFilterListVariables>({
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.LCV],
      },
    }),
    client.query<IFilterList, IFilterListVariables>({
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.CAR],
      },
    }),
  ]);

  return {
    props: {
      data: encodeData(data) || null,
      loading,
      productsVanDerivatives: productsVanDerivatives || null,
      productsCarDerivatives: productsCarDerivatives || null,
      productsPickupDerivatives: productsPickupDerivatives || null,
      productsCar: productsCar || null,
      productsPickup: productsPickup || null,
      productsVan: productsVan || null,
      searchPodVansData: encodeData(searchPodVansData),
      searchPodCarsData: encodeData(searchPodCarsData),
      vehicleListUrlData: encodeData(vehicleListUrlData) || null,
    },
  };
}

export default HomePage;
