import { NextPage } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import { PreviewNextPageContext } from 'types/common';
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
import { formatToSlugFormat } from '../../utils/url';
import { decodeData, encodeData } from '../../utils/data';

interface IProps extends ISearchPageProps {
  topInfoSection?: sections | null;
  manufacturers: manufacturerList | null;
  makesUrls: IMakeUrl[];
}

const Page: NextPage<IProps> = ({
  isServer,
  topInfoSection: topInfoSectionEncodedData,
  metaData,
  manufacturers,
  makesUrls: encodedData,
}) => {
  return (
    <SearchPageContainer
      isServer={isServer}
      isCarSearch
      isAllMakesPage
      metaData={metaData}
      topInfoSection={decodeData(topInfoSectionEncodedData)}
      preLoadManufacturers={manufacturers}
      makesUrls={decodeData(encodedData)}
    />
  );
};
export async function getServerSideProps(context: PreviewNextPageContext) {
  const client = createApolloClient({}, context);
  let manufacturers;
  const contextData = {
    req: {
      url: context.req?.url || '',
    },
    query: { ...context.query },
  };
  const { data } = (await ssrCMSQueryExecutor(
    client,
    contextData,
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
    make => `car-leasing/${formatToSlugFormat(make?.manufacturerName || '')}`,
  );
  const makesUrls = await client
    .query({
      query: GET_LEGACY_URLS,
      variables: {
        slugs,
        isPreview: context?.preview || false,
      },
    })
    .then(resp => resp.data.genericPages.items);
  return {
    props: {
      topInfoSection: encodeData(data.manufacturerPage.sections),
      metaData: data.manufacturerPage.metaData,
      isServer: !!context.req,
      manufacturers: manufacturers || null,
      makesUrls: encodeData(makesUrls) || null,
    },
  };
}

export default withApollo(Page);
