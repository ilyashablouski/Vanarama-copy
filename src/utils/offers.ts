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
import { Nullable } from '../types/common';
import getCapIds from './getProductCarouselCapIds';

export const getVehicleListUrlQuery = async (
  client: ApolloClient<any>,
  derivativeIds: string[],
) => {
  try {
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
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error:', err);
    return {
      totalCount: 0,
      pageInfo: {
        startCursor: null,
        endCursor: null,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      edges: null,
    };
  }
};

export function getProductCardContent(
  client: ApolloClient<any>,
  type: VehicleTypeEnum,
  bodyType?: string,
  excludeBodyType?: string,
  fuelTypes?: string[],
) {
  return client
    .query<ProductCardData, ProductCardDataVariables>({
      query: PRODUCT_CARD_CONTENT,
      variables: {
        type,
        bodyType: bodyType || undefined,
        excludeBodyType: excludeBodyType || undefined,
        fuelTypes: fuelTypes || undefined,
        size: 12,
        offer: true,
      },
    })
    .then(resp => ({
      products: resp.data,
      productsCapIds: getCapIds(resp.data),
    }))
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log('Error:', err);
      return {
        products: undefined,
        productsCapIds: [],
      };
    });
}

export function getCarDerivatives(
  client: ApolloClient<any>,
  vehicleType: VehicleTypeEnum,
  ids: string[],
) {
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
    }))
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log('Error:', err);
      return {
        data: undefined,
      };
    });
}

export const evOffersRequest = async (
  client: ApolloClient<any>,
): Promise<IEvOffersData> => {
  const [
    { products: productsEvVan, productsCapIds: productsEvVanCapIds },
    { products: productsEvCar, productsCapIds: productsEvCarIds },
    {
      products: productsElectricOnlyCar,
      productsCapIds: productsElectricOnlyCarIds,
    },
    {
      products: productsElectricOnlyVan,
      productsCapIds: productsElectricOnlyVanIds,
    },
  ] = await Promise.all([
    getProductCardContent(client, VehicleTypeEnum.LCV, '', '', [
      'Electric',
      'PetrolAndPlugInElectricHybrid',
    ]),
    getProductCardContent(client, VehicleTypeEnum.CAR, '', '', [
      'Electric',
      'DieselAndElectricHybrid',
      'PetrolAndPlugInElectricHybrid',
      'DieselAndPlugInElectricHybrid',
      'Hybrid',
    ]),
    getProductCardContent(client, VehicleTypeEnum.CAR, '', '', ['Electric']),
    getProductCardContent(client, VehicleTypeEnum.LCV, '', '', ['Electric']),
  ]);

  const [
    { data: productsEvVanDerivatives },
    { data: productsEvCarDerivatives },
  ] = await Promise.all([
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsEvVanCapIds),
    getCarDerivatives(client, VehicleTypeEnum.CAR, productsEvCarIds),
  ]);

  const vehicleListUrlData = await getVehicleListUrlQuery(client, [
    ...productsEvVanCapIds,
    ...productsEvCarIds,
    ...productsElectricOnlyCarIds,
    ...productsElectricOnlyVanIds,
  ]);

  return {
    productsEvVan,
    productsEvCar,
    productsElectricOnlyCar,
    productsElectricOnlyVan,
    productsEvVanDerivatives,
    productsEvCarDerivatives,
    vehicleListUrlData,
  };
};

export const evCarHubOffersRequest = async (
  client: ApolloClient<any>,
): Promise<IEvOffersData> => {
  const [
    {
      products: productsElectricOnlyCar,
      productsCapIds: productsElectricOnlyCarIds,
    },
    {
      products: productsHybridOnlyCar,
      productsCapIds: productsHybridOnlyCarIds,
    },
  ] = await Promise.all([
    getProductCardContent(client, VehicleTypeEnum.CAR, '', '', ['Electric']),
    getProductCardContent(client, VehicleTypeEnum.CAR, '', '', [
      'DieselAndElectricHybrid',
      'PetrolAndPlugInElectricHybrid',
      'DieselAndPlugInElectricHybrid',
      'Hybrid',
    ]),
  ]);

  const [
    { data: productsElectricOnlyCarDerivatives },
    { data: productsHybridOnlyCarDerivatives },
  ] = await Promise.all([
    getCarDerivatives(client, VehicleTypeEnum.CAR, productsElectricOnlyCarIds),
    getCarDerivatives(client, VehicleTypeEnum.CAR, productsHybridOnlyCarIds),
  ]);

  const vehicleListUrlData = await getVehicleListUrlQuery(client, [
    ...productsElectricOnlyCarIds,
    ...productsHybridOnlyCarIds,
  ]);

  return {
    productsElectricOnlyCar,
    productsHybridOnlyCar,
    productsElectricOnlyCarDerivatives,
    productsHybridOnlyCarDerivatives,
    vehicleListUrlData,
  };
};

export const evVanHubOffersRequest = async (
  client: ApolloClient<any>,
): Promise<IEvOffersData> => {
  const [
    {
      products: productsElectricOnlyVan,
      productsCapIds: productsElectricOnlyVanIds,
    },
    {
      products: productsHybridOnlyVan,
      productsCapIds: productsHybridOnlyVanIds,
    },
  ] = await Promise.all([
    getProductCardContent(client, VehicleTypeEnum.LCV, '', '', ['Electric']),
    getProductCardContent(client, VehicleTypeEnum.LCV, '', '', [
      'PetrolAndPlugInElectricHybrid',
      'DieselAndPlugInElectricHybrid',
    ]),
  ]);

  const [
    { data: productsElectricOnlyVanDerivatives },
    { data: productsHybridOnlyVanDerivatives },
  ] = await Promise.all([
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsElectricOnlyVanIds),
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsHybridOnlyVanIds),
  ]);

  const vehicleListUrlData = await getVehicleListUrlQuery(client, [
    ...productsElectricOnlyVanIds,
    ...productsHybridOnlyVanIds,
  ]);

  return {
    productsElectricOnlyVan,
    productsHybridOnlyVan,
    productsElectricOnlyVanDerivatives,
    productsHybridOnlyVanDerivatives,
    vehicleListUrlData,
  };
};

export const partnerOffersRequest = async (
  client: ApolloClient<any>,
  fuelTypes: string[],
): Promise<any> => {
  const [
    { products: partnerProductsCar, productsCapIds: productsCarIds },
    { products: partnerProductsVan, productsCapIds: productsVanIds },
    { products: partnerProductsPickup, productsCapIds: productsPickupIds },
  ] = await Promise.all([
    getProductCardContent(client, VehicleTypeEnum.CAR, '', '', fuelTypes),
    getProductCardContent(client, VehicleTypeEnum.LCV, '', '', fuelTypes),
    getProductCardContent(client, VehicleTypeEnum.LCV, 'Pickup'),
  ]);

  const [
    { data: partnerProductsCarDerivatives },
    { data: partnerProductsPickupDerivatives },
    { data: partnerProductsVanDerivatives },
  ] = await Promise.all([
    getCarDerivatives(client, VehicleTypeEnum.CAR, productsCarIds),
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsPickupIds),
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsVanIds),
  ]);

  const vehicleListUrlData = await getVehicleListUrlQuery(client, [
    ...productsCarIds,
    ...productsPickupIds,
    ...productsVanIds,
  ]);

  return {
    partnerProductsCar,
    partnerProductsVan,
    partnerProductsPickup,
    partnerProductsCarDerivatives,
    partnerProductsPickupDerivatives,
    partnerProductsVanDerivatives,
    vehicleListUrlData,
  };
};

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

export const specialOffersForBlogPageRequest = async (
  client: ApolloClient<any>,
  vehicleType: VehicleTypeEnum,
): Promise<ISpecialOffersBlogPostPageData> => {
  const {
    products: productsCar,
    productsCapIds: productsCarIds,
  } = await getProductCardContent(client, vehicleType);
  const { data: productsCarDerivatives } = await getCarDerivatives(
    client,
    vehicleType,
    productsCarIds,
  );
  const derivativeIds = [...productsCarIds];
  const vehicleListUrlData = await getVehicleListUrlQuery(
    client,
    derivativeIds,
  );
  return {
    productsCarDerivatives,
    productsCar,
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

export const vansPageOffersRequest = async (
  client: ApolloClient<any>,
): Promise<IVansPageOffersData> => {
  const [
    { products: productsSmallVan, productsCapIds: productsSmallVanCapIds },
    { products: productsMediumVan, productsCapIds: productsMediumVanIds },
    { products: productsLargeVan, productsCapIds: productsLargeVanIds },
  ] = await Promise.all([
    getProductCardContent(client, VehicleTypeEnum.LCV, 'SmallVan'),
    getProductCardContent(client, VehicleTypeEnum.LCV, 'MediumVan'),
    getProductCardContent(client, VehicleTypeEnum.LCV, 'LargeVan'),
  ]);

  const [
    { data: productsSmallVanDerivatives },
    { data: productsMediumVanDerivatives },
    { data: productsLargeVanDerivatives },
  ] = await Promise.all([
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsSmallVanCapIds),
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsMediumVanIds),
    getCarDerivatives(client, VehicleTypeEnum.LCV, productsLargeVanIds),
  ]);
  const derivativeIds = [
    ...productsSmallVanCapIds,
    ...productsMediumVanIds,
    ...productsLargeVanIds,
  ];
  const vehicleListUrlData = await getVehicleListUrlQuery(
    client,
    derivativeIds,
  );
  return {
    productsSmallVan,
    productsMediumVan,
    productsLargeVan,
    productsSmallVanDerivatives,
    productsMediumVanDerivatives,
    productsLargeVanDerivatives,
    vehicleListUrlData,
  };
};

export const carsPageOffersRequest = async (
  client: ApolloClient<any>,
): Promise<ICarsPageOffersData> => {
  const {
    products: productsCar,
    productsCapIds: productsCarIds,
  } = await getProductCardContent(client, VehicleTypeEnum.CAR);

  const vehicleListUrlData = await getVehicleListUrlQuery(
    client,
    productsCarIds,
  );
  return {
    productsCar,
    vehicleListUrlData,
  };
};

export const pickupsPageOffersRequest = async (
  client: ApolloClient<any>,
): Promise<IPickupsPageOffersData> => {
  const {
    products: productsPickup,
    productsCapIds: productsPickupIds,
  } = await getProductCardContent(client, VehicleTypeEnum.LCV, 'Pickup');

  const vehicleListUrlData = await getVehicleListUrlQuery(
    client,
    productsPickupIds,
  );
  return {
    productsPickup,
    vehicleListUrlData,
  };
};

export interface IEvOffersData {
  productsEvVan?: Nullable<ProductCardData>;
  productsEvCar?: Nullable<ProductCardData>;
  productsElectricOnlyCar?: Nullable<ProductCardData>;
  productsElectricOnlyVan?: Nullable<ProductCardData>;
  productsHybridOnlyCar?: Nullable<ProductCardData>;
  productsHybridOnlyVan?: Nullable<ProductCardData>;
  productsEvVanDerivatives?: Nullable<GetDerivatives>;
  productsEvCarDerivatives?: Nullable<GetDerivatives>;
  productsElectricOnlyCarDerivatives?: Nullable<GetDerivatives>;
  productsHybridOnlyCarDerivatives?: Nullable<GetDerivatives>;
  productsElectricOnlyVanDerivatives?: Nullable<GetDerivatives>;
  productsHybridOnlyVanDerivatives?: Nullable<GetDerivatives>;
  vehicleListUrlData: IVehicleList;
}

export interface IPartnerOffersData {
  partnerProductsCar?: ProductCardData;
  partnerProductsVan?: ProductCardData;
  partnerProductsPickup?: ProductCardData;
  partnerProductsCarDerivatives?: GetDerivatives;
  partnerProductsVanDerivatives?: GetDerivatives;
  partnerProductsPickupDerivatives?: GetDerivatives;
  vehicleListUrlData: IVehicleList;
}

export interface ISpecialOffersData {
  productsVan?: Nullable<ProductCardData>;
  productsCar?: Nullable<ProductCardData>;
  productsPickup?: Nullable<ProductCardData>;
  productsVanDerivatives?: Nullable<GetDerivatives>;
  productsCarDerivatives?: Nullable<GetDerivatives>;
  productsPickupDerivatives?: Nullable<GetDerivatives>;
  vehicleListUrlData: IVehicleList;
}

export interface ISpecialOffersBlogPostPageData {
  productsCar?: Nullable<ProductCardData>;
  productsCarDerivatives?: Nullable<GetDerivatives>;
  vehicleListUrlData: IVehicleList;
}

export interface IVansSpecialOffersData {
  productsPickup?: Nullable<ProductCardData>;
  productsSmallVan?: Nullable<ProductCardData>;
  productsMediumVan?: Nullable<ProductCardData>;
  productsLargeVan?: Nullable<ProductCardData>;
  productsDropsideTipper?: Nullable<ProductCardData>;
  productsSpecialist?: Nullable<ProductCardData>;
  productsSmallVanDerivatives?: Nullable<GetDerivatives>;
  productsMediumVanDerivatives?: Nullable<GetDerivatives>;
  productsLargeVanDerivatives?: Nullable<GetDerivatives>;
  productsDropsideTipperDerivatives?: Nullable<GetDerivatives>;
  productsSpecialistDerivatives?: Nullable<GetDerivatives>;
  productsPickupDerivatives?: Nullable<GetDerivatives>;
  vehicleListUrlData: IVehicleList;
}

export interface IVansPageOffersData {
  productsSmallVan?: Nullable<ProductCardData>;
  productsMediumVan?: Nullable<ProductCardData>;
  productsLargeVan?: Nullable<ProductCardData>;
  productsSmallVanDerivatives?: Nullable<GetDerivatives>;
  productsMediumVanDerivatives?: Nullable<GetDerivatives>;
  productsLargeVanDerivatives?: Nullable<GetDerivatives>;
  vehicleListUrlData: IVehicleList;
}

export interface ICarsPageOffersData {
  productsCar?: Nullable<ProductCardData>;
  vehicleListUrlData: IVehicleList;
}

export interface IPickupsPageOffersData {
  productsPickup?: Nullable<ProductCardData>;
  vehicleListUrlData: IVehicleList;
}
