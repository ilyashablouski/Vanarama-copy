import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
// import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { evCarHubOffersRequest, IEvOffersData } from '../../../utils/offers';
import createApolloClient from '../../../apolloClient';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import EvLeaseExplainedContainer from '../../../containers/EvLeaseExplainedContainer';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';

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

    const { data } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: path,
        sectionsAsArray: true,
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
  } catch (err) {
    throw new Error(err);
  }
}

export default EVHubPage;
