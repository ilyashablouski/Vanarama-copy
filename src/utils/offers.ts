import { ApolloClient } from '@apollo/client';
import {
  ProductCardData,
  ProductCardDataVariables,
} from '../../generated/ProductCardData';
import { PRODUCT_CARD_CONTENT } from '../gql/productCard';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import {
  GetDerivatives,
  GetDerivativesVariables,
} from '../../generated/GetDerivatives';
import { GET_CAR_DERIVATIVES } from '../containers/OrdersInformation/gql';
import {
  VehicleListUrl,
  VehicleListUrl_vehicleList as IVehicleList,
  VehicleListUrlVariables,
} from '../../generated/VehicleListUrl';
import { VEHICLE_LIST_URL } from '../gql/vehicleList';

const getCapIds = (data: ProductCardData | undefined) =>
  data?.productCarousel?.map(el => el?.capId || '').filter(Boolean) || [];

export const getVehicleListUrlQuery = async (
  client: ApolloClient<any>,
  derivativeIds: string[],
) => {
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
    totalCount: vehicleListUrlQuery?.vehicleList.totalCount || 0,
    edges: vehicleListUrlQuery?.vehicleList.edges,
  } as IVehicleList;
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
    vehicleListUrlData.pageInfo =
      fetchMoreData?.vehicleList.pageInfo || vehicleListUrlData.pageInfo;
    vehicleListUrlData.totalCount =
      fetchMoreData?.vehicleList.totalCount || vehicleListUrlData.totalCount;
    vehicleListUrlData.edges = [
      ...(vehicleListUrlData.edges || []),
      ...(fetchMoreData?.vehicleList?.edges || []),
    ];
  }
  return vehicleListUrlData;
};

export function getProductCardContent(
  client: ApolloClient<any>,
  type: VehicleTypeEnum,
  bodyType?: string,
  excludeBodyType?: string,
) {
  return client
    .query<ProductCardData, ProductCardDataVariables>({
      query: PRODUCT_CARD_CONTENT,
      variables: {
        type,
        bodyType: bodyType || undefined,
        excludeBodyType: excludeBodyType || undefined,
        size: 9,
        offer: true,
      },
    })
    .then(resp => ({
      products: resp.data,
      productsCapIds: getCapIds(resp.data),
    }));
}

export function getCarDerivatives(
  client: ApolloClient<any>,
  vehicleType: VehicleTypeEnum,
  ids: string[],
) {
  if (ids[0]) {
    return client
      .query<GetDerivatives, GetDerivativesVariables>({
        query: GET_CAR_DERIVATIVES,
        variables: {
          vehicleType,
          ids,
        },
      })
      .then(resp => ({
        data: resp.data,
      }));
  }
  return { data: undefined };
}

export const specialOffersRequest = async (
  client: ApolloClient<any>,
): Promise<ISpecialOffersData> => {
  const [
    { products: productsVan, productsCapIds: productsVanCapIds },
    { products: productsCar, productsCapIds: productsCarIds },
    { products: productsPickup, productsCapIds: productsPickupIds },
  ] = await Promise.all([
    getProductCardContent(client, VehicleTypeEnum.LCV, '', 'Pickup'),
    getProductCardContent(client, VehicleTypeEnum.CAR),
    getProductCardContent(client, VehicleTypeEnum.LCV, 'Pickup'),
  ]);
  const [
    { data: productsVanDerivatives },
    { data: productsPickupDerivatives },
    { data: productsCarDerivatives },
  ] = await Promise.all([
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsVanCapIds),
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsPickupIds),
    getCarDerivatives(client, VehicleTypeEnum.CAR, productsCarIds),
  ]);
  const derivativeIds = [
    ...productsVanCapIds,
    ...productsCarIds,
    ...productsPickupIds,
  ];
  const vehicleListUrlData = await getVehicleListUrlQuery(
    client,
    derivativeIds,
  );
  return {
    productsVanDerivatives,
    productsCarDerivatives,
    productsPickupDerivatives,
    productsCar,
    productsPickup,
    productsVan,
    vehicleListUrlData,
  };
};

export const vansSpecialOffersRequest = async (
  client: ApolloClient<any>,
): Promise<IVansSpecialOffersData> => {
  const [
    { products: productsSmallVan, productsCapIds: productsSmallVanCapIds },
    { products: productsMediumVan, productsCapIds: productsMediumVanIds },
    { products: productsLargeVan, productsCapIds: productsLargeVanIds },
    { products: productsPickup, productsCapIds: productsPickupIds },
    {
      products: productsDropsideTipper,
      productsCapIds: productsDropsideTipperIds,
    },
    { products: productsSpecialist, productsCapIds: productsSpecialistIds },
  ] = await Promise.all([
    getProductCardContent(client, VehicleTypeEnum.LCV, 'SmallVan'),
    getProductCardContent(client, VehicleTypeEnum.LCV, 'MediumVan'),
    getProductCardContent(client, VehicleTypeEnum.LCV, 'LargeVan'),
    getProductCardContent(client, VehicleTypeEnum.LCV, 'Pickup'),
    getProductCardContent(client, VehicleTypeEnum.LCV, 'DropsideTipper'),
    getProductCardContent(client, VehicleTypeEnum.LCV, 'Specialist'),
  ]);

  const [
    { data: productsSmallVanDerivatives },
    { data: productsMediumVanDerivatives },
    { data: productsLargeVanDerivatives },
    { data: productsPickupDerivatives },
    { data: productsDropsideTipperDerivatives },
    { data: productsSpecialistDerivatives },
  ] = await Promise.all([
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsSmallVanCapIds),
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsMediumVanIds),
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsLargeVanIds),
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsPickupIds),
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsDropsideTipperIds),
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsSpecialistIds),
  ]);
  const derivativeIds = [
    ...productsSmallVanCapIds,
    ...productsMediumVanIds,
    ...productsLargeVanIds,
    ...productsPickupIds,
    ...productsDropsideTipperIds,
    ...productsSpecialistIds,
  ];
  const vehicleListUrlData = await getVehicleListUrlQuery(
    client,
    derivativeIds,
  );
  return {
    productsPickup,
    productsSmallVan,
    productsMediumVan,
    productsLargeVan,
    productsDropsideTipper,
    productsSpecialist,
    productsPickupDerivatives,
    productsSmallVanDerivatives,
    productsMediumVanDerivatives,
    productsLargeVanDerivatives,
    productsDropsideTipperDerivatives,
    productsSpecialistDerivatives,
    vehicleListUrlData,
  };
};

export interface ISpecialOffersData {
  productsVan?: ProductCardData;
  productsCar?: ProductCardData;
  productsPickup?: ProductCardData;
  productsVanDerivatives?: GetDerivatives;
  productsCarDerivatives?: GetDerivatives;
  productsPickupDerivatives?: GetDerivatives;
  vehicleListUrlData: IVehicleList;
}

export interface IVansSpecialOffersData {
  productsPickup?: ProductCardData;
  productsSmallVan?: ProductCardData;
  productsMediumVan?: ProductCardData;
  productsLargeVan?: ProductCardData;
  productsDropsideTipper?: ProductCardData;
  productsSpecialist?: ProductCardData;
  productsSmallVanDerivatives?: GetDerivatives;
  productsMediumVanDerivatives?: GetDerivatives;
  productsLargeVanDerivatives?: GetDerivatives;
  productsDropsideTipperDerivatives?: GetDerivatives;
  productsSpecialistDerivatives?: GetDerivatives;
  productsPickupDerivatives?: GetDerivatives;
  vehicleListUrlData: IVehicleList;
}
