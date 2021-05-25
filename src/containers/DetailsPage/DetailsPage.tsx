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
  checkForGtmDomEvent,
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
import useLeaseType from '../../hooks/useLeaseType';
import { genericPagesQuery_genericPages_items as GenericPages } from '../../../generated/genericPagesQuery';
import { replaceReview } from '../../components/CustomerReviews/helpers';
import PartnershipLogo from '../../components/Partnerships/PartnershipLogo';
import Skeleton from '../../components/Skeleton';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import { getPartnerProperties } from '../../utils/partnerProperties';
import { getProductPageBreadCrumb, removeUrlQueryPart } from '../../utils/url';
import {
  GetTrimAndColor_colourList as IColourList,
  GetTrimAndColor_trimList as ITrimList,
} from '../../../generated/GetTrimAndColor';
import { GetProductCard } from '../../../generated/GetProductCard';
import { GetQuoteDetails } from '../../../generated/GetQuoteDetails';
import { GenericPageHeadQuery } from '../../../generated/GenericPageHeadQuery';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';

const Flame = dynamic(() => import('core/assets/icons/Flame'));
const Text = dynamic(() => import('core/atoms/text'));
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
const ShieldFreeInsurance = dynamic(() =>
  import('core/assets/icons/ShieldFreeInsurance'),
);
const IndependentReview = dynamic(() =>
  import('../../components/IndependentReview/IndependentReview'),
);
const FreeInsuranceCards = dynamic(() =>
  import('../../components/FreeInsuranceCards/FreeInsuranceCards'),
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
const InsuranceModal = dynamic(() => import('./InsuranceModal'));

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
  leaseTypeQuery?: string | null;
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
  leaseTypeQuery,
}) => {
  const router = useRouter();
  const pdpContent = React.useRef<HTMLDivElement>(null);
  const leaseScanner = React.useRef<HTMLDivElement>(null);
  // pass cars prop(Boolean)
  const { cachedLeaseType, setCachedLeaseType } = useLeaseType(cars);
  const [leaseType, setLeaseType] = useState<string>(
    leaseTypeQuery ?? cachedLeaseType,
  );
  const [leadTime, setLeadTime] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAgreeInsuranceRules, setIsAgreeInsuranceRules] = useState(false);
  const [orderInputObject, setOrderInputObject] = useState<OrderInputObject>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [firstTimePushDataLayer, setFirstTimePushDataLayer] = useState<boolean>(
    true,
  );
  const [screenY, setScreenY] = useState<number | null>(null);
  const [mileage, setMileage] = useState<number | null>(
    quote?.quoteByCapId?.mileage || null,
  );
  const [partnershipLogo, setPartnershipLogo] = useState(null);
  const [partnershipTitle, setPartnershipTitle] = useState(null);

  useEffect(() => {
    setCachedLeaseType(leaseType);
  }, [leaseType, setCachedLeaseType]);

  useEffect(() => {
    const partnership = getPartnerProperties();
    if (partnership) {
      setPartnershipLogo(partnership.logo?.file?.url);
      setPartnershipTitle(partnership.logo?.title);
    }
  }, []);

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
      price: price || '0.00',
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
      checkForGtmDomEvent(pushAnalytics);
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

  const isSpecialOffer = useMemo(
    () => data?.vehicleConfigurationByCapId?.onOffer,
    [data],
  );

  const isCar = useMemo(
    () => quote?.quoteByCapId?.vehicleType === VehicleTypeEnum.CAR,
    [],
  );

  const vehicleImages = useMemo(() => {
    return isSpecialOffer && isCar
      ? (() => {
          const urls =
            (data?.vehicleImages?.length &&
              ((data?.vehicleImages as GetVehicleDetails_vehicleImages[])[0]
                .imageUrls as string[])) ||
            [];
          return urls[0]
            ? [
                [
                  urls[0],
                  `${process.env.HOST_DOMAIN}/Assets/images/insurance/1-Year-Free-Insurance.png`,
                ],
                ...urls.slice(1),
              ]
            : urls;
        })()
      : (data?.vehicleImages?.length &&
          ((data?.vehicleImages as GetVehicleDetails_vehicleImages[])[0]
            .imageUrls as string[])) ||
          [];
  }, [data?.vehicleImages, isCar, isSpecialOffer]);

  const onOrderStart = (withInsurance = false) => {
    const derivativeInfo = data?.derivativeInfo;
    const vehicleConfigurationByCapId = data?.vehicleConfigurationByCapId;
    const values: OrderInputObject = {
      ...orderInputObject,
    } as OrderInputObject;
    const vehicleProduct = values.lineItems?.[0].vehicleProduct;
    if (vehicleProduct)
      vehicleProduct.freeInsurance = {
        optIn: withInsurance,
        eligible: isAgreeInsuranceRules,
      };
    pushAddToCartDataLayer({
      capId,
      derivativeInfo,
      leaseScannerData,
      values,
      vehicleConfigurationByCapId,
      price,
      category: getCategory({ cars, vans, pickups }),
    });
    setIsModalVisible(false);

    return localForage
      .setItem('order', {
        ...values,
        rating: vehicleDetails?.averageRating || 0,
      })
      .then(() => localForage.removeItem('orderId'))
      .then(() => localForage.removeItem('personEmail'))
      .then(() => localForage.removeItem('personUuid'))
      .then(() => {
        const url =
          leaseType.toUpperCase() === LeaseTypeEnum.PERSONAL
            ? '/olaf/about'
            : '/b2b/olaf/about';

        router.push(url, url);
      });
  };

  const onSubmitClick = (values: OrderInputObject) => {
    setOrderInputObject(values);
    if (isSpecialOffer && isCar) {
      setIsModalVisible(true);
      return;
    }
    onOrderStart();
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

  const metaTitle = `${pageTitle} ${vehicleConfigurationByCapId?.capDerivativeDescription}`;

  const metaData = genericPageHead?.genericPage.metaData ?? {
    title: `${metaTitle} Leasing Deals | Vanarama` || null,
    name: '' || null,
    metaRobots: '' || null,
    metaDescription:
      `Get top ${metaTitle} leasing deals at Vanarama. ✅ 5* Customer Service ✅ Brand-New ${
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
      {partnershipLogo && (
        <div className="partnership-top-header">
          <PartnershipLogo
            logo={partnershipLogo || ''}
            imageAlt={partnershipTitle || ''}
          />
        </div>
      )}
      <div
        className={cx('pdp--content', {
          '-free-insurance': isSpecialOffer && isCar,
        })}
        ref={pdpContent}
      >
        {isSpecialOffer && isCar && (
          <div className="pdp-free-insurance-banner -white">
            <ShieldFreeInsurance />
            <Text tag="span" color="white">
              1 Year&apos;s FREE Insurance
            </Text>
            <RouterLink
              link={{
                href: '/car-leasing/free-car-insurance',
                label: 'Find Out More',
              }}
            />
          </div>
        )}
        {breadcrumbItems && (
          <div className="row:title">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        )}
        <h1 className="heading -pt-100 -black -xlarge">{pageTitle}</h1>
        <span className="text -lead -darker">
          {vehicleConfigurationByCapId?.capDerivativeDescription}
        </span>
        <div className="pdp--content-details">
          <Rating size="regular" score={vehicleDetails?.averageRating || 0} />
          <div>
            <div className="pdp--brochure">
              {vehicleDetails?.brochureUrl && (
                <RouterLink
                  link={{
                    href: vehicleDetails?.brochureUrl,
                    label: '',
                    target: '_blank',
                  }}
                  classNames={{ color: 'teal', size: 'xsmall' }}
                >
                  {'Download Brochure '}
                  <Icon color="teal" size="xsmall" icon={<DownloadSharp />} />
                </RouterLink>
              )}
            </div>
          </div>
        </div>
        <MediaGallery
          flag={{
            accentIcon: data?.vehicleConfigurationByCapId?.onOffer ? (
              <Icon icon={<Flame />} color="white" />
            ) : (
              ''
            ),
            accentText: data?.vehicleConfigurationByCapId?.onOffer
              ? 'Hot Offer'
              : '',
            text: leadTime,
            incomplete: true,
          }}
          images={vehicleImages}
          videoSrc={video && video}
          threeSixtyVideoSrc={threeSixtyVideo}
          videoIframe
          imageAltText={metaTitle}
        />
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <VehicleTechDetails
            vehicleDetails={vehicleDetails}
            derivativeInfo={derivativeInfo}
          />
          {isSpecialOffer && isCar && <FreeInsuranceCards />}
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
        {(vans || (cars && !isSpecialOffer)) && <Banner vans={vans} />}
        {(vans || pickups) && !!independentReview && (
          <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
            <IndependentReview review={independentReview || ''} />
          </LazyLoadComponent>
        )}
        {isMobile && (
          <CustomiseLeaseContainer
            quote={quote}
            capId={capId}
            isShowFreeInsuranceMerch={isCar && !!isSpecialOffer}
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
            pickups={pickups}
          />
        )}
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <WhyChooseLeasing warranty={warranty || ''} />
          <WhyChooseVanarama cars={cars} vans={vans} pickups={pickups} />
        </LazyLoadComponent>
        <div className="pdp--reviews">
          <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
            <CustomerReviews
              reviews={reviews || []}
              title="Customer Reviews"
              sliderClassName="customer-reviews"
              headingClassName="-mb-200"
            />
          </LazyLoadComponent>
        </div>
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
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
          isShowFreeInsuranceMerch={isCar && !!isSpecialOffer}
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
          pickups={pickups}
        />
      )}
      {(!!productCard || !!capsId?.length) && (
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
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
          <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
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
      {isModalVisible && (
        <InsuranceModal
          setIsModalVisible={setIsModalVisible}
          isAgreeInsuranceRules={isAgreeInsuranceRules}
          setIsAgreeInsuranceRules={setIsAgreeInsuranceRules}
          onContinueWithInsurance={() => onOrderStart(true)}
          onContinueWithoutInsurance={() => onOrderStart(false)}
        />
      )}
      <Head
        metaData={metaData}
        featuredImage={genericPageHead?.genericPage.featuredImage || null}
      />
    </>
  );
};

export default DetailsPage;
