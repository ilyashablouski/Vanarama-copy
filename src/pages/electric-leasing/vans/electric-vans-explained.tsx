import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
// import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { evVanHubOffersRequest, IEvOffersData } from '../../../utils/offers';
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
  productsElectricOnlyVan,
  productsElectricOnlyVanDerivatives,
  vehicleListUrlData,
  searchParam,
}) => (
  <EvLeaseExplainedContainer
    data={data}
    evProducts={productsElectricOnlyVan}
    evDerivatives={productsElectricOnlyVanDerivatives}
    vehicleListUrlData={vehicleListUrlData}
    searchParam={searchParam}
  />
);

export async function getServerSideProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const path = `electric-leasing/vans/electric-vans-explained`;

    const { data } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: path,
        sectionsAsArray: true,
      },
    });

    const {
      productsElectricOnlyVan,
      productsElectricOnlyVanDerivatives,
      vehicleListUrlData,
    } = await evVanHubOffersRequest(client);

    return {
      props: {
        data,
        productsElectricOnlyVan,
        productsElectricOnlyVanDerivatives,
        vehicleListUrlData,
        searchParam: 'van-leasing',
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default EVHubPage;
