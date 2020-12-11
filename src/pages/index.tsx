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
  derivativeIds,
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
    derivativeIds={derivativeIds}
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
  const derivativeIds = [
    ...productsVanCapIds,
    ...productsCarIds,
    ...productsPickUpIds,
  ];
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
      productsVan,
      derivativeIds,
    },
  };
}

export default HomePage;
