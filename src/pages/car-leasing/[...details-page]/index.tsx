import { NextPage, NextPageContext } from 'next';
import { ApolloError } from '@apollo/client';
import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
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
  notFoundPageHandler,
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
import { INotFoundPageData } from '../../../models/ISearchPageProps';
import PageNotFoundContainer from '../../../containers/PageNotFoundContainer/PageNotFoundContainer';
import { toPriceFormat } from '../../../utils/helpers';

interface IProps {
  query?: ParsedUrlQuery;
  data?: GetVehicleDetails;
  error?: string;
  capId?: number;
  quote?: GetQuoteDetails;
  notFoundPageData?: INotFoundPageData;
  errors: any[];
}

const CarDetailsPage: NextPage<IProps> = ({
  capId,
  data,
  error,
  quote,
  notFoundPageData,
}) => {
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

  // Schema JSON.
  const seller = {
    '@type': 'Organization',
    name: 'Vanarama',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Maylands Avenue',
      addressLocality: 'Hemel Hempstead',
      addressRegion: 'Hertfordshire',
      postalCode: 'HP2 7DE',
      addressCountry: 'United Kingdom',
    },
    contactPoint: {
      contactType: 'Vehicle Sales',
      telephone: '+441442838195',
      email: 'enquiries@vanarama.co.uk',
    },
  };

  const getTechValue = (description: String) =>
    data?.derivativeInfo?.technicals?.find(
      (obj: any) => obj?.technicalDescription === description,
    )?.value || 'N/A';

  const pageTitle = `${data?.vehicleConfigurationByCapId?.capManufacturerDescription} ${data?.vehicleConfigurationByCapId?.capRangeDescription}`;

  const schema = {
    '@context': 'http://schema.org',
    '@type': 'Car',
    name: `${pageTitle} ${data?.vehicleConfigurationByCapId?.capDerivativeDescription}`,
    description: `New ${pageTitle} ${
      data?.vehicleConfigurationByCapId?.capDerivativeDescription
    } lease deal from Vanarama starts from £${toPriceFormat(
      quote?.quoteByCapId?.leaseCost?.monthlyRental,
    )} per month. FREE UK delivery. Mileage Buffer. 8 Point Price Promise.`,
    offers: {
      '@type': 'AggregateOffer',
      availability: 'http://schema.org/InStock',
      name: `${quote?.quoteByCapId?.term} month Contract Hire agreement`,
      lowPrice: quote?.quoteByCapId?.leaseCost?.monthlyRental,
      url: `https://www.vanarama.com/car-leasing${data?.vehicleConfigurationByCapId?.url}`,
      priceCurrency: 'GBP',
      seller,
    },
    image: (data?.vehicleImages && data?.vehicleImages[0]?.mainImageUrl) || '',
    manufacturer: data?.vehicleConfigurationByCapId?.capManufacturerDescription,
    brand: data?.vehicleConfigurationByCapId?.capManufacturerDescription,
    model: data?.vehicleConfigurationByCapId?.capModelDescription,
    vehicleTransmission: data?.derivativeInfo?.transmission.name,
    fuelType: data?.derivativeInfo?.fuelType.name,
    seatingCapacity: getTechValue('No. of Seats'),
    meetsEmissionStandard: getTechValue('Standard Euro Emissions'),
    emissionsCO2: getTechValue('CO2 (g/km)'),
    bodyType: data?.derivativeInfo?.bodyStyle?.name,
    itemCondition: 'New',
    steeringPosition: 'RightHandDriving',
    fuelConsumption: {
      '@type': 'QuantitativeValue',
      name: 'Fuel Consumption EC Combined (Mpg)',
      value: getTechValue('EC Combined'),
      unitCode: 'mpg',
    },
    vehicleEngine: {
      '@type': 'EngineSpecification',
      fuelType: data?.derivativeInfo?.fuelType.name,
      engineDisplacement: {
        '@type': 'QuantitativeValue',
        name: 'CC',
        value: getTechValue('CC'),
        unitCode: 'CMQ',
      },
    },
  };

  return (
    <>
      <DetailsPage cars quote={quote} capId={capId || 0} data={data} />
      <SchemaJSON json={JSON.stringify(schema)} />
    </>
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
        url: getVehicleConfigurationPath(path),
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
        vehicleType: VehicleTypeEnum.CAR,
        mileage,
        term,
        upfront,
        leaseType: LeaseTypeEnum.PERSONAL,
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
    const apolloError = error as ApolloError;

    if ((apolloError?.graphQLErrors || []).length > 0 && context.res) {
      return notFoundPageHandler(context.res, client);
    }

    return {
      props: {
        error: error.message,
      },
    };
  }
}

export default CarDetailsPage;
