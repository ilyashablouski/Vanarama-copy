import { NextPage, NextPageContext } from 'next';
import createApolloClient from '../apolloClient';
import { GET_CAR_DERIVATIVES } from '../containers/OrdersInformation/gql';
import { HomePageData } from '../../generated/HomePageData';
import {
  ProductCardData,
  ProductCardDataVariables,
} from '../../generated/ProductCardData';
import { ALL_HOME_CONTENT } from '../gql/homepage';
import { PRODUCT_CARD_CONTENT } from '../gql/productCard';
import HomePageContainer from '../containers/HomePageContainer';
import { IHomePageContainer } from '../containers/HomePageContainer/HomePageContainer';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import { GetDerivatives } from '../../generated/GetDerivatives';
import { GET_SEARCH_POD_DATA } from '../containers/SearchPodContainer/gql';
import {
  filterList as IFilterList,
  filterListVariables as IFilterListVariables,
} from '../../generated/filterList';
import { VEHICLE_LIST_URL } from '../gql/vehicleList';
import {
  VehicleListUrl,
  VehicleListUrlVariables,
} from '../../generated/VehicleListUrl';

export const HomePage: NextPage<IHomePageContainer> = ({
  data,
  loading,
  error,
  productsVanDerivatives,
  productsCarDerivatives,
  productsPickUpDerivatives,
  productsCar,
  productsPickUp,
  productsVan,
  searchPodVansData,
  searchPodCarsData,
  vehicleListUrlData,
}) => (
  <HomePageContainer
    loading={loading}
    data={data}
    error={error}
    productsCar={productsCar}
    productsPickUp={productsPickUp}
    productsVan={productsVan}
    productsVanDerivatives={productsVanDerivatives}
    productsCarDerivatives={productsCarDerivatives}
    productsPickUpDerivatives={productsPickUpDerivatives}
    searchPodVansData={searchPodVansData}
    searchPodCarsData={searchPodCarsData}
    vehicleListUrlData={vehicleListUrlData}
  />
);

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({}, context);
  const getCapIds = (data: ProductCardData | undefined) =>
    data?.productCarousel?.map(el => el?.capId || '').filter(Boolean) || [''];
  const { data, loading, errors } = await client.query<HomePageData>({
    query: ALL_HOME_CONTENT,
  });
  const [
    [productsVan, productsVanCapIds],
    [productsCar, productsCarIds],
    [productsPickUp, productsPickUpIds],
  ] = await Promise.all([
    client
      .query<ProductCardData, ProductCardDataVariables>({
        query: PRODUCT_CARD_CONTENT,
        variables: {
          type: VehicleTypeEnum.LCV,
          excludeBodyType: 'Pickup',
          size: 9,
          offer: true,
        },
      })
      .then(resp => [resp.data, getCapIds(resp.data)]),
    client
      .query<ProductCardData>({
        query: PRODUCT_CARD_CONTENT,
        variables: { type: VehicleTypeEnum.CAR, size: 9, offer: true },
      })
      .then(resp => [resp.data, getCapIds(resp.data)]),
    client
      .query<ProductCardData>({
        query: PRODUCT_CARD_CONTENT,
        variables: {
          type: VehicleTypeEnum.LCV,
          bodyType: 'Pickup',
          size: 9,
          offer: true,
        },
      })
      .then(resp => [resp.data, getCapIds(resp.data)]),
  ]);
  const [
    { data: productsVanDerivatives },
    { data: productsPickUpDerivatives },
    { data: productsCarDerivatives },
  ] = await Promise.all([
    client.query<GetDerivatives>({
      query: GET_CAR_DERIVATIVES,
      variables: {
        ids: productsVanCapIds,
        vehicleType: VehicleTypeEnum.LCV,
      },
    }),
    client.query<GetDerivatives>({
      query: GET_CAR_DERIVATIVES,
      variables: {
        ids: productsPickUpIds,
        vehicleType: VehicleTypeEnum.LCV,
      },
    }),
    client.query<GetDerivatives>({
      query: GET_CAR_DERIVATIVES,
      variables: {
        ids: productsCarIds,
        vehicleType: VehicleTypeEnum.CAR,
      },
    }),
  ]);
  // const { data: searchPodData, errors: serchPodError } = await client.query<
  //   IFilterList,
  //   IFilterListVariables
  // >({
  //   query: GET_SEARCH_POD_DATA,
  // });
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
  const derivativeIds = [
    ...productsVanCapIds,
    ...productsCarIds,
    ...productsPickUpIds,
  ];
  const { data: vehicleListUrlQuery } = await client.query<
    VehicleListUrl,
    VehicleListUrlVariables
  >({
    query: VEHICLE_LIST_URL,
    variables: {
      derivativeIds,
    },
  });
  const vehicleListUrlData = {
    pageInfo: vehicleListUrlQuery?.vehicleList.pageInfo,
    totalCount: vehicleListUrlQuery?.vehicleList.totalCount,
    edges: vehicleListUrlQuery?.vehicleList.edges,
  };
  const hasNextPage = vehicleListUrlQuery?.vehicleList.pageInfo.hasNextPage;
  if (hasNextPage) {
    const edges = vehicleListUrlQuery?.vehicleList.edges || [];
    const lastCursor = edges[edges.length - 1]?.cursor;
    const { data: fetchMoreData } = await client.query<
      VehicleListUrl,
      VehicleListUrlVariables
    >({
      query: VEHICLE_LIST_URL,
      variables: {
        derivativeIds,
        after: lastCursor,
      },
    });
    vehicleListUrlData.pageInfo = fetchMoreData?.vehicleList.pageInfo;
    vehicleListUrlData.totalCount = fetchMoreData?.vehicleList.totalCount;
    vehicleListUrlData.edges = [
      ...(vehicleListUrlData.edges || []),
      ...(fetchMoreData?.vehicleList?.edges || []),
    ];
  }

  return {
    props: {
      data,
      loading,
      error: errors || null,
      productsVanDerivatives,
      productsCarDerivatives,
      productsPickUpDerivatives,
      productsCar,
      productsPickUp,
      searchPodVansData,
      searchPodCarsData,
      productsVan,
      vehicleListUrlData,
    },
  };
}

export default HomePage;
