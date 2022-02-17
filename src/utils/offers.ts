import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  ProductCardData,
  ProductCardDataVariables,
} from '../../generated/ProductCardData';
import { PRODUCT_CARD_CONTENT } from '../gql/productCard';
import {
  FinanceType,
  ProductDerivativeFilter,
  VehicleTypeEnum,
} from '../../generated/globalTypes';
import {
  GetDerivatives,
  GetDerivativesVariables,
} from '../../generated/GetDerivatives';
import { GET_CAR_DERIVATIVES } from '../containers/OrdersInformation/gql';
import {
  VehicleListUrl,
  VehicleListUrl_vehicleList as IVehicleList,
  VehicleListUrl_vehicleList_edges,
  VehicleListUrl_vehicleList_pageInfo,
  VehicleListUrlVariables,
} from '../../generated/VehicleListUrl';
import { VEHICLE_LIST_URL } from '../gql/vehicleList';
import { Nullable } from '../types/common';
import getCapIds from './getProductCarouselCapIds';
import {
  productDerivatives as IProductDerivativesQuery,
  productDerivatives_productDerivatives_derivatives,
  productDerivativesVariables,
} from '../../generated/productDerivatives';
import { DEFAULT_SORT } from '../containers/GlobalSearchPageContainer/helpers';
import {
  GET_PRODUCT_DERIVATIVES,
  getVehiclesCardsData,
} from '../containers/GlobalSearchContainer/gql';
import { ICarouselCard } from '../components/BlogCarousel/interface';

const MAX_VEHICLE_LIST_QUERY_RUN = 4;

type VehicleListQueryVariables = {
  derivativeIds: string[];
  after?: string;
};

async function queryVehicleList(
  client: ApolloClient<NormalizedCacheObject | object>,
  variables: VehicleListQueryVariables,
) {
  return client.query<VehicleListUrl | null, VehicleListUrlVariables>({
    query: VEHICLE_LIST_URL,
    variables,
  });
}

function getHasNextPage(vehicleListQueryData: VehicleListUrl | null): boolean {
  return Boolean(vehicleListQueryData?.vehicleList.pageInfo.hasNextPage);
}

function getLastCursor(
  vehicleListQueryData: VehicleListUrl | null,
): string | null {
  return vehicleListQueryData?.vehicleList.pageInfo.endCursor ?? null;
}

function getPageInfoFallback(): VehicleListUrl_vehicleList_pageInfo {
  return {
    startCursor: null,
    endCursor: null,
    hasNextPage: false,
    hasPreviousPage: false,
  };
}

async function queryEntireVehicleList(
  client: ApolloClient<NormalizedCacheObject | object>,
  derivativeIds: string[],
): Promise<IVehicleList> {
  let counterQueryRun = 0;
  let hasNextPage = true;
  let lastCursor: string | null = null;

  const edges: (VehicleListUrl_vehicleList_edges | null)[] = [];
  let pageInfo = getPageInfoFallback();
  let totalCount = 0;

  async function fetchVehicleList(): Promise<null> {
    counterQueryRun += 1;
    const variables: VehicleListQueryVariables = {
      derivativeIds,
    };

    if (lastCursor) {
      variables.after = lastCursor;
    }

    const { data: vehicleListQueryData } = await queryVehicleList(
      client,
      variables,
    );

    hasNextPage = getHasNextPage(vehicleListQueryData);
    lastCursor = getLastCursor(vehicleListQueryData);

    if (vehicleListQueryData) {
      pageInfo = vehicleListQueryData.vehicleList.pageInfo;
      totalCount = vehicleListQueryData.vehicleList.totalCount;
      edges.push(...(vehicleListQueryData.vehicleList.edges || []));
    }

    if (counterQueryRun === MAX_VEHICLE_LIST_QUERY_RUN) {
      return null;
    }

    return hasNextPage ? fetchVehicleList() : null;
  }

  await fetchVehicleList();

  return { pageInfo, totalCount, edges };
}

export const getVehicleListUrlQuery = async (
  client: ApolloClient<NormalizedCacheObject | object>,
  derivativeIds: string[] | undefined,
) => {
  if (!derivativeIds || !derivativeIds.length) {
    return {
      totalCount: 0,
      pageInfo: getPageInfoFallback(),
      edges: null,
    };
  }

  try {
    return await queryEntireVehicleList(client, derivativeIds);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error:', error);
    return {
      totalCount: 0,
      pageInfo: getPageInfoFallback(),
      edges: null,
    };
  }
};

export function getProductCardContent(
  client: ApolloClient<NormalizedCacheObject | object>,
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
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log('Error:', error);
      return {
        products: undefined,
        productsCapIds: [],
      };
    });
}

export function getCarDerivatives(
  client: ApolloClient<NormalizedCacheObject | object>,
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
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log('Error:', error);
      return {
        data: undefined,
      };
    });
}

export const evOffersRequest = async (
  client: ApolloClient<NormalizedCacheObject | object>,
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
  client: ApolloClient<NormalizedCacheObject | object>,
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
  client: ApolloClient<NormalizedCacheObject | object>,
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
  client: ApolloClient<NormalizedCacheObject | object>,
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
  client: ApolloClient<NormalizedCacheObject | object>,
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
  client: ApolloClient<NormalizedCacheObject | object>,
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

export const vehicleCarouselRequest = async (
  client: ApolloClient<NormalizedCacheObject | object>,
  productFilter: ProductDerivativeFilter,
): Promise<ICarouselCard[]> => {
  const vehiclesList = await client
    .query<IProductDerivativesQuery, productDerivativesVariables>({
      query: GET_PRODUCT_DERIVATIVES,
      variables: {
        from: 0,
        size: 9,
        sort: DEFAULT_SORT,
        filters: {
          financeTypes: [FinanceType.PCH],
          ...productFilter,
        },
      },
    })
    .then(({ data }) => data.productDerivatives?.derivatives);

  const vehiclesCardsData = await getVehiclesCardsData(
    client,
    vehiclesList || [],
  );
  const getProductCardData = (capId: string, vehicleType: VehicleTypeEnum) => {
    return vehiclesCardsData[vehicleType].find(
      vehicle => vehicle?.capId === capId,
    );
  };

  return (
    vehiclesList?.map(vehicleData => {
      const vehicleCard = getProductCardData(
        `${vehicleData?.capId}`,
        (vehicleData?.vehicleType as VehicleTypeEnum) ?? VehicleTypeEnum.CAR,
      );
      return {
        ...(vehicleData as productDerivatives_productDerivatives_derivatives),
        rental: vehicleCard?.personalRate ?? null,
        onOffer: vehicleCard?.isOnOffer ?? false,
        imageUrl: vehicleCard?.imageUrl || '',
        averageRating: vehicleCard?.averageRating || undefined,
      };
    }) || []
  );
};

export const vansSpecialOffersRequest = async (
  client: ApolloClient<NormalizedCacheObject | object>,
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
  client: ApolloClient<NormalizedCacheObject | object>,
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
  client: ApolloClient<NormalizedCacheObject | object>,
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
  client: ApolloClient<NormalizedCacheObject | object>,
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
