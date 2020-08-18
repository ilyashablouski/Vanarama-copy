/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import Router from 'next/router';
import { ApolloError } from '@apollo/client';

import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Rating from '@vanarama/uibook/lib/components/atoms/rating';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import DownloadSharp from '@vanarama/uibook/lib/assets/icons/DownloadSharp';
import MediaGallery from '@vanarama/uibook/lib/components/organisms/media-gallery';
import LeaseScanner from '@vanarama/uibook/lib/components/organisms/lease-scanner';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import cx from 'classnames';
import { ILeaseScannerData } from '../CustomiseLeaseContainer/interfaces';
import { toPriceFormat } from '../../utils/helpers';
import { LEASING_PROVIDERS } from '../../utils/leaseScannerHelper';
import {
  VehicleTypeEnum,
  LeaseTypeEnum,
  OrderInputObject,
} from '../../../generated/globalTypes';
import VehicleTechDetails from '../VehicleTechDetails/VehicleTechDetails';
import IndependentReview from '../../components/IndependentReview/IndependentReview';
import CustomiseLeaseContainer from '../CustomiseLeaseContainer/CustomiseLeaseContainer';
import {
  GetVehicleDetails,
  GetVehicleDetails_vehicleDetails_rangeFaqs,
  GetVehicleDetails_vehicleImages,
} from '../../../generated/GetVehicleDetails';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import WhyChooseLeasing from '../../components/WhyChooseLeasing/WhyChooseLeasing';
import Banner from '../../components/Banner/Banner';
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews';
import WhyChooseVanarama from '../../components/WhyChooseVanarama/WhyChooseVanarama';
import CustomerAlsoViewedContainer from '../CustomerAlsoViewedContainer/CustomerAlsoViewedContainer';
import { replaceReview } from '../../components/CustomerReviews/helpers';
import FrequentlyAskedQuestions from '../../components/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import { useCreateUpdateOrder } from '../../gql/order';
import RouterLink from '../../components/RouterLink/RouterLink';

interface IDetailsPageProps {
  capId: number;
  cars?: boolean;
  vans?: boolean;
  pickups?: boolean;
  data?: GetVehicleDetails;
  loading?: boolean;
  error?: ApolloError;
}

const DetailsPage: React.FC<IDetailsPageProps> = ({
  capId,
  cars,
  vans,
  pickups,
  data,
  loading,
  error,
}) => {
  const [leaseType, setLeaseType] = useState<string>('Personal');
  const [leadTime, setLeadTime] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [
    leaseScannerData,
    setLeaseScannerData,
  ] = useState<null | ILeaseScannerData>(null);
  const isMobile = useMobileViewport();

  const [createOrderHandle] = useCreateUpdateOrder(() => {});

  const onSubmitClick = (values: OrderInputObject) => {
    return createOrderHandle({
      variables: {
        input: values,
      },
    }).then(response => {
      const url =
        leaseType.toUpperCase() === LeaseTypeEnum.PERSONAL
          ? '/olaf/about/[orderId]'
          : '/b2b/olaf/about/[orderId]';

      Router.push(
        url,
        url.replace('[orderId]', response.data?.createUpdateOrder?.uuid || ''),
      );
    });
  };

  if (loading) {
    return (
      <div
        className="pdp--content"
        style={{ minHeight: '40rem', display: 'flex', alignItems: 'center' }}
      >
        <Loading size="xlarge" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="pdp--content"
        style={{ minHeight: '40rem', display: 'flex', alignItems: 'center' }}
      >
        {error?.message}
      </div>
    );
  }

  const vehicleDetails = data?.vehicleDetails;
  const derivativeInfo = data?.derivativeInfo;
  const leaseAdjustParams = data?.leaseAdjustParams;
  const vehicleConfigurationByCapId = data?.vehicleConfigurationByCapId;
  const financeProfile = data?.vehicleConfigurationByCapId?.financeProfile;
  const independentReview = data?.vehicleDetails?.independentReview;
  const warranty = data?.vehicleDetails?.warranty;
  const capsId = data?.vehicleDetails?.relatedVehicles?.map(
    el => el?.capId || '',
  );
  const reviews = data?.vehicleDetails?.customerReviews?.map(review => ({
    text: review?.review ? replaceReview(review.review) : '',
    author: review?.name || '',
    score: review?.rating || 0,
  }));
  const rangeFAQs = data?.vehicleDetails
    ?.rangeFaqs as GetVehicleDetails_vehicleDetails_rangeFaqs[];

  const vehicleImages =
    (data?.vehicleImages?.length &&
      ((data?.vehicleImages as GetVehicleDetails_vehicleImages[])[0]
        .imageUrls as string[])) ||
    [];

  const video =
    (data?.vehicleImages?.length &&
      (data?.vehicleImages as GetVehicleDetails_vehicleImages[])[0].videoUrl) ||
    undefined;

  const threeSixtyVideo =
    (data?.vehicleImages?.length &&
      (data?.vehicleImages as GetVehicleDetails_vehicleImages[])[0]
        .threeSixtyVideoUrl) ||
    undefined;

  const vehicleType = cars ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV;
  const pageTitle = `${vehicleConfigurationByCapId?.capManufacturerDescription} ${vehicleConfigurationByCapId?.capRangeDescription}`;

  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV === 'development') console.log('CAP Id:', capId);

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
    derivativeInfo?.technicals?.find(
      (obj: any) => obj?.technicalDescription === description,
    )?.value || 'N/A';

  const schema = cars
    ? // Cars
      {
        '@context': 'http://schema.org',
        '@type': 'Car',
        name: `${pageTitle} ${vehicleConfigurationByCapId?.capDerivativeDescription}`,
        description: `New ${pageTitle} ${
          vehicleConfigurationByCapId?.capDerivativeDescription
        } lease deal from Vanarama starts from £${toPriceFormat(
          leaseScannerData?.quoteByCapId?.leaseCost?.monthlyRental,
        )} per month. FREE UK delivery. Mileage Buffer. 8 Point Price Promise.`,
        offers: {
          '@type': 'AggregateOffer',
          availability: 'http://schema.org/InStock',
          name: `${leaseScannerData?.quoteByCapId?.term} month Contract Hire agreement`,
          lowPrice: toPriceFormat(
            leaseScannerData?.quoteByCapId?.leaseCost?.monthlyRental,
          ),
          url: `https://www.vanarama.com/car-leasing${data?.vehicleConfigurationByCapId?.url}`,
          priceCurrency: 'GBP',
          seller,
        },
        image:
          (data?.vehicleImages && data?.vehicleImages[0]?.mainImageUrl) || '',
        manufacturer: vehicleConfigurationByCapId?.capManufacturerDescription,
        brand: vehicleConfigurationByCapId?.capManufacturerDescription,
        model: vehicleConfigurationByCapId?.capModelDescription,
        vehicleTransmission: derivativeInfo?.transmission.name,
        fuelType: derivativeInfo?.fuelType.name,
        seatingCapacity: getTechValue('No. of Seats'),
        meetsEmissionStandard: getTechValue('Standard Euro Emissions'),
        emissionsCO2: getTechValue('CO2 (g/km)'),
        bodyType: derivativeInfo?.bodyStyle?.name,
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
          fuelType: derivativeInfo?.fuelType.name,
          engineDisplacement: {
            '@type': 'QuantitativeValue',
            name: 'CC',
            value: getTechValue('CC'),
            unitCode: 'CMQ',
          },
        },
      }
    : // LCVs
      {
        '@context': 'http://schema.org',
        '@type': 'Vehicle',
        name: `${pageTitle} ${vehicleConfigurationByCapId?.capDerivativeDescription}`,
        description: `New ${pageTitle} ${
          vehicleConfigurationByCapId?.capDerivativeDescription
        } Van lease deal from Vanarama starts from £${toPriceFormat(
          leaseScannerData?.quoteByCapId?.leaseCost?.monthlyRental,
        )} per month. FREE UK delivery. Mileage Buffer. 8 Point Price Promise.`,
        offers: {
          '@type': 'AggregateOffer',
          availability: 'http://schema.org/InStock',
          name: `${leaseScannerData?.quoteByCapId?.term} month Contract Hire agreement`,
          lowPrice: toPriceFormat(
            leaseScannerData?.quoteByCapId?.leaseCost?.monthlyRental,
          ),
          url: `https://www.vanarama.com/van-leasing${data?.vehicleConfigurationByCapId?.url}`,
          priceCurrency: 'GBP',
          seller,
        },
        image:
          (data?.vehicleImages && data?.vehicleImages[0]?.mainImageUrl) || '',
        manufacturer: vehicleConfigurationByCapId?.capManufacturerDescription,
        brand: vehicleConfigurationByCapId?.capManufacturerDescription,
        model: vehicleConfigurationByCapId?.capModelDescription,
        vehicleTransmission: derivativeInfo?.transmission.name,
        fuelType: derivativeInfo?.fuelType.name,
        seatingCapacity: getTechValue('No. of Seats'),
        meetsEmissionStandard: getTechValue('Standard Euro Emissions'),
        emissionsCO2: getTechValue('CO2'),
        bodyType: derivativeInfo?.bodyType?.name || 'N/A',
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
          fuelType: derivativeInfo?.fuelType.name,
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
      <div className="pdp--content">
        <Heading tag="h1">
          <Heading className="-pt-100" tag="span" size="xlarge" color="black">
            {pageTitle}
          </Heading>
          <Text tag="span" size="lead" color="darker">
            {vehicleConfigurationByCapId?.capDerivativeDescription}
          </Text>
        </Heading>
        <div
          className="-mt-500 -mb-200"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Rating size="regular" score={vehicleDetails?.averageRating || 0} />
          {vehicleDetails?.brochureUrl && (
            <RouterLink
              link={{
                href: vehicleDetails?.brochureUrl,
                label: '',
                target: '_blank',
              }}
              classNames={{ color: 'teal', size: 'xsmall' }}
            >
              Download Brochure{' '}
              <Icon color="teal" size="xsmall" icon={<DownloadSharp />} />
            </RouterLink>
          )}
        </div>
        <MediaGallery
          flag={{
            accentIcon: <Icon icon={<Flame />} color="white" />,
            accentText: 'Hot Deal',
            text: leadTime,
            incomplete: true,
          }}
          images={vehicleImages}
          videoSrc={video && `${video}&autostart=false`}
          threeSixtyVideoSrc={threeSixtyVideo}
          videoIframe
        />
        <VehicleTechDetails
          vehicleDetails={vehicleDetails}
          derivativeInfo={derivativeInfo}
        />
        <Banner />
        {(vans || pickups) && !!independentReview && (
          <IndependentReview review={independentReview || ''} />
        )}
        {isMobile && (
          <CustomiseLeaseContainer
            capId={capId}
            financeProfile={financeProfile}
            vehicleType={vehicleType}
            derivativeInfo={derivativeInfo}
            leaseAdjustParams={leaseAdjustParams}
            leaseType={leaseType}
            setLeaseType={setLeaseType}
            setLeadTime={setLeadTime}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
            setLeaseScannerData={setLeaseScannerData}
            onCompleted={values => onSubmitClick(values)}
          />
        )}
        <WhyChooseLeasing warranty={warranty || ''} />
        <WhyChooseVanarama />
        <div className="pdp--reviews">
          <CustomerReviews reviews={reviews || []} title="Customer Reviews" />
        </div>
        <FrequentlyAskedQuestions
          rangeFAQ={rangeFAQs || []}
          rangeFAQTitle={pageTitle}
        />
      </div>
      <CustomiseLeaseContainer
        capId={capId}
        financeProfile={financeProfile}
        vehicleType={vehicleType}
        derivativeInfo={derivativeInfo}
        leaseAdjustParams={leaseAdjustParams}
        leaseType={leaseType}
        setLeaseType={setLeaseType}
        setLeadTime={setLeadTime}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        onCompleted={values => onSubmitClick(values)}
      />
      {!!capsId?.length && (
        <CustomerAlsoViewedContainer
          capsId={capsId}
          vehicleType={vehicleType}
          leaseType={leaseType.toUpperCase() || ''}
        />
      )}
      {isMobile && (
        <div
          className={cx('lease-scanner--sticky-wrap')}
          style={{ opacity: '1' }}
        >
          <LeaseScanner
            classNameHeading="headingText"
            className="pdp-footer"
            nextBestPrice={
              leaseScannerData?.maintenance
                ? `£${toPriceFormat(
                    leaseScannerData?.quoteByCapId?.nextBestPrice?.maintained,
                  )} PM ${leaseScannerData?.stateVAT}. VAT`
                : `£${toPriceFormat(
                    leaseScannerData?.quoteByCapId?.nextBestPrice
                      ?.nonMaintained,
                  )} PM ${leaseScannerData?.stateVAT}. VAT`
            }
            priceLabel={
              leaseScannerData?.maintenance
                ? `+£${toPriceFormat(
                    leaseScannerData?.quoteByCapId?.maintenanceCost
                      ?.monthlyRental,
                  )} Maintenance`
                : undefined
            }
            price={
              +toPriceFormat(
                leaseScannerData?.quoteByCapId?.leaseCost?.monthlyRental,
              )
            }
            orderNowClick={() => {}}
            headingText={`PM ${leaseScannerData?.stateVAT}. VAT`}
            leasingProviders={LEASING_PROVIDERS}
            startLoading={isDisabled}
            endAnimation={() => {
              setIsDisabled(false);
              leaseScannerData?.endAnimation();
            }}
            requestCallBack={() => {
              leaseScannerData?.requestCallBack();
            }}
          />
        </div>
      )}
      <SchemaJSON json={JSON.stringify(schema)} />
    </>
  );
};

export default DetailsPage;
