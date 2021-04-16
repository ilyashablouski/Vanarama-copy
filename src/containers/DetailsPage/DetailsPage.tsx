/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import localForage from 'localforage';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import cx from 'classnames';
import Button from 'core/atoms/button';
import {
  pushPDPDataLayer,
  pushAddToCartDataLayer,
  getCategory,
  pushCallBackDataLayer,
  pushPageData,
  pushPageViewEvent,
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
  GetVehicleDetails_vehicleConfigurationByCapId,
} from '../../../generated/GetVehicleDetails';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { replaceReview } from '../../components/CustomerReviews/helpers';
import useLeaseType from '../../hooks/useLeaseType';
import { getProductPageBreadCrumb, removeUrlQueryPart } from '../../utils/url';
import { GetQuoteDetails } from '../../../generated/GetQuoteDetails';
import { GenericPageHeadQuery } from '../../../generated/GenericPageHeadQuery';
import { genericPagesQuery_genericPages_items as GenericPages } from '../../../generated/genericPagesQuery';
import Skeleton from '../../components/Skeleton';
import {
  GetTrimAndColor_colourList as IColourList,
  GetTrimAndColor_trimList as ITrimList,
} from '../../../generated/GetTrimAndColor';
import { GetProductCard } from '../../../generated/GetProductCard';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';

const Flame = dynamic(() => import('core/assets/icons/Flame'));
const DownloadSharp = dynamic(() => import('core/assets/icons/DownloadSharp'));
const Loading = dynamic(() => import('core/atoms/loading'));
const Rating = dynamic(() => import('core/atoms/rating'), {
  loading: () => <Skeleton count={1} />,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});
const MediaGallery = dynamic(() => import('core/organisms/media-gallery'), {
  loading: () => <Skeleton count={3} />,
});
const LeaseScanner = dynamic(() => import('core/organisms/lease-scanner'), {
  loading: () => <Skeleton count={3} />,
});
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
  productCard: GetProductCard | null;
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
  productCard,
}) => {
  const router = useRouter();
  const pdpContent = React.useRef<HTMLDivElement>(null);
  const leaseScanner = React.useRef<HTMLDivElement>(null);
  // pass cars prop(Boolean)
  const { cachedLeaseType, setCachedLeaseType } = useLeaseType(cars);
  const [leaseType, setLeaseType] = useState<string>(cachedLeaseType);
  const [leadTime, setLeadTime] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [firstTimePushDataLayer, setFirstTimePushDataLayer] = useState<boolean>(
    true,
  );
  const [screenY, setScreenY] = useState<number | null>(null);
  const [mileage, setMileage] = useState<number | null>(
    quote?.quoteByCapId?.mileage || null,
  );

  useEffect(() => {
    setCachedLeaseType(leaseType);
  }, [leaseType, setCachedLeaseType]);

  const [
    leaseScannerData,
    setLeaseScannerData,
  ] = useState<null | ILeaseScannerData>(null);
  const isMobile = useMobileViewport();

  const scrollChange = () => {
    setScreenY(window.pageYOffset);
  };

  const price = leaseScannerData?.quoteByCapId?.leaseCost?.monthlyRental;

  const onPushPDPDataLayer = useCallback(async () => {
    const derivativeInfo = data?.derivativeInfo;
    const vehicleConfigurationByCapId = data?.vehicleConfigurationByCapId;
    // tracking
    pushPDPDataLayer({
      capId,
      derivativeInfo,
      vehicleConfigurationByCapId,
      price,
      category: getCategory({ cars, vans, pickups }),
      mileage,
    });
  }, [capId, cars, data, price, pickups, vans, mileage]);

  useEffect(() => {
    if (isMobile) {
      window.addEventListener('scroll', scrollChange);
      leaseScanner.current?.classList.remove('-fixed');
      setTimeout(() => {
        leaseScanner.current?.classList.add('-fixed');
      }, 1000);
    }
  }, [isMobile]);

  useEffect(() => {
    async function pushAnalytics() {
      await pushPageData({ pathname: router.pathname });
      await pushPageViewEvent(
        removeUrlQueryPart(router.asPath),
        document.title,
      );
      await onPushPDPDataLayer();
    }
    if (
      window &&
      firstTimePushDataLayer &&
      data?.derivativeInfo &&
      data?.vehicleConfigurationByCapId &&
      leaseScannerData?.quoteByCapId
    ) {
      pushAnalytics();
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
    onPushPDPDataLayer,
    router.pathname,
    router.asPath,
  ]);

  useFirstRenderEffect(() => {
    if (price && !firstTimePushDataLayer) onPushPDPDataLayer();
    if (isMobile) {
      leaseScanner.current!.style.display = 'flex';
      setTimeout(() => {
        leaseScanner.current!.style.removeProperty('display');
      }, 1000);
    }
  }, [price]);
  const vehicleDetails = data?.vehicleDetails;

  const onSubmitClick = (values: OrderInputObject) => {
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

    return localForage
      .setItem('order', {
        ...values,
        rating: vehicleDetails?.averageRating || 0,
      })
      .then(() => localForage.removeItem('orderId'))
      .then(() => {
        const url =
          leaseType.toUpperCase() === LeaseTypeEnum.PERSONAL
            ? '/olaf/about'
            : '/b2b/olaf/about';

        router.push(url, url);
      });
  };

  const breadcrumbItems = useMemo(() => {
    return (
      (genericPageHead?.genericPage.metaData?.breadcrumbs &&
        genericPageHead.genericPage.metaData.breadcrumbs.map((el: any) => ({
          link: { href: el.href || '', label: el.label },
        }))) ??
      getProductPageBreadCrumb(
        data?.derivativeInfo,
        genericPages,
        genericPageHead?.genericPage.metaData.slug || '',
        cars,
      )
    );
  }, [cars, data, genericPageHead, genericPages]);

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
  if (process.env.ENV !== 'prod') console.log('CAP Id:', capId);

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
            funderId: `${leaseScannerData?.quoteByCapId?.funderId}`,
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
            leadTime,
            maintenancePrice: leaseScannerData?.maintenance
              ? leaseScannerData?.quoteByCapId?.maintenanceCost?.monthlyRental
              : undefined,
          },
          quantity: 1,
        },
      ],
    });
  };

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
    const vehicleConfiguration = {
      ...vehicleConfigurationByCapId,
      financeProfile: {
        ...vehicleConfigurationByCapId?.financeProfile,
        mileage:
          leaseScannerData?.quoteByCapId?.mileage ||
          vehicleConfigurationByCapId?.financeProfile?.mileage,
      },
    } as GetVehicleDetails_vehicleConfigurationByCapId;

    pushCallBackDataLayer({
      capId,
      derivativeInfo,
      vehicleConfigurationByCapId: vehicleConfiguration,
      price,
      category: getCategory({ cars, vans, pickups }),
    });
  };

  const calcScrollHeight = () => {
    const pdpContentHeight = pdpContent.current!.scrollHeight;
    const customerAlsoViewHeight = !!productCard || !!capsId?.length ? 700 : 0;
    return pdpContentHeight + customerAlsoViewHeight - window.innerHeight;
  };

  return (
    <>
      <div className="pdp--content" ref={pdpContent}>
        {breadcrumbItems && (
          <div className="row:title">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        )}
        <h1 className="heading -pt-100 -black -xlarge">{pageTitle}</h1>
        <span className="text -lead -darker">
          {vehicleConfigurationByCapId?.capDerivativeDescription}
        </span>
        {!isMobile ? (
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
        ) : (
          <Rating size="regular" score={vehicleDetails?.averageRating || 0} />
        )}
        <MediaGallery
          flag={{
            accentIcon: data?.vehicleConfigurationByCapId?.onOffer ? (
              <Icon icon={<Flame />} color="white" />
            ) : (
              ''
            ),
            accentText: data?.vehicleConfigurationByCapId?.onOffer
              ? 'Hot Deal'
              : '',
            text: leadTime,
            incomplete: true,
          }}
          images={vehicleImages}
          videoSrc={video && video}
          threeSixtyVideoSrc={threeSixtyVideo}
          videoIframe
        />
        <LazyLoadComponent
          visibleByDefault={
            typeof window === 'undefined' ||
            navigator?.vendor === 'Apple Computer, Inc.'
          }
        >
          <VehicleTechDetails
            vehicleDetails={vehicleDetails}
            derivativeInfo={derivativeInfo}
          />
        </LazyLoadComponent>
        {isMobile && vehicleDetails?.brochureUrl && (
          <Button
            className="pdp--mobile-download"
            size="regular"
            color="teal"
            fill="outline"
            label={
              <RouterLink
                link={{
                  href: vehicleDetails?.brochureUrl,
                  label: '',
                  target: '_blank',
                }}
                classNames={{ color: 'teal', size: 'regular' }}
              >
                Download Brochure{' '}
                <Icon color="teal" size="regular" icon={<DownloadSharp />} />
              </RouterLink>
            }
          />
        )}
        {(vans || cars) && <Banner vans={vans} />}
        {(vans || pickups) && !!independentReview && (
          <LazyLoadComponent
            visibleByDefault={
              typeof window === 'undefined' ||
              navigator?.vendor === 'Apple Computer, Inc.'
            }
          >
            <IndependentReview review={independentReview || ''} />
          </LazyLoadComponent>
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
            mileage={mileage}
            setMileage={setMileage}
          />
        )}
        <LazyLoadComponent
          visibleByDefault={
            typeof window === 'undefined' ||
            navigator?.vendor === 'Apple Computer, Inc.'
          }
        >
          <WhyChooseLeasing warranty={warranty || ''} />
          <WhyChooseVanarama cars={cars} vans={vans} pickups={pickups} />
        </LazyLoadComponent>
        <div className="pdp--reviews">
          <LazyLoadComponent
            visibleByDefault={
              typeof window === 'undefined' ||
              navigator?.vendor === 'Apple Computer, Inc.'
            }
          >
            <CustomerReviews
              reviews={reviews || []}
              title="Customer Reviews"
              sliderClassName="customer-reviews"
              headingClassName="-mb-200"
            />
          </LazyLoadComponent>
        </div>
        <LazyLoadComponent
          visibleByDefault={
            typeof window === 'undefined' ||
            navigator?.vendor === 'Apple Computer, Inc.'
          }
        >
          <FrequentlyAskedQuestions
            rangeFAQ={rangeFAQs || []}
            rangeFAQTitle={pageTitle}
          />
        </LazyLoadComponent>
      </div>
      {!isMobile && (
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
          mileage={mileage}
          setMileage={setMileage}
        />
      )}
      {(!!productCard || !!capsId?.length) && (
        <LazyLoadComponent
          visibleByDefault={
            typeof window === 'undefined' ||
            navigator?.vendor === 'Apple Computer, Inc.'
          }
        >
          <CustomerAlsoViewedContainer
            initProductCard={productCard}
            capsId={capsId || []}
            vehicleType={vehicleType}
            leaseType={leaseType.toUpperCase() || ''}
          />
        </LazyLoadComponent>
      )}
      {isMobile && (
        <div
          className={cx('lease-scanner--sticky-wrap', {
            '-fixed': (screenY || 0) < calcScrollHeight(),
          })}
          ref={leaseScanner}
        >
          <LazyLoadComponent
            visibleByDefault={
              typeof window === 'undefined' ||
              navigator?.vendor === 'Apple Computer, Inc.'
            }
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
          </LazyLoadComponent>
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
