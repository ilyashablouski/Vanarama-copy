import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ApolloError } from '@apollo/client';
import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import SchemaJSON from 'core/atoms/schema-json';
import {
  GET_CAR_DATA,
  GET_COLOUR_AND_TRIM_GROUP_LIST,
  GET_IMACA_ASSETS,
  GET_PDP_CONTENT,
} from '../../../gql/carpage';
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
  getManufacturerJson,
  getVehicleConfigurationPath,
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
  GetVehicleDetails_derivativeInfo_technicals,
} from '../../../../generated/GetVehicleDetails';
import {
  addImacaHexToColourList,
  moveFactoryOrderToEnd,
  sortByHotOffer,
  toPriceFormat,
} from '../../../utils/helpers';
import { GENERIC_PAGE_HEAD } from '../../../gql/genericPage';
import {
  GenericPageHeadQuery,
  GenericPageHeadQueryVariables,
} from '../../../../generated/GenericPageHeadQuery';
import { GET_LEGACY_URLS } from '../../../containers/SearchPageContainer/gql';
import {
  genericPagesQuery,
  genericPagesQueryVariables,
  genericPagesQuery_genericPages as IGenericPages,
} from '../../../../generated/genericPagesQuery';
import {
  GetImacaAssets,
  GetImacaAssetsVariables,
  GetImacaAssets_getImacaAssets as IImacaAssets,
} from '../../../../generated/GetImacaAssets';
import { GET_PRODUCT_CARDS_DATA } from '../../../containers/CustomerAlsoViewedContainer/gql';
import {
  GetProductCard,
  GetProductCardVariables,
} from '../../../../generated/GetProductCard';
import { decodeData, encodeData } from '../../../utils/data';
import { CurrencyCodeEnum } from '../../../../entities/global';
import {
  GetPdpContent as IGetPdpContentQuery,
  GetPdpContentVariables as IGetPdpContentVariables,
} from '../../../../generated/GetPdpContent';
import { pdpCarType } from '../../../containers/DetailsPage/helpers';
import { IStatusCode, Nullable } from '../../../types/common';
import { IOptionsList } from '../../../types/detailsPage';
import {
  GetColourAndTrimGroupList,
  GetColourAndTrimGroupListVariables,
} from '../../../../generated/GetColourAndTrimGroupList';
import { IManufacturersSlug } from '../../../types/manufacturerSlug';

interface IProps {
  query?: ParsedUrlQuery;
  data?: GetVehicleDetails;
  capId?: number;
  capsId?: string[];
  quote?: GetQuoteDetails;
  genericPageHead: GenericPageHeadQuery;
  genericPages: IGenericPages['items'];
  productCard: GetProductCard | null;
  leaseTypeQuery?: LeaseTypeEnum | null;
  pdpContent: IGetPdpContentQuery | null;
  imacaAssets: IImacaAssets | null;
  colourData: Nullable<IOptionsList[]>;
  trimData: Nullable<IOptionsList[]>;
  migrationSlugs?: IManufacturersSlug;
}

const CarDetailsPage: NextPage<IProps> = ({
  capId,
  capsId,
  data,
  quote,
  genericPageHead,
  genericPages,
  productCard: encodedData,
  leaseTypeQuery,
  pdpContent,
  imacaAssets,
  colourData,
  trimData,
}) => {
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
      (obj: GetVehicleDetails_derivativeInfo_technicals | null) =>
        obj?.technicalDescription === description,
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
      priceCurrency: CurrencyCodeEnum.GBP,
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
        dataUiTestId="car-details-page"
        pdpContent={pdpContent}
        cars
        quote={quote}
        capId={capId || 0}
        capsId={capsId}
        data={data}
        imacaAssets={imacaAssets}
        genericPageHead={genericPageHead}
        genericPages={genericPages}
        productCard={productCard}
        leaseTypeQuery={leaseTypeQuery}
        colourData={colourData}
        trimData={trimData}
      />
      <SchemaJSON json={JSON.stringify(schema)} />
    </>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  const client = createApolloClient({});
  const path = context.resolvedUrl || '';

  try {
    const { data } = await client.query<
      GenericPageHeadQuery,
      GenericPageHeadQueryVariables
    >({
      query: GENERIC_PAGE_HEAD,
      variables: {
        slug: getVehicleConfigurationPath(path),
        isPreview: !!context?.preview,
      },
    });

    const { redirectTo, redirectStatusCode } = data.genericPage;

    if (redirectTo && redirectStatusCode) {
      return {
        redirect: {
          destination: `/${redirectTo}`,
          statusCode: redirectStatusCode as IStatusCode,
        },
      };
    }

    const [vehicleConfigurationByUrlQuery, migrationSlugs] = await Promise.all([
      client.query<
        VehicleConfigurationByUrl,
        VehicleConfigurationByUrlVariables
      >({
        query: VEHICLE_CONFIGURATION_BY_URL,
        variables: {
          url: getVehicleConfigurationPath(path),
        },
      }),
      getManufacturerJson(),
    ]);

    const capId =
      vehicleConfigurationByUrlQuery.data?.vehicleConfigurationByUrl
        ?.capDerivativeId || 0;
    const leaseType =
      context.query.leaseType === FinanceTypeEnum.BCH
        ? LeaseTypeEnum.BUSINESS
        : LeaseTypeEnum.PERSONAL;

    const getCarDataQuery = await client.query<
      GetVehicleDetails,
      GetVehicleDetailsVariables
    >({
      query: GET_CAR_DATA,
      variables: {
        capId,
        capIdDetails: `${capId}`,
        vehicleType: VehicleTypeEnum.CAR,
        leaseType,
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

    const imacaAssets = await client.query<
      GetImacaAssets,
      GetImacaAssetsVariables
    >({
      query: GET_IMACA_ASSETS,
      errorPolicy: 'all',
      variables: {
        vehicleType: VehicleTypeEnum.CAR,
        capId,
      },
    });

    const quoteDataQuery = await client.query<
      GetQuoteDetails,
      GetQuoteDetailsVariables
    >({
      query: GET_QUOTE_DATA,
      variables: {
        capId: `${capId}`,
        vehicleType: VehicleTypeEnum.CAR,
        // we have to use null for colour and trim to get the cheapest price
        colour: null,
        trim: null,
        mileage,
        term,
        upfront,
        leaseType,
      },
    });

    const pageType = pdpCarType(getCarDataQuery.data);
    const { data: pdpContent } = await client.query<
      IGetPdpContentQuery,
      IGetPdpContentVariables
    >({
      query: GET_PDP_CONTENT,
      variables: {
        vehicleType: pageType,
        isPreview: context?.preview,
        derivativeId: capId,
      },
    });

    const colorAndTrimData = await client.query<
      GetColourAndTrimGroupList,
      GetColourAndTrimGroupListVariables
    >({
      query: GET_COLOUR_AND_TRIM_GROUP_LIST,
      variables: {
        capId: `${capId}`,
        vehicleType: VehicleTypeEnum.CAR,
        colourId: parseInt(
          quoteDataQuery.data?.quoteByCapId?.colour || '0',
          10,
        ),
      },
    });

    const colourDataWithHex = addImacaHexToColourList(
      colorAndTrimData?.data.colourGroupList,
      imacaAssets.data.getImacaAssets?.colours,
    );
    const colourData = moveFactoryOrderToEnd(colourDataWithHex);

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
      const { data: productCardData } = await client.query<
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

    let genericPages;

    if (
      !migrationSlugs.vehicles?.car.manufacturers.includes(
        getCarDataQuery?.data?.derivativeInfo?.manufacturer.name || '',
      )
    ) {
      genericPages = await client
        .query<genericPagesQuery, genericPagesQueryVariables>({
          query: GET_LEGACY_URLS,
          variables: {
            slugs: breadcrumbSlugs || [],
          },
        })
        .then(resp => resp?.data?.genericPages?.items);
    }

    return {
      props: {
        capId,
        migrationSlugs: migrationSlugs || null,
        capsId: capsIds,
        pdpContent: pdpContent || null,
        data: getCarDataQuery.data,
        quote: quoteDataQuery.data,
        query: context.query,
        imacaAssets: imacaAssets.data.getImacaAssets || null,
        genericPageHead: data,
        genericPages: genericPages || null,
        productCard: productCard || null,
        leaseTypeQuery: leaseType,
        colourData: sortByHotOffer(colourData),
        trimData: sortByHotOffer(colorAndTrimData.data.trimGroupList),
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return { notFound: true };
    }

    // throw any other errors
    // Next will render our custom pages/_error
    throw error;
  }
}

export default CarDetailsPage;
