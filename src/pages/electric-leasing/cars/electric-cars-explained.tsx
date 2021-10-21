import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
// import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { evCarHubOffersRequest, IEvOffersData } from '../../../utils/offers';
import createApolloClient from '../../../apolloClient';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import EvLeaseExplainedContainer from '../../../containers/EvLeaseExplainedContainer';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../generated/GenericPageQuery';

interface IProps extends IEvOffersData {
  data: GenericPageQuery;
  searchParam: String;
}

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

export async function getServerSideProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
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
        data,
        productsElectricOnlyCar,
        productsElectricOnlyCarDerivatives,
        productsHybridOnlyCar,
        productsHybridOnlyCarDerivatives,
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
