import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import createApolloClient from '../../../apolloClient';
import { GET_VEHICLE_LIST } from '../../../containers/SearchPageContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../../containers/CustomerAlsoViewedContainer/gql';
import SearchPageContainer from '../../../containers/SearchPageContainer';
import {
  getCapsIds,
  ssrCMSQueryExecutor,
} from '../../../containers/SearchPageContainer/helpers';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';
import { GetProductCard } from '../../../../generated/GetProductCard';
import { vehicleList } from '../../../../generated/vehicleList';
import { serverRedirect } from '../../../utils/url';
import { ISearchPageProps } from '../../../models/ISearchPageProps';
import PageNotFoundContainer from '../../../containers/PageNotFoundContainer/PageNotFoundContainer';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
  vehiclesList?: vehicleList;
  productCardsData?: GetProductCard;
  responseCapIds?: string[];
}

const Page: NextPage<IProps> = ({
  isServer,
  pageData,
  metaData,
  vehiclesList,
  productCardsData,
  responseCapIds,
  error,
  notFoundPageData,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.make) {
      const query = { ...router.query, make: router.query.dynamicParam };
      const { asPath, pathname } = router;
      router.replace(
        {
          pathname,
          query,
        },
        asPath,
        { shallow: true },
      );
    }
    // it's should executed only when page init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <PageNotFoundContainer
        featured={notFoundPageData?.featured}
        cards={notFoundPageData?.cards}
        name={notFoundPageData?.name}
      />
    );
  }

  return (
    <SearchPageContainer
      isServer={isServer}
      isCarSearch={false}
      isRangePage
      metaData={metaData}
      pageData={pageData}
      preLoadVehiclesList={vehiclesList}
      preLoadProductCardsData={productCardsData}
      preLoadResponseCapIds={responseCapIds}
    />
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({});
  let vehiclesList;
  let productCardsData;
  let responseCapIds;
  try {
    const { data, errors } = (await ssrCMSQueryExecutor(
      client,
      context,
      false,
      'isRangePage',
    )) as ApolloQueryResult<any>;
    // should contain only 2 routs params(make, range)
    if (Object.keys(context.query).length === 2) {
      vehiclesList = await client
        .query({
          query: GET_VEHICLE_LIST,
          variables: {
            vehicleTypes: [VehicleTypeEnum.LCV],
            leaseType: LeaseTypeEnum.BUSINESS,
            onOffer: null,
            first: 9,
            sortField: SortField.availability,
            sortDirection: SortDirection.ASC,
            manufacturerName: context?.query?.dynamicParam,
            rangeName: context?.query?.rangeName,
          },
        })
        .then(resp => resp.data);
      try {
        responseCapIds = getCapsIds(vehiclesList.vehicleList?.edges || []);
        if (responseCapIds.length) {
          productCardsData = await client
            .query({
              query: GET_PRODUCT_CARDS_DATA,
              variables: {
                capIds: responseCapIds,
                vehicleType: VehicleTypeEnum.LCV,
              },
            })
            .then(resp => resp.data);
        }
      } catch {
        return false;
      }
    }
    return {
      props: {
        pageData: data,
        metaData: data.genericPage.metaData,
        isServer: !!context.req,
        vehiclesList: vehiclesList || null,
        productCardsData: productCardsData || null,
        responseCapIds: responseCapIds || null,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    const { res, req } = context;
    if (res && req) return serverRedirect(res, req, client);
    return {
      props: {
        error: true,
      },
    };
  }
}

export default Page;
