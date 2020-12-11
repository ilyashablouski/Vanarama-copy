/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import localForage from 'localforage';
import cx from 'classnames';

import {
  pushPDPDataLayer,
  pushAddToCartDataLayer,
  getCategory,
  pushCallBackDataLayer,
} from '../../utils/dataLayerHelpers';
import { ILeaseScannerData } from '../CustomiseLeaseContainer/interfaces';
import { toPriceFormat } from '../../utils/helpers';
import { LEASING_PROVIDERS } from '../../utils/leaseScannerHelper';
import {
  VehicleTypeEnum,
  LeaseTypeEnum,
  OrderInputObject,
} from '../../../generated/globalTypes';
import {
  GetVehicleDetails,
  GetVehicleDetails_vehicleDetails_rangeFaqs,
  GetVehicleDetails_vehicleImages,
  GetVehicleDetails_derivativeInfo_colours,
  GetVehicleDetails_derivativeInfo_trims,
} from '../../../generated/GetVehicleDetails';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { replaceReview } from '../../components/CustomerReviews/helpers';
import { useCreateUpdateOrder } from '../../gql/order';
import useLeaseType from '../../hooks/useLeaseType';
import { getProductPageBreadCrumb } from '../../utils/url';
import { GetQuoteDetails } from '../../../generated/GetQuoteDetails';
import { GenericPageHeadQuery } from '../../../generated/GenericPageHeadQuery';
import { genericPagesQuery_genericPages_items as GenericPages } from '../../../generated/genericPagesQuery';
import Skeleton from '../../components/Skeleton';
import {
  GetTrimAndColor_colourList as IColourList,
  GetTrimAndColor_trimList as ITrimList,
} from '../../../generated/GetTrimAndColor';

const Flame = dynamic(() => import('@vanarama/uibook/lib/assets/icons/Flame'));
const DownloadSharp = dynamic(() =>
  import('@vanarama/uibook/lib/assets/icons/DownloadSharp'),
);
const Loading = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/loading'),
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Rating = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/rating'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Icon = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/icon'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const MediaGallery = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/media-gallery'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const LeaseScanner = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/lease-scanner'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const IndependentReview = dynamic(() =>
  import('../../components/IndependentReview/IndependentReview'),
);
const WhyChooseLeasing = dynamic(
  () => import('../../components/WhyChooseLeasing/WhyChooseLeasing'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const Banner = dynamic(() => import('../../components/Banner/Banner'));
const CustomerReviews = dynamic(() =>
  import('../../components/CustomerReviews/CustomerReviews'),
);
const WhyChooseVanarama = dynamic(() =>
  import('../../components/WhyChooseVanarama/WhyChooseVanarama'),
);
const FrequentlyAskedQuestions = dynamic(() =>
  import('../../components/FrequentlyAskedQuestions/FrequentlyAskedQuestions'),
);
const RouterLink = dynamic(() =>
  import('../../components/RouterLink/RouterLink'),
);
const Breadcrumb = dynamic(
  () => import('../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Head = dynamic(() => import('../../components/Head/Head'));

const VehicleTechDetails = dynamic(() =>
  import('../VehicleTechDetails/VehicleTechDetails'),
);
const CustomiseLeaseContainer = dynamic(() =>
  import('../CustomiseLeaseContainer/CustomiseLeaseContainer'),
);
const CustomerAlsoViewedContainer = dynamic(() =>
  import('../CustomerAlsoViewedContainer/CustomerAlsoViewedContainer'),
);

interface IDetailsPageProps {
  capId: number;
  cars?: boolean;
  vans?: boolean;
  pickups?: boolean;
  data?: GetVehicleDetails;
  loading?: boolean;
  quote?: GetQuoteDetails;
  schema?: any;
  genericPageHead: GenericPageHeadQuery | undefined;
  genericPages: GenericPages[] | null | undefined;
  trimList: ITrimList[];
  colourList: IColourList[];
}

const DetailsPage: React.FC<IDetailsPageProps> = ({
  capId,
  cars,
  vans,
  pickups,
  data,
  loading,
  quote,
  schema,
  genericPageHead,
  genericPages,
  trimList,
  colourList,
}) => {
  const router = useRouter();
  // pass cars prop(Boolean)
  const { cachedLeaseType, setCachedLeaseType } = useLeaseType(cars);
  const [leaseType, setLeaseType] = useState<string>(cachedLeaseType);
  const [leadTime, setLeadTime] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [firstTimePushDataLayer, setFirstTimePushDataLayer] = useState<boolean>(
    true,
  );

  useEffect(() => {
    setCachedLeaseType(leaseType);
  }, [leaseType, setCachedLeaseType]);

  const [
    leaseScannerData,
    setLeaseScannerData,
  ] = useState<null | ILeaseScannerData>(null);
  const isMobile = useMobileViewport();

  useEffect(() => {
    if (
      window &&
      firstTimePushDataLayer &&
      data?.derivativeInfo &&
      data?.vehicleConfigurationByCapId &&
      leaseScannerData?.quoteByCapId
    ) {
      const price = leaseScannerData?.quoteByCapId?.leaseCost?.monthlyRental;
      const derivativeInfo = data?.derivativeInfo;
      const vehicleConfigurationByCapId = data?.vehicleConfigurationByCapId;
      // tracking
      pushPDPDataLayer({
        capId,
        derivativeInfo,
        vehicleConfigurationByCapId,
        price,
        category: getCategory({ cars, vans, pickups }),
      });

      setFirstTimePushDataLayer(false);
    }
  }, [
    data,
    cars,
    vans,
    pickups,
    capId,
    leaseScannerData,
    firstTimePushDataLayer,
  ]);

  const [createOrderHandle] = useCreateUpdateOrder(() => {});

  const onSubmitClick = (values: OrderInputObject) => {
    const price = leaseScannerData?.quoteByCapId?.leaseCost?.monthlyRental;
    const derivativeInfo = data?.derivativeInfo;
    const vehicleConfigurationByCapId = data?.vehicleConfigurationByCapId;
    pushAddToCartDataLayer({
      capId,
      derivativeInfo,
      leaseScannerData,
      values,
      vehicleConfigurationByCapId,
      price,
      category: getCategory({ cars, vans, pickups }),
    });
    return createOrderHandle({
      variables: {
        input: values,
      },
    })
      .then(response =>
        localForage.setItem('orderId', response.data?.createUpdateOrder?.uuid),
      )
      .then(orderId => {
        const url =
          leaseType.toUpperCase() === LeaseTypeEnum.PERSONAL
            ? '/olaf/about/[orderId]'
            : '/b2b/olaf/about';

        router.push(url, url.replace('[orderId]', orderId || ''));
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

  const vehicleDetails = data?.vehicleDetails;
  const derivativeInfo = data?.derivativeInfo;
  const leaseAdjustParams = data?.leaseAdjustParams;
  const vehicleConfigurationByCapId = data?.vehicleConfigurationByCapId;
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

  let video =
    (data?.vehicleImages?.length &&
      (data?.vehicleImages as GetVehicleDetails_vehicleImages[])[0].videoUrl) ||
    undefined;

  // Disable autostart on video.
  if (video) {
    if (video.includes('?')) {
      video = `${video}&autostart=false`;
    } else {
      video = `${video}?autostart=false`;
    }
  }

  const threeSixtyVideo =
    (data?.vehicleImages?.length &&
      (data?.vehicleImages as GetVehicleDetails_vehicleImages[])[0]
        .threeSixtyVideoUrl) ||
    undefined;

  const vehicleType = cars ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV;
  const pageTitle = `${vehicleConfigurationByCapId?.capManufacturerDescription} ${vehicleConfigurationByCapId?.capModelDescription}`;

  // eslint-disable-next-line no-console
  if (process.env.ENV !== 'production') console.log('CAP Id:', capId);

  const onSubmitClickMobile = () => {
    const colourDescription = derivativeInfo?.colours?.find(
      (item: GetVehicleDetails_derivativeInfo_colours | null) =>
        item?.id === leaseScannerData?.quoteByCapId?.colour,
    )?.optionDescription;
    const trimDescription = derivativeInfo?.trims?.find(
      (item: GetVehicleDetails_derivativeInfo_trims | null) =>
        item?.id === leaseScannerData?.quoteByCapId?.trim,
    )?.optionDescription;
    onSubmitClick({
      leaseType: leaseType.toUpperCase() as LeaseTypeEnum,
      lineItems: [
        {
          vehicleProduct: {
            vehicleType,
            derivativeCapId: capId.toString(),
            colour: colourDescription,
            trim: trimDescription,
            term: leaseScannerData?.quoteByCapId?.term || null,
            annualMileage: leaseScannerData?.quoteByCapId?.mileage,
            depositMonths: leaseScannerData?.quoteByCapId?.upfront || null,
            depositPayment:
              leaseScannerData?.quoteByCapId?.leaseCost?.initialRental || null,
            monthlyPayment:
              leaseScannerData?.quoteByCapId?.leaseCost?.monthlyRental || null,
            maintenance: leaseScannerData?.maintenance,
            maintenancePrice: leaseScannerData?.maintenance
              ? leaseScannerData?.quoteByCapId?.maintenanceCost?.monthlyRental
              : undefined,
          },
          quantity: 1,
        },
      ],
    });
  };

  const breadcrumbItems =
    genericPageHead?.genericPage.metaData?.breadcrumbs ??
    getProductPageBreadCrumb(
      data?.derivativeInfo,
      genericPages,
      genericPageHead?.genericPage.metaData.slug || '',
      cars,
    );
  const metaData = genericPageHead?.genericPage.metaData ?? {
    title:
      `${pageTitle} ${vehicleConfigurationByCapId?.capDerivativeDescription} 
    Leasing Deals | Vanarama` || null,
    name: '' || null,
    metaRobots: '' || null,
    metaDescription:
      `Get top ${pageTitle} ${
        vehicleConfigurationByCapId?.capDerivativeDescription
      } leasing deals at Vanarama. ✅ 5* Customer Service ✅ Brand-New ${
        // eslint-disable-next-line no-nested-ternary
        cars ? 'Cars' : vans ? 'Vans' : 'Pickups'
      } ✅ Free Delivery ✅ Road Tax Included` || null,
    publishedOn: '' || null,
    legacyUrl: '' || null,
    pageType: '' || null,
    canonicalUrl: '' || null,
    slug: '' || null,
    schema: schema || null,
    breadcrumbs: breadcrumbItems || null,
  };

  // tracking
  const onCompletedCallBack = () => {
    const price = leaseScannerData?.quoteByCapId?.leaseCost?.monthlyRental;

    pushCallBackDataLayer({
      capId,
      derivativeInfo,
      vehicleConfigurationByCapId,
      price,
      category: getCategory({ cars, vans, pickups }),
    });
  };

  return (
    <>
      <div className="pdp--content">
        {breadcrumbItems && (
          <div className="row:title">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        )}
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
          videoSrc={video && video}
          threeSixtyVideoSrc={threeSixtyVideo}
          videoIframe
        />
        <VehicleTechDetails
          vehicleDetails={vehicleDetails}
          derivativeInfo={derivativeInfo}
        />
        {(vans || cars) && <Banner vans={vans} />}
        {(vans || pickups) && !!independentReview && (
          <IndependentReview review={independentReview || ''} />
        )}
        {isMobile && (
          <CustomiseLeaseContainer
            quote={quote}
            capId={capId}
            onCompletedCallBack={onCompletedCallBack}
            vehicleType={vehicleType}
            derivativeInfo={derivativeInfo}
            leaseAdjustParams={leaseAdjustParams}
            leaseType={leaseType}
            setLeaseType={setLeaseType}
            trimData={trimList}
            colourData={colourList}
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
        quote={quote}
        capId={capId}
        vehicleType={vehicleType}
        derivativeInfo={derivativeInfo}
        leaseAdjustParams={leaseAdjustParams}
        leaseType={leaseType}
        trimData={trimList}
        colourData={colourList}
        setLeaseType={setLeaseType}
        setLeadTime={setLeadTime}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        setLeaseScannerData={setLeaseScannerData}
        onCompletedCallBack={onCompletedCallBack}
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
            orderNowClick={onSubmitClickMobile}
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
      <Head
        metaData={metaData}
        featuredImage={genericPageHead?.genericPage.featuredImage || null}
      />
    </>
  );
};

export default DetailsPage;
