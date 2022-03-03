import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import NextHead from 'next/head';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { setSessionStorage } from 'utils/windowSessionStorage';
import cx from 'classnames';
import Cookies from 'js-cookie';
import Button from 'core/atoms/button';
import MediaGallery from 'core/organisms/media-gallery';
import Text from 'core/atoms/text';
import Heading from 'core/atoms/heading';
// @ts-ignore
import decode from 'decode-html';
import TrustPilot from 'core/molecules/trustpilot';

import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import { useSaveOrderMutation } from 'gql/storedOrder';
import { useDeletePersonUuidMutation } from 'gql/storedPersonUuid';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import css from '!!raw-loader!../../../public/styles/pages/details-page.css';
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
import { toPriceFormat, getOptionFromList } from '../../utils/helpers';
import { LEASING_PROVIDERS } from '../../utils/leaseScannerHelper';
import {
  VehicleTypeEnum,
  LeaseTypeEnum,
  OrderInputObject,
} from '../../../generated/globalTypes';
import {
  GetVehicleDetails,
  GetVehicleDetails_vehicleImages,
  GetVehicleDetails_vehicleDetails_rangeFaqs,
  GetVehicleDetails_vehicleConfigurationByCapId,
} from '../../../generated/GetVehicleDetails';
import { GetImacaAssets_getImacaAssets as IImacaAssets } from '../../../generated/GetImacaAssets';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import useLeaseType from '../../hooks/useLeaseType';
import { genericPagesQuery_genericPages as IGenericPages } from '../../../generated/genericPagesQuery';
import { replaceReview } from '../../components/CustomerReviews/helpers';
import Skeleton from '../../components/Skeleton';
import { isBrowser, isServerRenderOrAppleDevice } from '../../utils/deviceType';
import {
  getProductPageBreadCrumb,
  ManufacturersSlugContext,
  removeUrlQueryPart,
} from '../../utils/url';
import { GetProductCard } from '../../../generated/GetProductCard';
import { GetQuoteDetails } from '../../../generated/GetQuoteDetails';
import { GenericPageHeadQuery } from '../../../generated/GenericPageHeadQuery';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import { pushAddToCartHeap } from '../../utils/heapHelpers';
import PartnershipLogoHeader from '../PartnershipLogoHeader';
import WishlistToggle from './WishlistToggle';
import {
  GetPdpContent as IGetPdpContentQuery,
  GetPdpContent_pdpContent_banners as IPdpBanner,
  GetPdpContent_pdpContent_content_questionAnswers,
} from '../../../generated/GetPdpContent';
import {
  buildAccordionItems,
  filterBannersBySlug,
  parseQuoteParams,
  removeImacaColoursDuplications,
} from './helpers';
import { Nullable } from '../../types/common';
import { useDeletePersonEmailMutation } from '../../gql/storedPersonEmail';
import { useSaveQuoteMutation } from '../../gql/storedQuote';
import { PdpBanners } from '../../models/enum/PdpBanners';
import FreeInsuranceBanner from './FreeInsuranceBanner';
import { useDeleteStoredPersonMutation } from '../../gql/storedPerson';
import { isUserAuthenticated } from '../../utils/authentication';
import { IOptionsList } from '../../types/detailsPage';

const Flame = dynamic(() => import('core/assets/icons/Flame'));
const DownloadSharp = dynamic(() => import('core/assets/icons/DownloadSharp'));
const Rating = dynamic(() => import('core/atoms/rating'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});
const LeaseScanner = dynamic(() => import('core/organisms/lease-scanner'), {
  loading: () => <Skeleton count={3} />,
});
const FreeHomeCharger = dynamic(() =>
  import('core/assets/icons/FreeHomeCharger'),
);
const CardLabel = dynamic(() => import('core/molecules/cards/CardLabel'));
const FreeInsuranceCardLabelIcon = dynamic(() =>
  import('core/assets/icons/FreeInsuranceCardLabelIcon'),
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
const Banners = dynamic(() => import('./Banners'));
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
  capsId?: string[];
  cars?: boolean;
  vans?: boolean;
  pickups?: boolean;
  data?: GetVehicleDetails;
  quote?: GetQuoteDetails;
  schema?: any;
  genericPageHead: GenericPageHeadQuery | undefined;
  genericPages: IGenericPages['items'];
  productCard: GetProductCard | null;
  leaseTypeQuery?: LeaseTypeEnum | null;
  pdpContent: IGetPdpContentQuery | null;
  imacaAssets: IImacaAssets | null;
  colourData: Nullable<IOptionsList[]>;
  trimData: Nullable<IOptionsList[]>;
  dataUiTestId?: string;
}

const DetailsPage: React.FC<IDetailsPageProps> = ({
  capId,
  capsId,
  cars,
  vans,
  pickups,
  data,
  quote,
  schema,
  genericPageHead,
  genericPages,
  trimData,
  colourData,
  productCard,
  leaseTypeQuery,
  pdpContent: pdpContentData,
  imacaAssets,
  dataUiTestId,
}) => {
  const router = useRouter();
  const isMobile = useMobileViewport();

  const migratedManufacturers = useContext(ManufacturersSlugContext);

  const pdpContentRef = React.useRef<HTMLDivElement>(null);
  const leaseScannerRef = React.useRef<HTMLDivElement>(null);
  // pass cars prop(Boolean)
  const { cachedLeaseType, setCachedLeaseType } = useLeaseType(cars);
  const [leaseType, setLeaseType] = useState<LeaseTypeEnum>(
    leaseTypeQuery ?? cachedLeaseType,
  );
  const [colour, setColour] = useState<Nullable<number>>(
    parseQuoteParams(quote?.quoteByCapId?.colour),
  );
  const [leadTime, setLeadTime] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAgreeInsuranceRules, setIsAgreeInsuranceRules] = useState(false);
  const [orderInputObject, setOrderInputObject] = useState<OrderInputObject>();
  const [isPlayingLeaseAnimation, setIsPlayingLeaseAnimation] = useState(false);
  const [firstTimePushDataLayer, setFirstTimePushDataLayer] = useState(true);
  const [isFixedLeaseScanner, setIsFixedLeaseScanner] = useState<boolean>(
    false,
  );
  const [mileage, setMileage] = useState<Nullable<number>>(
    quote?.quoteByCapId?.mileage || null,
  );

  const resultImacaAssets = useMemo(() => {
    const imacaColourList = imacaAssets?.colours
      ? removeImacaColoursDuplications(imacaAssets.colours)
      : null;

    return imacaAssets ? { ...imacaAssets, colours: imacaColourList } : null;
  }, [imacaAssets]);

  const scrollHeight = () => {
    if (isBrowser() && pdpContentRef.current) {
      const pdpContentHeight = pdpContentRef.current!.scrollHeight;
      const customerAlsoViewHeight =
        !!productCard || !!capsId?.length ? 700 : 0;
      return pdpContentHeight + customerAlsoViewHeight - window.innerHeight;
    }
    return 0;
  };

  const scrollChange = () => {
    if (isMobile) {
      setIsFixedLeaseScanner(() => (window?.pageYOffset || 0) < scrollHeight());
    }
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isMobile) {
      window.addEventListener('scroll', scrollChange);
      leaseScannerRef.current?.classList.remove('-fixed');
      timerId = setTimeout(() => {
        leaseScannerRef.current?.classList.add('-fixed');
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
      window.removeEventListener('scroll', scrollChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const accordionQAData = useMemo(
    () =>
      buildAccordionItems(
        (pdpContentData?.pdpContent?.content?.[0]
          ?.questionAnswers as GetPdpContent_pdpContent_content_questionAnswers[]) ||
          [],
      ),
    [pdpContentData],
  );

  useEffect(() => {
    setCachedLeaseType(leaseType);
  }, [leaseType, setCachedLeaseType]);

  const [leaseScannerData, setLeaseScannerData] = useState<
    Nullable<ILeaseScannerData>
  >(null);

  const price = leaseScannerData?.quoteByCapId?.leaseCost?.monthlyRental;
  const vehicleValue = useMemo(() => data?.vehicleDetails?.vehicleValue, [
    data,
  ]);

  useEffect(() => {
    setSessionStorage('vehicleValue', vehicleValue);
  }, [vehicleValue]);

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
      vehicleValue,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capId, cars, data, price, pickups, vans, mileage]);

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
    let timerId: NodeJS.Timeout;

    if (price && !firstTimePushDataLayer) {
      onPushPDPDataLayer();
    }
    if (isMobile) {
      leaseScannerRef.current!.style.display = 'flex';
      timerId = setTimeout(() => {
        leaseScannerRef.current!.style.removeProperty('display');
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [price]);

  const vehicleDetails = data?.vehicleDetails;
  const standardEquipment = data?.standardEquipment;

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
        (cars
          ? migratedManufacturers?.vehicles?.car?.manufacturers
          : migratedManufacturers?.vehicles?.lcv?.manufacturers) || [],
      )
    );
  }, [cars, data, genericPageHead, genericPages, migratedManufacturers]);

  const isInsurance = useMemo(() => data?.vehicleDetails?.freeInsurance, [
    data,
  ]);

  const isCar = useMemo(
    () => quote?.quoteByCapId?.vehicleType === VehicleTypeEnum.CAR,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const isFreeInsurance = useMemo(() => isInsurance && isCar, [
    isCar,
    isInsurance,
  ]);

  const isElectric = useMemo(
    () => data?.derivativeInfo?.fuelType?.name === 'Electric',
    [data?.derivativeInfo?.fuelType?.name],
  );

  const vehicleImages = useMemo(
    () =>
      (data?.vehicleImages?.length &&
        ((data?.vehicleImages as GetVehicleDetails_vehicleImages[])[0]
          .imageUrls as string[])) ||
      [],
    [data?.vehicleImages],
  );

  const [saveOrderMutation] = useSaveOrderMutation();
  const [deletePersonEmailMutation] = useDeletePersonEmailMutation();
  const [deleteStoredPersonMutation] = useDeleteStoredPersonMutation();
  const [saveQuoteMutation] = useSaveQuoteMutation();
  const [deletePersonUuid] = useDeletePersonUuidMutation();

  const isPersonLoggedIn = isUserAuthenticated();

  const bannerList = useMemo(() => {
    const banners = pdpContentData?.pdpContent?.banners ?? [];

    return !isFreeInsurance
      ? filterBannersBySlug(banners, PdpBanners.freeInsurance)
      : banners;
  }, [isFreeInsurance, pdpContentData?.pdpContent?.banners]);
  const shouldBannersRender = !!bannerList.length;

  const onOrderStart = (
    withInsurance = false,
    orderObject = orderInputObject,
  ) => {
    const derivativeInfo = data?.derivativeInfo;
    const vehicleConfigurationByCapId = data?.vehicleConfigurationByCapId;
    const values: OrderInputObject = {
      ...orderObject,
    } as OrderInputObject;
    const vehicleProduct = values.lineItems?.[0].vehicleProduct;
    if (vehicleProduct) {
      vehicleProduct.freeInsurance = {
        optIn: withInsurance,
        eligible: isAgreeInsuranceRules,
      };
    }

    setIsModalVisible(false);

    return Promise.all([
      saveOrderMutation({
        variables: {
          order: values,
          rating: vehicleDetails?.averageRating || 0,
        },
      }),
      saveQuoteMutation({
        variables: {
          quote: leaseScannerData?.quoteByCapId,
        },
      }),
    ])
      .then(() => {
        const onDeleteStoredPerson = !isPersonLoggedIn
          ? deleteStoredPersonMutation().then(() => {})
          : Promise.resolve();
        return Promise.all([
          deletePersonEmailMutation(),
          deletePersonUuid(),
          onDeleteStoredPerson,
        ]);
      })
      .then(() => {
        let url =
          leaseType === LeaseTypeEnum.PERSONAL
            ? '/olaf/about'
            : '/b2b/olaf/about';

        if (Cookies.get('DIG-6240') === '1') {
          url = '/checkout';
        }

        return router.push(url, url).then(() => {
          setTimeout(() => {
            pushAddToCartHeap(vehicleProduct);
            pushAddToCartDataLayer({
              capId,
              derivativeInfo,
              leaseScannerData,
              values,
              vehicleConfigurationByCapId,
              price,
              category: getCategory({ cars, vans, pickups }),
              vehicleValue,
            });
          }, 200);
        });
      });
  };

  const onSubmitClick = (values: OrderInputObject) => {
    setOrderInputObject(values);
    if (isFreeInsurance) {
      setIsModalVisible(true);
      return;
    }
    onOrderStart(false, values);
  };

  const derivativeInfo = data?.derivativeInfo;
  const leaseAdjustParams = data?.leaseAdjustParams;
  const vehicleConfigurationByCapId = data?.vehicleConfigurationByCapId;
  const independentReview = data?.vehicleDetails?.independentReview;
  const warrantyDetails = data?.vehicleDetails?.warrantyDetails;

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

  if (process.env.ENV !== 'prod') {
    // eslint-disable-next-line no-console
    console.log('CAP Id:', capId);
  }

  const onSubmitClickMobile = () => {
    const colourDescription =
      getOptionFromList(colourData, leaseScannerData?.quoteByCapId?.colour)
        ?.label ?? '';

    const trimDescription =
      getOptionFromList(trimData, leaseScannerData?.quoteByCapId?.trim)
        ?.label ?? '';

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
            stockBatchId: leaseScannerData?.quoteByCapId?.stockBatchId,
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
      vehicleValue,
    });
  };

  return (
    <>
      <NextHead>
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{ __html: decode(css) }} />
      </NextHead>

      <div className="pdp--promo">
        <PartnershipLogoHeader />
        {isFreeInsurance && <FreeInsuranceBanner />}
      </div>
      <div className="pdp--content" ref={pdpContentRef}>
        {breadcrumbItems && (
          <div className="row:title">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        )}
        <h1
          className="pdp--content__heading -mt-200"
          data-uitestid={
            dataUiTestId ? `${dataUiTestId}_page-title` : undefined
          }
        >
          <Heading tag="span" size="xlarge" color="black">
            {pageTitle}
          </Heading>
          <Text size="lead" className="-regular">
            {vehicleConfigurationByCapId?.capDerivativeDescription}
          </Text>
        </h1>
        <div className="pdp--content-details -mt-300">
          <div className="pdp--wishlist">
            <WishlistToggle productDetails={data} />
          </div>
          <a
            className="pdp--rating"
            href={reviews?.length ? '#reviews' : undefined}
          >
            <Rating size="regular" score={vehicleDetails?.averageRating ?? 0} />
          </a>
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
          isCar={isCar}
          imacaAssets={resultImacaAssets}
          showInsuranceBanner={isFreeInsurance}
          showElectricBanner={isElectric}
          images={vehicleImages}
          videoSrc={video}
          threeSixtyVideoSrc={threeSixtyVideo}
          videoIframe
          imageAltText={metaTitle}
          className="pdp--media-gallery"
          colour={colour}
          setColour={setColour}
        />
        {(isElectric || isFreeInsurance) && (
          <div className="extras pdp">
            {isElectric && (
              <CardLabel
                text={
                  <div>
                    Free Home charger*
                    <span>Worth £1049 + FREE installation.</span>
                    <RouterLink
                      link={{
                        href:
                          '/legal/terms-and-conditions/free-home-charge-points-terms',
                        label: '',
                      }}
                      classNames={{ color: 'teal', size: 'small' }}
                    >
                      *T&Cs apply
                    </RouterLink>
                  </div>
                }
                icon={<FreeHomeCharger />}
              />
            )}
            {isFreeInsurance && (
              <CardLabel
                text={
                  <div>
                    1yr Free Insurance*
                    <span>Worth average £538.</span>
                    <RouterLink
                      link={{
                        href: '/legal/terms-and-conditions',
                        label: '',
                      }}
                      classNames={{ color: 'teal', size: 'small' }}
                    >
                      *T&Cs apply
                    </RouterLink>
                  </div>
                }
                icon={<FreeInsuranceCardLabelIcon />}
              />
            )}
          </div>
        )}
        <VehicleTechDetails
          vehicleDetails={vehicleDetails}
          derivativeInfo={derivativeInfo}
          standardEquipment={standardEquipment}
        />
        <section className="trustpilot row:trustpilot">
          <TrustPilot />
        </section>
        {shouldBannersRender && (
          <LazyLoadComponent
            visibleByDefault={isServerRenderOrAppleDevice}
            placeholder={<span className="-d-block -h-300" />}
          >
            <Banners cards={bannerList as IPdpBanner[]} />
          </LazyLoadComponent>
        )}

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
        {(vans || pickups) && !!independentReview && (
          <LazyLoadComponent
            visibleByDefault={isServerRenderOrAppleDevice}
            placeholder={<span className="-d-block -h-400" />}
          >
            <IndependentReview review={independentReview || ''} />
          </LazyLoadComponent>
        )}
        {isMobile && (
          <CustomiseLeaseContainer
            dataUiTestId={`${dataUiTestId}_customise-lease`}
            quote={quote}
            capId={capId}
            isShowFreeInsuranceMerch={isFreeInsurance!}
            isShowFreeHomeChargerMerch={isElectric}
            onCompletedCallBack={onCompletedCallBack}
            vehicleType={vehicleType}
            derivativeInfo={derivativeInfo}
            leaseAdjustParams={leaseAdjustParams}
            leaseType={leaseType}
            setLeaseType={setLeaseType}
            trimData={trimData}
            colourData={colourData}
            setLeadTime={setLeadTime}
            isPlayingLeaseAnimation={isPlayingLeaseAnimation}
            setIsPlayingLeaseAnimation={setIsPlayingLeaseAnimation}
            setLeaseScannerData={setLeaseScannerData}
            onCompleted={values => onSubmitClick(values)}
            mileage={mileage}
            setMileage={setMileage}
            colour={colour}
            setColour={setColour}
            pickups={pickups}
            roadsideAssistance={vehicleDetails?.roadsideAssistance}
            warrantyDetails={warrantyDetails}
          />
        )}
        <WhyChooseLeasing warrantyDetails={warrantyDetails} />
        {!!accordionQAData.length && (
          <WhyChooseVanarama
            accordionsData={accordionQAData}
            title={pdpContentData?.pdpContent?.content?.[0]?.title || ''}
          />
        )}
        <section className="pdp--reviews" id="reviews">
          <LazyLoadComponent
            visibleByDefault={isServerRenderOrAppleDevice}
            placeholder={<span className="-d-block -h-300" />}
          >
            <CustomerReviews
              reviews={reviews ?? []}
              title="Customer Reviews"
              sliderClassName="customer-reviews"
              headingClassName="-mb-200"
            />
          </LazyLoadComponent>
        </section>
        <LazyLoadComponent
          visibleByDefault={isServerRenderOrAppleDevice}
          placeholder={<span className="-d-block -h-300" />}
        >
          <FrequentlyAskedQuestions
            rangeFAQ={rangeFAQs || []}
            rangeFAQTitle={pageTitle}
          />
        </LazyLoadComponent>
      </div>
      {!isMobile && (
        <CustomiseLeaseContainer
          dataUiTestId={`${dataUiTestId}_customise-lease`}
          quote={quote}
          capId={capId}
          isShowFreeInsuranceMerch={isFreeInsurance!}
          isShowFreeHomeChargerMerch={isElectric}
          vehicleType={vehicleType}
          derivativeInfo={derivativeInfo}
          leaseAdjustParams={leaseAdjustParams}
          leaseType={leaseType}
          trimData={trimData}
          colourData={colourData}
          setLeaseType={setLeaseType}
          setLeadTime={setLeadTime}
          isPlayingLeaseAnimation={isPlayingLeaseAnimation}
          setIsPlayingLeaseAnimation={setIsPlayingLeaseAnimation}
          setLeaseScannerData={setLeaseScannerData}
          onCompletedCallBack={onCompletedCallBack}
          onCompleted={values => onSubmitClick(values)}
          mileage={mileage}
          setMileage={setMileage}
          colour={colour}
          setColour={setColour}
          pickups={pickups}
          roadsideAssistance={vehicleDetails?.roadsideAssistance}
          warrantyDetails={warrantyDetails}
        />
      )}
      {(!!productCard || !!capsId?.length) && (
        <LazyLoadComponent
          visibleByDefault={isServerRenderOrAppleDevice}
          placeholder={<span className="-d-block -h-600" />}
        >
          <CustomerAlsoViewedContainer
            initProductCard={productCard}
            capsId={capsId || []}
            vehicleType={vehicleType}
            leaseType={leaseType.toUpperCase() || ''}
            lazyLoadForCarouselImages
          />
        </LazyLoadComponent>
      )}
      {isMobile && (
        <div
          className={cx('lease-scanner--sticky-wrap', {
            '-fixed': isFixedLeaseScanner,
          })}
          ref={leaseScannerRef}
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
                  )} Vanarama Service Plan`
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
            startLoading={isPlayingLeaseAnimation}
            endAnimation={() => {
              setIsPlayingLeaseAnimation(false);
              leaseScannerData?.endAnimation();
            }}
            requestCallBack={() => {
              leaseScannerData?.requestCallBack();
            }}
          />
        </div>
      )}
      {isModalVisible && (
        <InsuranceModal
          setIsModalVisible={setIsModalVisible}
          isAgreeInsuranceRules={isAgreeInsuranceRules}
          setIsAgreeInsuranceRules={setIsAgreeInsuranceRules}
          onContinueWithInsurance={() => onOrderStart(true)}
          onContinueWithoutInsurance={() => onOrderStart(false)}
          isBusinessLease={leaseType === LeaseTypeEnum.BUSINESS}
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
