import { NextPage, NextPageContext } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import {
  GET_MANUFACTURER_LIST,
  GET_LEGACY_URLS,
} from '../../containers/SearchPageContainer/gql';
import createApolloClient from '../../apolloClient';
import { ssrCMSQueryExecutor } from '../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../containers/SearchPageContainer';
import withApollo from '../../hocs/withApollo';
import { manufacturerPage_manufacturerPage_sections as sections } from '../../../generated/manufacturerPage';
import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  manufacturerList,
  manufacturerListVariables,
} from '../../../generated/manufacturerList';
import { ISearchPageProps } from '../../models/ISearchPageProps';
import { genericPagesQuery_genericPages_items as IMakeUrl } from '../../../generated/genericPagesQuery';

interface IProps extends ISearchPageProps {
  topInfoSection?: sections | null;
  manufacturers: manufacturerList | null;
  makesUrls: IMakeUrl[];
}

const Page: NextPage<IProps> = ({
  isServer,
  topInfoSection,
  metaData,
  manufacturers,
  makesUrls,
}) => {
  return (
    <SearchPageContainer
      isServer={isServer}
      isCarSearch
      isAllMakesPage
      metaData={metaData}
      topInfoSection={topInfoSection}
      preLoadManufacturers={manufacturers}
      makesUrls={makesUrls}
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
      .query<manufacturerList, manufacturerListVariables>({
        query: GET_MANUFACTURER_LIST,
        variables: {
          vehicleType: VehicleTypeEnum.CAR,
          leaseType: LeaseTypeEnum.PERSONAL,
        },
      })
      .then(resp => resp.data);
  }
  const slugs = manufacturers?.manufacturerList?.map(
    make =>
      `car-leasing/${(make?.manufacturerName || '')
        .toLowerCase()
        .split(' ')
        .join('-')}`,
  );
  const makesUrls = await client
    .query({
      query: GET_LEGACY_URLS,
      variables: {
        slugs,
      },
    })
    .then(resp => resp.data.genericPages.items);
  return {
    props: {
      topInfoSection: data.manufacturerPage.sections,
      metaData: data.manufacturerPage.metaData,
      isServer: !!context.req,
      manufacturers: manufacturers || null,
      makesUrls: makesUrls || null,
    },
  };
}

export default withApollo(Page);
