import { ApolloError } from '@apollo/client';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { evCarHubOffersRequest, IEvOffersData } from '../../../utils/offers';
import createApolloClient from '../../../apolloClient';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import EvLeaseExplainedContainer from '../../../containers/EvLeaseExplainedContainer';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../generated/GenericPageQuery';
import { IPageWithData, PageTypeEnum } from '../../../types/common';

type IProps = IPageWithData<
  IEvOffersData & {
    data: GenericPageQuery;
    searchParam: String;
  }
>;

export const EVHubPage: NextPage<IProps> = ({
  data,
  productsElectricOnlyCar,
  productsElectricOnlyCarDerivatives,
  productsHybridOnlyCar,
  productsHybridOnlyCarDerivatives,
  vehicleListUrlData,
  searchParam,
}) => (
  <EvLeaseExplainedContainer
    data={data}
    evProducts={productsElectricOnlyCar}
    evDerivatives={productsElectricOnlyCarDerivatives}
    hevProducts={productsHybridOnlyCar}
    hevDerivatives={productsHybridOnlyCarDerivatives}
    vehicleListUrlData={vehicleListUrlData}
    searchParam={searchParam}
  />
);

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  try {
    const client = createApolloClient({}, context);
    const path = `electric-leasing/cars/electric-cars-explained`;

    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: path,
        sectionsAsArray: true,
        isPreview: !!context?.preview,
      },
    });

    const {
      productsElectricOnlyCar,
      productsElectricOnlyCarDerivatives,
      productsHybridOnlyCar,
      productsHybridOnlyCarDerivatives,
      vehicleListUrlData,
    } = await evCarHubOffersRequest(client);

    return {
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
        productsElectricOnlyCar: productsElectricOnlyCar || null,
        productsElectricOnlyCarDerivatives:
          productsElectricOnlyCarDerivatives || null,
        productsHybridOnlyCar: productsHybridOnlyCar || null,
        productsHybridOnlyCarDerivatives:
          productsHybridOnlyCarDerivatives || null,
        vehicleListUrlData,
        searchParam: 'car-leasing',
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return { notFound: true };
    }

    // throw any other errors
    // Next will render our custom pages/_error
    throw error;
  }
}

export default EVHubPage;
