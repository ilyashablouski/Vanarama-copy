import { NextPage, NextPageContext } from 'next';
import { ApolloError } from '@apollo/client';
import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import { INotFoundPageData } from '../../../models/ISearchPageProps';
import { GET_CAR_DATA, GET_TRIM_AND_COLOR_DATA } from '../../../gql/carpage';
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
import PageNotFoundContainer from '../../../containers/PageNotFoundContainer/PageNotFoundContainer';
import { toPriceFormat } from '../../../utils/helpers';
import { GENERIC_PAGE_HEAD } from '../../../gql/genericPage';
import {
  GenericPageHeadQuery,
  GenericPageHeadQueryVariables,
} from '../../../../generated/GenericPageHeadQuery';
import { GET_LEGACY_URLS } from '../../../containers/SearchPageContainer/gql';
import { genericPagesQuery_genericPages_items as GenericPages } from '../../../../generated/genericPagesQuery';
import {
  GetTrimAndColor,
  GetTrimAndColor_colourList as IColourList,
  GetTrimAndColor_trimList as ITrimList,
  GetTrimAndColorVariables,
} from '../../../../generated/GetTrimAndColor';

interface IProps {
  query?: ParsedUrlQuery;
  data?: GetVehicleDetails;
  error?: string;
  capId?: number;
  quote?: GetQuoteDetails;
  notFoundPageData?: INotFoundPageData;
  genericPageHead: GenericPageHeadQuery;
  genericPages: GenericPages[];
  trim: ITrimList[];
  colour: IColourList[];
}

const VanDetailsPage: NextPage<IProps> = ({
  capId,
  data,
  error,
  quote,
  notFoundPageData,
  genericPageHead,
  genericPages,
  trim,
  colour,
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
    '@type': 'Vehicle',
    name: `${pageTitle} ${data?.vehicleConfigurationByCapId?.capDerivativeDescription}`,
    description: `New ${pageTitle} ${
      data?.vehicleConfigurationByCapId?.capDerivativeDescription
    } Van lease deal from Vanarama starts from £${toPriceFormat(
      quote?.quoteByCapId?.leaseCost?.monthlyRental,
    )} per month. FREE UK delivery. Mileage Buffer. 8 Point Price Promise.`,
    offers: {
      '@type': 'AggregateOffer',
      availability: 'http://schema.org/InStock',
      name: `${quote?.quoteByCapId?.term} month Contract Hire agreement`,
      lowPrice: toPriceFormat(quote?.quoteByCapId?.leaseCost?.monthlyRental),
      url: `https://www.vanarama.com/van-leasing${data?.vehicleConfigurationByCapId?.url}`,
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
    emissionsCO2: getTechValue('CO2'),
    bodyType: data?.derivativeInfo?.bodyType?.name || 'N/A',
    itemCondition: 'New',
    steeringPosition: 'RightHandDriving',
    height: {
      '@type': 'QuantitativeValue',
      value: getTechValue('Height'),
      unitCode: 'MMT',
    },
    weight: {
      '@type': 'QuantitativeValue',
      value: getTechValue('Gross Vehicle Weight'),
      unitCode: 'KGM',
    },
    fuelCapacity: {
      '@type': 'QuantitativeValue',
      value: getTechValue('Fuel Tank Capacity (Litres)'),
      unitCode: 'LTR',
    },
    speed: {
      '@type': 'QuantitativeValue',
      name: 'Speed',
      maxValue: getTechValue('Top Speed'),
      minValue: 0,
      unitCode: 'HM',
    },
    wheelbase: {
      '@type': 'QuantitativeValue',
      name: 'Wheelbase',
      value: getTechValue('Wheelbase'),
      unitCode: 'MMT',
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
      <DetailsPage
        capId={capId || 0}
        vans={!isPickup}
        pickups={isPickup}
        data={data}
        trimList={trim}
        colourList={colour}
        quote={quote}
        genericPageHead={genericPageHead}
        genericPages={genericPages}
      />
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

    const { data } = await client.query<
      GenericPageHeadQuery,
      GenericPageHeadQueryVariables
    >({
      query: GENERIC_PAGE_HEAD,
      variables: {
        slug: path.slice(1),
      },
    });

    const trimAndColorData = await client.query<
      GetTrimAndColor,
      GetTrimAndColorVariables
    >({
      query: GET_TRIM_AND_COLOR_DATA,
      variables: {
        capId: `${capId}`,
        vehicleType: VehicleTypeEnum.LCV,
        trimId: parseInt(quoteDataQuery.data?.quoteByCapId?.trim || '0', 10),
        colourId: parseInt(
          quoteDataQuery.data?.quoteByCapId?.colour || '0',
          10,
        ),
      },
    });
    const breadcrumbSlugsArray = data?.genericPage.metaData.slug?.split('/');
    const breadcrumbSlugs = breadcrumbSlugsArray?.map((el, id) =>
      breadcrumbSlugsArray.slice(0, id + 1).join('/'),
    );

    const genericPages = await client
      .query({
        query: GET_LEGACY_URLS,
        variables: {
          slugs: breadcrumbSlugs,
        },
      })
      .then(resp => resp.data.genericPages.items);

    return {
      props: {
        capId,
        data: getCarDataQuery.data,
        quote: quoteDataQuery.data,
        query: context.query,
        trim: trimAndColorData?.data?.trimList || null,
        colour: trimAndColorData?.data?.colourList || null,
        genericPageHead: data,
        genericPages,
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

export default VanDetailsPage;
