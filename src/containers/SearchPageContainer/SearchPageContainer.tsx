/*
  The first route param renamed to dynamicParam.
  Because this route can be any filter value: make, bodystyle, transmission, fuel type.
  We define type of this params before page rendering in root page container,
  this query param should be using only with page type context for prevent any issues with it
*/
import { FC, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import SchemaJSON from 'core/atoms/schema-json';
import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ButtonBottomToTop from 'core/atoms/button-bottom-to-top/ButtonBottomToTop';
import {
  findPreselectFilterValue,
  tagArrayBuilderHelper,
} from '../FiltersContainer/helpers';
import useSortOrder from '../../hooks/useSortOrder';
import { useProductCardDataLazyQuery } from '../CustomerAlsoViewedContainer/gql';
import { IFilters } from '../FiltersContainer/interfaces';
import { getRangesList, useManufacturerList, useVehiclesList } from './gql';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  SortObject,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import {
  buildRewriteRoute,
  dynamicQueryTypeCheck,
  fuelMapper,
  getCapsIds,
  getNumberOfVehicles,
  isPreviousPage,
  RESULTS_PER_REQUEST,
  sortObjectGenerator,
  sortValues,
  ssrCMSQueryExecutor,
  NEW_RANGE_SLUGS,
  scrollIntoPreviousView,
  createInitialFiltersState,
  getValueFromStorage,
  createProductCacheVariables,
  createProductCardVariables,
  createManufacturerListVariables,
  createRangesVariables,
  createVehiclesVariables,
  createInitialVehiclesVariables,
  getNumberOfVehiclesFromSessionStorage,
  bodyUrlsSlugMapper,
  getPartnershipDescription,
  getPartnershipTitle,
} from './helpers';
import { GetProductCard_productCard as IProductCard } from '../../../generated/GetProductCard';
import TopInfoBlock from './sections/TopInfoBlock';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_carousel as CarouselData,
  GenericPageQuery_genericPage_sections_tiles as Tiles,
} from '../../../generated/GenericPageQuery';
import useLeaseType from '../../hooks/useLeaseType';
import { getSectionsData } from '../../utils/getSectionsData';
import { rangeList } from '../../../generated/rangeList';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';
import { manufacturerList } from '../../../generated/manufacturerList';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import TopOffersContainer from './sections/TopOffersContainer'; // Note: Dynamic import this, will break search filter bar.
import useMediaQuery from '../../hooks/useMediaQuery';
import ResultsContainer from './sections/ResultsContainer';
import ReadMoreBlock from './sections/ReadMoreBlock';
import SortOrder from '../../components/SortOrder';
import SearchPageFilters from '../../components/SearchPageFilters';
import PartnershipLogoHeader from '../PartnershipLogoHeader';
import { globalColors } from '../../utils/colors';
import { isBrowser, isServerRenderOrAppleDevice } from '../../utils/deviceType';
import { getPartnerProperties } from '../../utils/partnerProperties';
import { TColor } from '../../types/color';
import {
  getObjectFromSessionStorage,
  removeSessionStorageItem,
} from '../../utils/windowSessionStorage';
import NewRangeContent from './sections/NewRangeContent';
import { ISearchPageContainerProps } from './interfaces';
import TopCategoryInfoBlock from './sections/TopCategoryInfoBlock';
import SearchPageTitle from './sections/SearchPageTitle';
import SearchPageMarkdown from './components/SearchPageMarkdown';
import WhyLeaseWithVanaramaTiles from '../../components/WhyLeaseWithVanaramaTiles';
import RelatedCarousel from '../../components/RelatedCarousel';
import TermsAndConditions from './sections/TermsAndConditions';
import FeaturedSectionBlock from './sections/FeaturedSectionBlock';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Checkbox = dynamic(() => import('core/atoms/checkbox'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});

const FiltersContainer = dynamic(() => import('../FiltersContainer'), {
  loading: () => <Skeleton count={2} />,
  ssr: true,
});

const SearchPageContainer: FC<ISearchPageContainerProps> = ({
  isServer,
  isCarSearch = false,
  isSimpleSearchPage,
  isManufacturerPage,
  isSpecialOfferPage,
  isPickups,
  isRangePage,
  isModelPage,
  isAllManufacturersPage,
  isBodyStylePage,
  isTransmissionPage,
  isFuelPage,
  isBudgetPage,
  isEvPage,
  pageData: pageDataSSR,
  metaData: metaDataSSR,
  topInfoSection,
  preLoadFiltersData,
  preLoadVehiclesList,
  preloadBodyStyleList,
  preLoadProductCardsData,
  preLoadResponseCapIds,
  preLoadRanges,
  rangesUrls,
  manufacturersUrls,
  preLoadManufacturers,
  preloadManufacturer,
  preloadRange,
  preLoadTopOffersList,
  preLoadTopOffersCardsData,
  defaultSort,
  newRangePageSlug,
  dataUiTestId,
}) => {
  // assign here as when inline causing hook lint errors

  const { cachedLeaseType, setCachedLeaseType } = useLeaseType(isCarSearch);
  const [isPersonal, setIsPersonal] = useState(
    cachedLeaseType === LeaseTypeEnum.PERSONAL,
  );
  const [isPartnershipActive, setPartnershipActive] = useState<boolean>(false);
  const applyColumns = !isEvPage ? '-columns' : '';
  const initialFiltersState = useMemo(
    () =>
      createInitialFiltersState(
        (isPartnershipActive && getPartnerProperties()?.fuelTypes) || [],
      ),
    [isPartnershipActive],
  );

  const client = useApolloClient();
  const router = useRouter();
  const isNewPage =
    !!newRangePageSlug && NEW_RANGE_SLUGS.includes(newRangePageSlug);
  const isDynamicFilterPage = useMemo(
    () => isBodyStylePage || isFuelPage || isTransmissionPage || isBudgetPage,
    [isBodyStylePage, isFuelPage, isTransmissionPage, isBudgetPage],
  );

  const [isSpecialOffers, setIsSpecialOffers] = useState(
    isSpecialOfferPage
      ? true
      : getValueFromStorage(isServer, isCarSearch) ?? false,
  );

  const isDesktopOrTablet = useMediaQuery('(min-width: 768px)');

  const [pageData, setPageData] = useState(pageDataSSR);
  const [metaData, setMetaData] = useState(metaDataSSR);
  const [shouldUpdateTopOffers, setShouldUpdateTopOffers] = useState(false);
  const [shouldUpdateCache, setShouldUpdateCache] = useState(
    preLoadVehiclesList?.vehicleList?.pageInfo?.hasNextPage ?? true,
  );

  const [vehiclesList, setVehicleList] = useState(
    preLoadVehiclesList?.vehicleList.edges || ([] as any),
  );
  const [ranges, setRanges] = useState(preLoadRanges || ({} as rangeList));
  const [manufacturers, setManufacturers] = useState(
    preLoadManufacturers || ({} as manufacturerList),
  );

  const [capIds, setCapsIds] = useState(
    preLoadResponseCapIds || ([] as string[]),
  );
  const [cardsDataCache, setCardsDataCache] = useState(
    [] as (IProductCard | null)[],
  );
  const [cardsData, setCardsData] = useState(
    preLoadProductCardsData?.productCard || ([] as (IProductCard | null)[]),
  );
  const [lastCard, setLastCard] = useState(
    preLoadVehiclesList?.vehicleList.pageInfo.endCursor || '',
  );

  const [hasNextPage, setHasNextPage] = useState(
    preLoadVehiclesList?.vehicleList?.pageInfo.hasNextPage ?? true,
  );

  const [totalCount, setTotalCount] = useState(
    isManufacturerPage
      ? preLoadRanges?.rangeList?.length || 0
      : preLoadVehiclesList?.vehicleList?.totalCount || 0,
  );

  const { savedSortOrder, saveSortOrder } = useSortOrder(defaultSort);
  const [sortOrder, setSortOrder] = useState(savedSortOrder);
  const [isSpecialOffersOrder, setIsSpecialOffersOrder] = useState(true);
  const [filtersData, setFiltersData] = useState<IFilters>({} as IFilters);
  const [pageOffset, setPageOffset] = useState(0);

  const [customCTAColor, setCustomCTAColor] = useState<string | undefined>();
  const [customTextColor, setCustomTextColor] = useState<TColor | string>();
  const [pageTitle, setTitle] = useState<string>(metaData?.name || '');
  const [partnershipDescription, setPartnershipDescription] = useState<string>(
    '',
  );

  const [prevPosition, setPrevPosition] = useState(0);

  useEffect(() => {
    scrollIntoPreviousView(pageOffset, prevPosition, setPrevPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageOffset]);

  useEffect(() => {
    setCachedLeaseType(
      isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    );
  }, [isPersonal, setCachedLeaseType]);

  useEffect(() => {
    const partnerActive = getPartnerProperties();

    if (partnerActive) {
      setCustomCTAColor(partnerActive.color);
      setCustomTextColor(globalColors.white);
      setPartnershipDescription(
        getPartnershipDescription(partnerActive, isCarSearch, isPickups),
      );
      setTitle(getPartnershipTitle(partnerActive, isCarSearch, isPickups));
    }
  }, [isCarSearch, isPickups]);

  // when we change page with one dynamic route by Next router(like from car-leasing/coupe to car-leasing/saloon)
  // Next doesn't call a ssr requests, this workaround should call request for page data on client side
  useEffect(() => {
    if (router.query.isChangePage === 'true') {
      const fetchPageData = async () => {
        const type = Object.entries(
          dynamicQueryTypeCheck(router.query.dynamicParam as string),
        ).find(element => element[1])?.[0];
        const context = {
          req: {
            url: router.route.replace(
              '[dynamicParam]',
              router.query.dynamicParam as string,
            ),
          },
          query: { ...router.query },
        };
        const { data, errors } = (await ssrCMSQueryExecutor(
          client,
          context,
          false,
          type as string,
        )) as ApolloQueryResult<GenericPageQuery>;
        if (data && !errors?.[0]) {
          setPageData(data);
          setMetaData(data.genericPage.metaData);
          setLastCard('');
          if (isManufacturerPage || isDynamicFilterPage) {
            setShouldUpdateTopOffers(true);
          }
        }
      };
      fetchPageData();
    }
  }, [router, router.query, client, isManufacturerPage, isDynamicFilterPage]);

  const [getProductCardData, { loading }] = useProductCardDataLazyQuery(
    capIds,
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    data => {
      setCardsData(data?.productCard || []);
      if (prevPosition) {
        setPageOffset(prevPosition);
      }
    },
  );
  const [getProductCacheCardData] = useProductCardDataLazyQuery(
    capIds,
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    data => {
      setCardsDataCache(data?.productCard || []);
    },
  );

  const manualBodyStyle = useMemo(() => {
    if (isPickups) {
      return ['Pickup'];
    }
    if (isModelPage) {
      return [
        bodyUrlsSlugMapper[
          router.query.bodyStyles as keyof typeof bodyUrlsSlugMapper
        ] ?? router.query.bodyStyles,
      ];
    }

    if (isBodyStylePage) {
      const bodyStyle = (router.query?.dynamicParam as string)
        .replace('-leasing', '')
        .replace('-', ' ');
      // city-car is only one style with '-' we shouldn't to replace it
      return [
        bodyStyle.toLowerCase() === 'city-car'
          ? findPreselectFilterValue(bodyStyle, preLoadFiltersData?.bodyStyles)
          : findPreselectFilterValue(
              bodyStyle.replace('-', ' '),
              preLoadFiltersData?.bodyStyles,
            ),
      ];
    }
    return [''];
  }, [
    isPickups,
    isModelPage,
    router.query,
    isBodyStylePage,
    preLoadFiltersData,
  ]);

  // listen for any updates to metaDataSSR
  useEffect(() => {
    setMetaData(metaDataSSR);
    setPageData(pageDataSSR);
  }, [metaDataSSR, pageDataSSR]);

  // Make list query for all makes page
  const [
    getManufacturerList,
    { data: manufacturersData },
  ] = useManufacturerList(
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
  );

  // Ranges list query for manufacturer page
  const [getRanges, { data: rangesData }] = getRangesList(
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    router.query?.dynamicParam as string,
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
  );
  // using onCompleted callback for request card data after vehicle list was loaded
  const [getVehicles, { data, fetchMore, called }] = useVehiclesList(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    isManufacturerPage || isDynamicFilterPage || isSpecialOfferPage
      ? true
      : isSpecialOffers || null,
    async vehiclesData => {
      let vehicles = vehiclesData;
      const savedPageData = getObjectFromSessionStorage('searchPageScrollData');
      // backend don't return more than 24 results per one request, so we need to use recursion for get all results
      async function fetchMoreRec() {
        const edges = vehicles?.vehicleList?.edges || [];
        const lastCursor = edges[edges.length - 1]?.cursor;
        if (
          savedPageData?.offerPosition >
            (vehicles?.vehicleList?.edges?.length || 0) &&
          fetchMore
        ) {
          await fetchMore?.({
            variables: {
              after: lastCursor,
              first: getNumberOfVehicles(
                savedPageData?.offerPosition + 1 - edges.length,
              ),
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
              }
              vehicles = {
                vehicleList: {
                  pageInfo: fetchMoreResult.vehicleList.pageInfo,
                  totalCount: fetchMoreResult.vehicleList.totalCount,
                  edges: [
                    ...(vehicles.vehicleList.edges || []),
                    ...(fetchMoreResult?.vehicleList?.edges || []),
                  ],
                },
              };
              return vehicles;
            },
          });
          await fetchMoreRec();
        }
      }
      if (isPreviousPage(router.query)) {
        await fetchMoreRec();
        setPrevPosition(savedPageData.scrollPosition);
        removeSessionStorageItem('searchPageScrollData');
      }
      try {
        if (vehicles.vehicleList?.edges?.length === 0 && isSpecialOffers) {
          setIsSpecialOffers(false);
          return;
        }
        const responseCapIds = getCapsIds(vehicles.vehicleList?.edges || []);
        setCapsIds(responseCapIds);
        if (responseCapIds.length) {
          setVehicleList(vehicles.vehicleList?.edges || []);
          // use range length for manufacture page
          if (!isManufacturerPage && !isAllManufacturersPage) {
            setTotalCount(vehicles.vehicleList.totalCount);
          }
          getProductCardData(
            createProductCacheVariables(responseCapIds, isCarSearch),
          );
          setLastCard(vehicles.vehicleList.pageInfo.endCursor || '');
          setShouldUpdateCache(
            vehicles.vehicleList.pageInfo.hasNextPage || false,
          );
          setHasNextPage(vehicles.vehicleList.pageInfo.hasNextPage || false);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error:', e);
      }
    },
    RESULTS_PER_REQUEST,
    undefined,
    isPickups || isModelPage || isBodyStylePage ? manualBodyStyle : [],
  );

  // API call after load new pages
  useEffect(() => {
    // prevent request with empty filters
    const queryLength = Object.keys(router?.query || {})?.length;
    // if it's simple search page with presave special offers param made new request for actual params
    if (
      !queryLength &&
      getValueFromStorage(false, isCarSearch) &&
      !isAllManufacturersPage &&
      !isSpecialOfferPage &&
      !isDynamicFilterPage &&
      !isRangePage &&
      !isBodyStylePage
    ) {
      // load vehicles
      getVehicles();
    }
    // disabled lint because we can't add router to deps
    // it's change every url replace
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getVehicles,
    isCarSearch,
    isManufacturerPage,
    getRanges,
    isSpecialOfferPage,
  ]);

  // prevent case when we navigate use back/forward button and useCallback return empty result list
  useEffect(() => {
    if (data && !cardsData.length && loading) {
      getProductCardData(
        createProductCardVariables(data.vehicleList.edges, isCarSearch),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // new search with new filters
  const onSearch = (filtersObject?: IFilters) => {
    const filters = filtersObject || filtersData;
    if (isManufacturerPage) {
      const filtersForRanges = {
        ...filters,
        manufacturerSlug: router.query?.dynamicParam as string,
      };
      getRanges(
        createRangesVariables(filtersForRanges, isCarSearch, isPersonal),
      );
      // call only manufacturer list query call after select new filter
    } else if (isAllManufacturersPage) {
      getManufacturerList(
        createManufacturerListVariables(isCarSearch, isPersonal, filters),
      );
    } else {
      let onOffer;
      // set onOffer value to actual depend on page type
      if (isRangePage || isModelPage || isDynamicFilterPage) {
        onOffer = null;
      } else {
        onOffer = isSpecialOfferPage ? true : isSpecialOffers || null;
      }
      let fuelTypes;
      if (isFuelPage) {
        fuelTypes = (fuelMapper[
          router.query.dynamicParam as keyof typeof fuelMapper
        ] as string).split(',');
      } else if (filters?.fuelTypes?.length > 0) {
        fuelTypes = filters.fuelTypes;
      } else {
        fuelTypes = getPartnerProperties()?.fuelTypes;
      }
      getVehicles(
        createVehiclesVariables({
          isCarSearch,
          isPersonal,
          isSpecialOffersOrder,
          isManualBodyStyle: isPickups || isModelPage || isBodyStylePage,
          isTransmissionPage,
          onOffer: onOffer ?? null,
          filters,
          query: router.query,
          sortOrder: sortOrder as SortObject[],
          manualBodyStyle,
          fuelTypes,
        }),
      );
    }
    if (filtersObject) {
      let pathname = router.route
        .replace('[dynamicParam]', router.query?.dynamicParam as string)
        .replace('[rangeName]', router.query?.rangeName as string)
        .replace('[bodyStyles]', router.query?.bodyStyles as string);
      const queryString = new URLSearchParams();
      const query = buildRewriteRoute(filters as IFilters);
      Object.entries(query).forEach(filter => {
        const [key, value] = filter as [string, string | string[]];
        if (
          value?.length &&
          // don't add queries in page where we have same data in route
          !(
            (isManufacturerPage || isRangePage) &&
            (key === 'make' || key === 'rangeName')
          ) &&
          !(isBodyStylePage && key === 'bodyStyles') &&
          !((isFuelPage || isPartnershipActive) && key === 'fuelTypes') &&
          !(isTransmissionPage && key === 'transmissions') &&
          !(isBudgetPage && key === 'pricePerMonth') &&
          !(
            isModelPage &&
            (key === 'make' || key === 'rangeName' || key === 'bodyStyles')
          )
        ) {
          queryString.set(key, value as string);
        }
      });
      if (Object.keys(query).length) {
        pathname += `?${decodeURIComponent(queryString.toString())}`;
      }
      // changing url dynamically
      router.replace(
        {
          pathname: router.route,
          query,
        },
        pathname,
        { shallow: true },
      );
      // set search filters data
      setFiltersData(filters);
    }
  };

  useFirstRenderEffect(() => {
    onSearch();
    setLastCard('');
  }, [sortOrder]);

  useFirstRenderEffect(() => {
    onSearch();
  }, [isPersonal]);

  // using for scroll page to top only for page mount
  useEffect(() => {
    if (window) {
      window.scrollTo(0, 0);
    }
    if (window && !isPreviousPage(router.query)) {
      removeSessionStorageItem('searchPageScrollData');
    }
    // can't add a window to deps, because it isn't exist in SSR
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // initial set ranges
  useEffect(() => {
    if (rangesData?.rangeList) {
      setTotalCount(rangesData.rangeList.length);
      setRanges(rangesData);
    }
  }, [rangesData, setTotalCount]);

  // initial set makes
  useEffect(() => {
    if (manufacturers?.manufacturerList && isAllManufacturersPage) {
      setTotalCount(manufacturers?.manufacturerList.length);
    }
  }, [manufacturers, setTotalCount, isAllManufacturersPage]);

  useEffect(() => {
    if (manufacturersData?.manufacturerList && isAllManufacturersPage) {
      setManufacturers(manufacturersData);
    }
  }, [manufacturersData, setManufacturers, isAllManufacturersPage]);

  // handler for changing sort dropdown
  const onChangeSortOrder = (value: string) => {
    const [type, direction] = value.split('_');
    setSortOrder(
      sortObjectGenerator([
        { field: type as SortField, direction: direction as SortDirection },
      ]),
    );
    saveSortOrder(
      sortObjectGenerator([
        { field: type as SortField, direction: direction as SortDirection },
      ]),
    );
    if (isSpecialOffersOrder) {
      setIsSpecialOffersOrder(false);
    }
  };

  /** save to sessions storage special offers status */
  const onSaveSpecialOffersStatus = (value: boolean) => {
    setIsSpecialOffers(value);
    sessionStorage.setItem(isCarSearch ? 'Car' : 'Vans', JSON.stringify(value));
  };

  const featured = useMemo(
    () => getSectionsData(['sections', 'featured'], pageData?.genericPage),
    [pageData],
  );
  const carousel: CarouselData = useMemo(
    () => getSectionsData(['sections', 'carousel'], pageData?.genericPage),
    [pageData],
  );
  const newCarousel: CarouselData = useMemo(
    () =>
      getSectionsData(
        ['sectionsAsArray', 'carousel', '0'],
        pageData?.genericPage,
      ),
    [pageData],
  );
  const tiles: Tiles = useMemo(
    () => getSectionsData(['sections', 'tiles'], pageData?.genericPage),
    [pageData],
  );

  const breadcrumbsItems = useMemo(
    () =>
      metaData?.breadcrumbs?.map((el: any) => ({
        link: { href: el.href || '', label: el.label },
      })),
    [metaData],
  );

  const fuelTypesData = useMemo(
    () =>
      filtersData?.fuelTypes?.length > 0
        ? filtersData?.fuelTypes
        : getPartnerProperties()?.fuelTypes,
    [filtersData],
  );
  // using for cache request
  const [getVehiclesCache, { data: cacheData }] = useVehiclesList(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    isRangePage ? null : isSpecialOffers || null,
    async vehicles => {
      try {
        const responseCapIds = getCapsIds(vehicles.vehicleList?.edges || []);
        setCapsIds(responseCapIds);
        if (responseCapIds.length) {
          // add cache variable
          return getProductCacheCardData(
            createProductCacheVariables(responseCapIds, isCarSearch),
          );
        }
        return false;
      } catch {
        return false;
      }
    },
    RESULTS_PER_REQUEST,
    lastCard,
    isPickups || isModelPage || isBodyStylePage ? manualBodyStyle : [],
  );

  // get vehicles to cache
  useEffect(() => {
    // don't make a request for cache in manufacture page
    if (
      lastCard &&
      !isManufacturerPage &&
      hasNextPage &&
      shouldUpdateCache &&
      ((isRangePage && filtersData.rangeSlug) ||
        (isDynamicFilterPage && Object.values(filtersData).flat().length > 0) ||
        (isModelPage && filtersData.rangeSlug) ||
        isSpecialOfferPage ||
        isSimpleSearchPage)
    ) {
      setShouldUpdateCache(false);
      const isOnOffer = !(isRangePage || isModelPage || isDynamicFilterPage)
        ? isSpecialOffers || null
        : null;

      if (isPreviousPage(router.query) && isBrowser() && !called) {
        getVehicles(
          createInitialVehiclesVariables({
            isCarSearch,
            isPersonal,
            isSpecialOffersOrder,
            onOffer: isOnOffer ?? null,
            first: getNumberOfVehiclesFromSessionStorage(),
            filters: filtersData,
            sortOrder: sortOrder as SortObject[],
            fuelTypes: fuelTypesData,
          }),
        );
        return;
      }
      getVehiclesCache(
        createInitialVehiclesVariables({
          isCarSearch,
          isPersonal,
          isSpecialOffersOrder,
          onOffer: isOnOffer ?? null,
          after: lastCard,
          filters: filtersData,
          sortOrder: sortOrder as SortObject[],
          fuelTypes: fuelTypesData,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    lastCard,
    getVehiclesCache,
    isCarSearch,
    isSpecialOffers,
    isManufacturerPage,
    shouldUpdateCache,
    hasNextPage,
    filtersData,
    isRangePage,
    isModelPage,
    isDynamicFilterPage,
    sortOrder,
    isSpecialOffersOrder,
    isPersonal,
    isSpecialOfferPage,
    isSimpleSearchPage,
  ]);

  // set capsIds for cached data
  useEffect(() => {
    if (cacheData?.vehicleList.edges?.length) {
      setCapsIds(
        cacheData.vehicleList?.edges?.map(
          vehicle => vehicle?.node?.derivativeId || '',
        ) || [],
      );
    }
  }, [cacheData, setCapsIds, isCarSearch]);

  useEffect(() => {
    const partnerActive = getPartnerProperties();
    setPartnershipActive(!!partnerActive);
  }, [isPartnershipActive]);

  // load more offers
  const onLoadMore = () => {
    setVehicleList([...vehiclesList, ...(cacheData?.vehicleList.edges || [])]);
    setCardsData(prevState => [...prevState, ...cardsDataCache]);
    // Chrome scroll down page after load new offers
    // using for prevent it
    setPageOffset(window.pageYOffset);
    if (vehiclesList.length < totalCount) {
      setLastCard(cacheData?.vehicleList.pageInfo.endCursor || '');
      setShouldUpdateCache(
        cacheData?.vehicleList.pageInfo.hasNextPage || false,
      );
    }
  };

  const tagArrayBuilder = (
    entry: [string, string[]],
    filtersContainerData: IFilterList,
  ) =>
    tagArrayBuilderHelper(entry, filtersContainerData, {
      isPartnershipActive,
      isBudgetPage,
      isManufacturerPage,
      isRangePage,
      isModelPage,
      isFuelPage,
      isTransmissionPage,
      isBodyStylePage,
    });

  const shouldRenderTopOffersContainer = useMemo(
    () =>
      isManufacturerPage ||
      isSpecialOfferPage ||
      isRangePage ||
      isDynamicFilterPage,
    [isManufacturerPage, isSpecialOfferPage, isRangePage, isDynamicFilterPage],
  );

  const shouldRenderCheckbox = useMemo(
    () =>
      !isManufacturerPage &&
      !isSpecialOfferPage &&
      !isRangePage &&
      !isModelPage &&
      !isDynamicFilterPage &&
      !isAllManufacturersPage &&
      !isPartnershipActive,
    [
      isManufacturerPage,
      isSpecialOfferPage,
      isRangePage,
      isModelPage,
      isDynamicFilterPage,
      isAllManufacturersPage,
      isPartnershipActive,
    ],
  );

  const isCarousel = useMemo(() => !!carousel?.cards?.length, [
    carousel?.cards?.length,
  ]);
  const isNewRangeCarousel = useMemo(() => !!newCarousel?.cards?.length, [
    newCarousel?.cards?.length,
  ]);

  return (
    <>
      <PartnershipLogoHeader />
      <SearchPageTitle
        dataUiTestId={`${dataUiTestId}_page-title`}
        breadcrumbsItems={breadcrumbsItems}
        pageTitle={pageTitle}
        pageData={pageData}
        partnershipDescription={partnershipDescription}
        isDesktopOrTablet={isDesktopOrTablet}
        isPartnershipActive={isPartnershipActive}
        isNewPage={isNewPage}
      />
      {pageData && isModelPage && (
        <div className="row:text -columns">
          <div>
            <SearchPageMarkdown markdown={pageData?.genericPage.body} />
          </div>
        </div>
      )}
      {!(isNewPage && isRangePage) &&
        !(isSpecialOfferPage && isCarSearch) &&
        featured && (
          <ReadMoreBlock featured={featured} dataUiTestId={dataUiTestId} />
        )}
      {isNewPage && isRangePage && (
        <TopCategoryInfoBlock
          dataUiTestId={`${dataUiTestId}_top-category-info`}
          pageData={pageData}
        />
      )}
      {isAllManufacturersPage && topInfoSection && (
        <TopInfoBlock
          topInfoSection={topInfoSection}
          dataUiTestId={`${dataUiTestId}_top-info-block`}
        />
      )}
      {shouldRenderTopOffersContainer && (
        <TopOffersContainer
          dataUiTestId={`${dataUiTestId}_top-offers`}
          isCarSearch={isCarSearch}
          shouldForceUpdate={shouldUpdateTopOffers}
          setShouldForceUpdate={setShouldUpdateTopOffers}
          isManufacturerPage={isManufacturerPage || false}
          isBodyPage={isBodyStylePage || false}
          isBudgetPage={isBudgetPage || false}
          isTransmissionPage={isTransmissionPage || false}
          isDynamicFilterPage={isDynamicFilterPage || false}
          isFuelPage={isFuelPage || false}
          isPersonal={isPersonal}
          isRangePage={isRangePage || false}
          isPickups={isPickups || false}
          isSpecialOfferPage={isSpecialOfferPage || false}
          preLoadVehiclesList={preLoadTopOffersList}
          preloadBodyStyleList={preloadBodyStyleList}
          preLoadProductCardsData={preLoadTopOffersCardsData}
          preloadManufacturer={preloadManufacturer}
          preloadRange={preloadRange}
        />
      )}

      {shouldRenderCheckbox && (
        <div className="-mv-400 -stretch-left">
          <Checkbox
            id="specialOffer"
            label="View Special Offers Only"
            checked={isSpecialOffers}
            onChange={e => {
              onSaveSpecialOffersStatus(e.target.checked);
              setIsSpecialOffersOrder(e.target.checked);
            }}
            dataUiTestId={dataUiTestId}
          />
        </div>
      )}
      <div className="row:bg-light -xthin">
        <div className="row:search-filters">
          <FiltersContainer
            isPersonal={isPersonal}
            setType={value => setIsPersonal(value)}
            tagArrayBuilderHelper={tagArrayBuilder}
            preLoadFilters={preLoadFiltersData}
            initialState={initialFiltersState}
            dataUiTestId={dataUiTestId}
            renderFilters={innerProps => (
              <SearchPageFilters
                onSearch={onSearch}
                isCarSearch={isCarSearch}
                isManufacturerPage={isManufacturerPage}
                isRangePage={isRangePage}
                isPickups={isPickups}
                preSearchVehicleCount={totalCount}
                isModelPage={isModelPage}
                isAllManufacturersPage={isAllManufacturersPage}
                isBodyPage={isBodyStylePage}
                isBudgetPage={isBudgetPage}
                isDynamicFilterPage={isDynamicFilterPage}
                isFuelPage={isFuelPage}
                isTransmissionPage={isTransmissionPage}
                isPreloadList={!!preLoadVehiclesList}
                isPartnershipActive={isPartnershipActive}
                setSearchFilters={setFiltersData}
                preLoadFilters={preLoadFiltersData}
                dataUiTestId={dataUiTestId}
                isSpecialOffers={
                  (isSpecialOffers &&
                    !(isRangePage || isModelPage || isDynamicFilterPage)) ||
                  null
                }
                setIsSpecialOffers={setIsSpecialOffers}
                {...innerProps}
              />
            )}
          />
        </div>
      </div>
      <div className="row:bg-lighter -thin">
        <div className="row:results">
          <Text
            color="darker"
            size="regular"
            tag="span"
            dataUiTestId={`${dataUiTestId}_text_results-count`}
          >
            {`Showing ${totalCount} Results`}
          </Text>
          {!(isAllManufacturersPage || isManufacturerPage) && (
            <SortOrder
              sortValues={sortValues}
              sortOrder={(sortOrder as SortObject[])[0]}
              isSpecialOffersOrder={isSpecialOffersOrder}
              onChangeSortOrder={onChangeSortOrder}
              dataUiTestId={dataUiTestId}
            />
          )}
          <div className="row:cards-3col">
            <ResultsContainer
              dataUiTestId={`${dataUiTestId}_search-results`}
              isManufacturerPage={isManufacturerPage}
              isAllManufacturersPage={isAllManufacturersPage}
              ranges={ranges}
              isPersonal={isPersonal}
              rangesUrls={rangesUrls}
              isCarSearch={isCarSearch}
              manufacturers={manufacturers}
              manufacturersUrls={manufacturersUrls}
              cardsData={cardsData}
              vehiclesList={vehiclesList}
              isModelPage={isModelPage}
              customCTAColor={customCTAColor}
            />
          </div>
          {!(isManufacturerPage || isAllManufacturersPage) && (
            <div className="pagination">
              {totalCount > vehiclesList?.length && (
                <Button
                  color={customTextColor || 'teal'}
                  fill="outline"
                  label="Load More"
                  onClick={onLoadMore}
                  size="regular"
                  dataTestId="LoadMore"
                  customCTAColor={customCTAColor}
                  dataUiTestId={`${dataUiTestId}_button_load-more`}
                />
              )}
            </div>
          )}
        </div>
      </div>
      {isSpecialOfferPage && isCarSearch && featured && (
        <ReadMoreBlock featured={featured} />
      )}
      {pageData?.genericPage?.sections?.featured2?.body && (
        <FeaturedSectionBlock
          title={pageData.genericPage.sections.featured2.title}
          body={pageData.genericPage.sections.featured2.body}
        />
      )}
      {isDynamicFilterPage && tiles?.tiles?.length && (
        <WhyLeaseWithVanaramaTiles
          tiles={tiles.tiles}
          title={tiles.tilesTitle || ''}
          titleTag={tiles.titleTag}
        />
      )}
      {pageData && (
        <>
          {isRangePage ||
            (isDynamicFilterPage && (
              <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
                <div className={`row:text ${applyColumns}`}>
                  <SearchPageMarkdown
                    markdown={pageData?.genericPage.body}
                    withoutImage
                  />
                </div>
              </LazyLoadComponent>
            ))}

          {!(isNewPage && isRangePage) &&
            !isDynamicFilterPage &&
            tiles?.tiles?.length && (
              <WhyLeaseWithVanaramaTiles
                tiles={tiles.tiles}
                title={tiles.tilesTitle || ''}
                titleTag={tiles.titleTag}
              />
            )}

          {isNewPage && isRangePage && (
            <NewRangeContent
              newCarousel={newCarousel}
              isNewPage={isNewPage}
              isRangePage={isRangePage}
              pageData={pageData}
              isNewRangeCarousel={isNewRangeCarousel}
              dataUiTestId={`${dataUiTestId}_new-range-content`}
            />
          )}

          {isCarousel && (
            <RelatedCarousel
              cards={carousel.cards}
              title={carousel.title}
              dataUiTestId={`${dataUiTestId}_related`}
            />
          )}
        </>
      )}
      <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
        <TermsAndConditions dataUiTestId={dataUiTestId} />
      </LazyLoadComponent>
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={null} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
      {isNewPage && isRangePage && <ButtonBottomToTop />}
    </>
  );
};

export default SearchPageContainer;
