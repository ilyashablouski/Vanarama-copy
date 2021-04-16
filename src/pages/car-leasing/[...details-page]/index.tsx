import { NextPage, NextPageContext } from 'next';
import { ApolloError } from '@apollo/client';
import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import SchemaJSON from 'core/atoms/schema-json';
import { GET_CAR_DATA, GET_TRIM_AND_COLOR_DATA } from '../../../gql/carpage';
import {
  FinanceTypeEnum,
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
import { GET_PRODUCT_CARDS_DATA } from '../../../containers/CustomerAlsoViewedContainer/gql';
import {
  GetProductCard,
  GetProductCardVariables,
} from '../../../../generated/GetProductCard';
import { decodeData, encodeData } from '../../../utils/data';

interface IProps {
  query?: ParsedUrlQuery;
  data?: GetVehicleDetails;
  error?: string;
  capId?: number;
  quote?: GetQuoteDetails;
  notFoundPageData?: INotFoundPageData;
  errors: any[];
  genericPageHead: GenericPageHeadQuery;
  genericPages: GenericPages[];
  trim: ITrimList[];
  colour: IColourList[];
  productCard: GetProductCard | null;
  leaseTypeQuery?: string | null;
}

const CarDetailsPage: NextPage<IProps> = ({
  capId,
  data,
  error,
  quote,
  notFoundPageData,
  genericPageHead,
  genericPages,
  trim,
  colour,
  productCard: encodedData,
  leaseTypeQuery,
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

  // De-obfuscate data for user
  const productCard = decodeData(encodedData);

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
      url: `https://www.vanarama.com/${data?.vehicleConfigurationByCapId
        ?.legacyUrl || data?.vehicleConfigurationByCapId?.url}`,
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
      <DetailsPage
        cars
        quote={quote}
        capId={capId || 0}
        data={data}
        trimList={trim}
        colourList={colour}
        genericPageHead={genericPageHead}
        genericPages={genericPages}
        productCard={productCard}
        leaseTypeQuery={leaseTypeQuery}
      />
      <SchemaJSON json={JSON.stringify(schema)} />
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({});
  const path = context.req?.url?.split('?')[0] || '';

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

    const mileage = context.query?.mileage
      ? +context.query?.mileage
      : getCarDataQuery.data?.vehicleConfigurationByCapId?.financeProfile
          ?.mileage;
    const term = context.query?.term
      ? +context.query?.term
      : getCarDataQuery.data?.vehicleConfigurationByCapId?.financeProfile?.term;
    const upfront = context.query?.upfront
      ? +context.query?.upfront
      : getCarDataQuery.data?.vehicleConfigurationByCapId?.financeProfile
          ?.upfront;

    const leaseType =
      context.query.leaseType === FinanceTypeEnum.BCH
        ? LeaseTypeEnum.BUSINESS
        : LeaseTypeEnum.PERSONAL;

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
        leaseType,
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
        slug: path.split('?')[0].slice(1),
      },
    });

    const trimAndColorData = await client.query<
      GetTrimAndColor,
      GetTrimAndColorVariables
    >({
      query: GET_TRIM_AND_COLOR_DATA,
      variables: {
        capId: `${capId}`,
        vehicleType: VehicleTypeEnum.CAR,
        trimId:
          parseInt(quoteDataQuery.data?.quoteByCapId?.trim || '0', 10) ||
          undefined,
        colourId:
          parseInt(quoteDataQuery.data?.quoteByCapId?.colour || '0', 10) ||
          undefined,
      },
    });

    const breadcrumbSlugsArray = data?.genericPage.metaData.slug?.split('/');
    const breadcrumbSlugs = breadcrumbSlugsArray?.map((el, id) =>
      breadcrumbSlugsArray.slice(0, id + 1).join('/'),
    );

    const capsIds =
      getCarDataQuery.data?.vehicleDetails?.relatedVehicles?.map(
        el => el?.capId || '',
      ) || [];

    let productCard;

    if (capsIds.length) {
      const productCardData = await client.query<
        GetProductCard,
        GetProductCardVariables
      >({
        query: GET_PRODUCT_CARDS_DATA,
        variables: {
          capIds: capsIds,
          vehicleType: VehicleTypeEnum.CAR,
        },
      });

      // Obfuscate data from Googlebot
      productCard = encodeData(productCardData);
    }

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
        genericPages: genericPages || null,
        productCard: productCard || null,
        leaseTypeQuery: context.query.leaseType
          ? leaseType.charAt(0) + leaseType.slice(1).toLowerCase()
          : null,
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
