import { NextPage, NextPageContext } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import { GET_MANUFACTURER_LIST } from '../../containers/SearchPageContainer/gql';
import createApolloClient from '../../apolloClient';
import { ssrCMSQueryExecutor } from '../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../containers/SearchPageContainer';
import withApollo from '../../hocs/withApollo';
import { manufacturerPage_manufacturerPage_sections as sections } from '../../../generated/manufacturerPage';
import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';
import { manufacturerList } from '../../../generated/manufacturerList';
import { ISearchPageProps } from '../../models/ISearchPageProps';

interface IProps extends ISearchPageProps {
  topInfoSection?: sections | null;
  manufacturers: manufacturerList | null;
}

const Page: NextPage<IProps> = ({
  isServer,
  topInfoSection,
  metaData,
  manufacturers,
}) => {
  return (
    <SearchPageContainer
      isServer={isServer}
      isCarSearch
      isAllMakesPage
      metaData={metaData}
      topInfoSection={topInfoSection}
      preLoadManufacturers={manufacturers}
    />
  );
};
export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({}, context);
  let manufacturers;
  const { data } = (await ssrCMSQueryExecutor(
    client,
    context,
    true,
    'isAllMakesPage',
  )) as ApolloQueryResult<any>;
  if (!Object.keys(context.query).length) {
    manufacturers = await client
      .query({
        query: GET_MANUFACTURER_LIST,
        variables: {
          vehicleType: VehicleTypeEnum.CAR,
          leaseType: LeaseTypeEnum.PERSONAL,
        },
      })
      .then(resp => resp.data);
  }
  return {
    props: {
      topInfoSection: data.manufacturerPage.sections,
      metaData: data.manufacturerPage.metaData,
      isServer: !!context.req,
      manufacturers: manufacturers || null,
    },
  };
}

export default withApollo(Page);
