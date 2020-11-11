import { NextPage, NextPageContext } from 'next';
import { ApolloError } from '@apollo/client';
import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { ParsedUrlQuery } from 'querystring';
import { GET_CAR_DATA } from '../../../gql/carpage';
import withApollo from '../../../hocs/withApollo';
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
import { getVehicleConfigurationPath } from '../../../utils/url';
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

interface IProps {
  query?: ParsedUrlQuery;
  data?: GetVehicleDetails;
  error?: string;
  capId?: number;
  quote?: GetQuoteDetails;
}

const CarDetailsPage: NextPage<IProps> = ({ capId, data, error, quote }) => {
  const apolloError = error
    ? new ApolloError({ errorMessage: error })
    : undefined;

  if (!data) {
    return (
      <div
        className="pdp--content"
        style={{ minHeight: '40rem', display: 'flex', alignItems: 'center' }}
      >
        <Loading size="xlarge" />
      </div>
    );
  }

  return (
    <DetailsPage
      cars
      quote={quote}
      capId={capId || 0}
      data={data}
      error={apolloError}
    />
  );
};

export async function getServerSideProps(
  context: NextPageContext,
): Promise<{ props: IProps }> {
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
        vehicleType: VehicleTypeEnum.CAR,
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
    return {
      props: {
        error: error.message,
      },
    };
  }
}

export default withApollo(CarDetailsPage);
