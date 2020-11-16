import { NextPage, NextPageContext } from 'next';
// import { ApolloError } from '@apollo/client';
import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import { INotFoundPageData } from '../../../models/ISearchPageProps';
import { GET_CAR_DATA } from '../../../gql/carpage';
import {
  LeaseTypeEnum,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';
import DetailsPage from '../../../containers/DetailsPage/DetailsPage';
import { VEHICLE_CONFIGURATION_BY_URL } from '../../../gql/productCard';
import {
  VehicleConfigurationByUrl,
  VehicleConfigurationByUrlVariables,
} from '../../../../generated/VehicleConfigurationByUrl';
import {
  getVehicleConfigurationPath,
  // notFoundPageHandler,
} from '../../../utils/url';
import createApolloClient from '../../../apolloClient';
import { GET_QUOTE_DATA } from '../../../containers/CustomiseLeaseContainer/gql';
import {
  GetQuoteDetails,
  GetQuoteDetailsVariables,
} from '../../../../generated/GetQuoteDetails';
import {
  GetVehicleDetails,
  GetVehicleDetailsVariables,
} from '../../../../generated/GetVehicleDetails';
import PageNotFoundContainer from '../../../containers/PageNotFoundContainer/PageNotFoundContainer';

interface IProps {
  query?: ParsedUrlQuery;
  data?: GetVehicleDetails;
  error?: string;
  capId?: number;
  quote?: GetQuoteDetails;
  notFoundPageData?: INotFoundPageData;
}

const VanDetailsPage: NextPage<IProps> = ({
  capId,
  data,
  error,
  quote,
  notFoundPageData,
}) => {
  const isPickup = !data?.derivativeInfo?.bodyType?.slug?.match('van');

  if (notFoundPageData) {
    return (
      <PageNotFoundContainer
        featured={notFoundPageData?.featured}
        cards={notFoundPageData?.cards}
        name={notFoundPageData?.name}
      />
    );
  }

  if (error) {
    return (
      <div
        className="pdp--content"
        style={{ minHeight: '40rem', display: 'flex', alignItems: 'center' }}
      >
        {error}
      </div>
    );
  }

  return (
    <DetailsPage
      capId={capId || 0}
      vans={!isPickup}
      pickups={isPickup}
      data={data}
      quote={quote}
    />
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({});
  const path = context.req?.url || '';

  try {
    const vehicleConfigurationByUrlQuery = await client.query<
      VehicleConfigurationByUrl,
      VehicleConfigurationByUrlVariables
    >({
      query: VEHICLE_CONFIGURATION_BY_URL,
      variables: {
        url: getVehicleConfigurationPath(path, '/van-leasing'),
      },
    });

    const capId =
      vehicleConfigurationByUrlQuery.data?.vehicleConfigurationByUrl
        ?.capDerivativeId || 0;

    const getCarDataQuery = await client.query<
      GetVehicleDetails,
      GetVehicleDetailsVariables
    >({
      query: GET_CAR_DATA,
      variables: {
        capId,
        capIdDetails: `${capId}`,
        vehicleType: VehicleTypeEnum.LCV,
      },
    });

    const mileage =
      getCarDataQuery.data?.vehicleConfigurationByCapId?.financeProfile
        ?.mileage;
    const term =
      getCarDataQuery.data?.vehicleConfigurationByCapId?.financeProfile?.term;
    const upfront =
      getCarDataQuery.data?.vehicleConfigurationByCapId?.financeProfile
        ?.upfront;

    const quoteDataQuery = await client.query<
      GetQuoteDetails,
      GetQuoteDetailsVariables
    >({
      query: GET_QUOTE_DATA,
      variables: {
        capId: `${capId}`,
        vehicleType: VehicleTypeEnum.LCV,
        mileage,
        term,
        upfront,
        leaseType: LeaseTypeEnum.BUSINESS,
        trim: null,
        colour: null,
      },
    });

    return {
      props: {
        capId,
        data: getCarDataQuery.data,
        quote: quoteDataQuery.data,
        query: context.query,
      },
    };
  } catch (error) {
    // const apolloError = error as ApolloError;

    // if ((apolloError?.graphQLErrors || []).length > 0 && context.res) {
    //   return notFoundPageHandler(context.res, client);
    // }

    return {
      props: {
        error: `${error.message} ${path}`,
      },
    };
  }
}

export default VanDetailsPage;
