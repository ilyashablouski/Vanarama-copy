import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import SchemaJSON from 'core/atoms/schema-json';
import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { ISearchPageContainerProps } from './interfaces';
import PartnershipLogoHeader from '../PartnershipLogoHeader';
import SearchPageTitle from './sections/SearchPageTitle';
import SearchPageMarkdown from './components/SearchPageMarkdown';
import ReadMoreBlock from './sections/ReadMoreBlock';
import TopOffersContainer from './sections/TopOffersContainer';
import SearchPageFilters from '../../components/SearchPageFilters';
import ResultsCount from './components/ResultsCount';
import SortOrder from '../../components/SortOrder';
import {
  buildRewriteRoute,
  createInitialVehiclesVariables,
  createProductCacheVariables,
  createProductCardVariables,
  createRangesVariables,
  createVehiclesVariables,
  dynamicQueryTypeCheck,
  fuelMapper,
  getCapsIds,
  getNumberOfVehicles,
  getNumberOfVehiclesFromSessionStorage,
  getPartnershipDescription,
  getPartnershipTitle,
  getValueFromStorage,
  isPreviousPage,
  RESULTS_PER_REQUEST,
  scrollIntoPreviousView,
  sortObjectGenerator,
  sortValues,
  ssrCMSQueryExecutor,
} from './helpers';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  SortObject,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import ResultsContainer from './sections/ResultsContainer';
import FeaturedSectionBlock from './sections/FeaturedSectionBlock';
import WhyLeaseWithVanaramaTiles from '../../components/WhyLeaseWithVanaramaTiles';
import { isBrowser, isServerRenderOrAppleDevice } from '../../utils/deviceType';
import RelatedCarousel from '../../components/RelatedCarousel';
import TermsAndConditions from './sections/TermsAndConditions';
import Head from '../../components/Head/Head';
import useSortOrder from '../../hooks/useSortOrder';
import useLeaseType from '../../hooks/useLeaseType';
import { rangeList } from '../../../generated/rangeList';
import { GetProductCard_productCard as IProductCard } from '../../../generated/GetProductCard';
import { IFilters } from '../FiltersContainer/interfaces';
import { TColor } from '../../types/color';
import { getSectionsData } from '../../utils/getSectionsData';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_carousel as CarouselData,
  GenericPageQuery_genericPage_sections_tiles as Tiles,
} from '../../../generated/GenericPageQuery';
import {
  findPreselectFilterValue,
  tagArrayBuilderHelper,
} from '../FiltersContainer/helpers';
import { useProductCardDataLazyQuery } from '../CustomerAlsoViewedContainer/gql';
import { getRangesList, useVehiclesList } from './gql';
import {
  getObjectFromSessionStorage,
  removeSessionStorageItem,
} from '../../utils/windowSessionStorage';
import { getPartnerProperties } from '../../utils/partnerProperties';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import { globalColors } from '../../utils/colors';
import Skeleton from '../../components/Skeleton';

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

const DynamicParamSearchContainer: FC<ISearchPageContainerProps> = ({
  dataUiTestId,
  isServer,
  isCarSearch = false,
  isManufacturerPage,
  isBodyStylePage,
  isFuelPage,
  isEvPage,
  isBudgetPage,
  isTransmissionPage,
  pageData: pageDataSSR,
  metaData: metaDataSSR,
  preLoadFiltersData,
  preLoadRanges,
  rangesUrls,
  preLoadVehiclesList,
  preLoadProductCardsData,
  preLoadResponseCapIds,
  preLoadTopOffersList,
  preLoadTopOffersCardsData,
  defaultSort,
}) => {
  const { savedSortOrder, saveSortOrder } = useSortOrder(defaultSort);
  const { cachedLeaseType, setCachedLeaseType } = useLeaseType(isCarSearch);
  const [isPersonal, setIsPersonal] = useState(
    cachedLeaseType === LeaseTypeEnum.PERSONAL,
  );
  const [isPartnershipActive, setPartnershipActive] = useState(false);

  const [isSpecialOffers, setIsSpecialOffers] = useState(
    getValueFromStorage(isServer, isCarSearch) ?? false,
  );

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

  const [sortOrder, setSortOrder] = useState(savedSortOrder);
  const [isSpecialOffersOrder, setIsSpecialOffersOrder] = useState(true);
  const [filtersData, setFiltersData] = useState({} as IFilters);
  const [pageOffset, setPageOffset] = useState(0);

  const [customCTAColor, setCustomCTAColor] = useState<string | undefined>();
  const [customTextColor, setCustomTextColor] = useState<TColor | string>();
  const [pageTitle, setTitle] = useState(metaData?.name || '');
  const [partnershipDescription, setPartnershipDescription] = useState('');

  const [prevPosition, setPrevPosition] = useState(0);

  const client = useApolloClient();
  const router = useRouter();

  const applyColumns = !isEvPage ? '-columns' : '';
  const isDynamicFilterPage = useMemo(
    () => isBodyStylePage || isFuelPage || isTransmissionPage || isBudgetPage,
    [isBodyStylePage, isFuelPage, isTransmissionPage, isBudgetPage],
  );
  const featured = useMemo(
    () => getSectionsData(['sections', 'featured'], pageData?.genericPage),
    [pageData],
  );
  const carousel: CarouselData = useMemo(
    () => getSectionsData(['sections', 'carousel'], pageData?.genericPage),
    [pageData],
  );
  const tiles: Tiles = useMemo(
    () => getSectionsData(['sections', 'tiles'], pageData?.genericPage),
    [pageData],
  );
  const fuelTypesData = useMemo(
    () =>
      filtersData?.fuelTypes?.length > 0
        ? filtersData?.fuelTypes
        : getPartnerProperties()?.fuelTypes,
    [filtersData],
  );
  const shouldRenderTopOffersContainer = useMemo(
    () => isManufacturerPage || isDynamicFilterPage,
    [isManufacturerPage, isDynamicFilterPage],
  );
  const shouldRenderCheckbox = useMemo(
    () => !isManufacturerPage && !isDynamicFilterPage && !isPartnershipActive,
    [isManufacturerPage, isDynamicFilterPage, isPartnershipActive],
  );
  const isCarousel = useMemo(() => !!carousel?.cards?.length, [
    carousel?.cards?.length,
  ]);
  const manualBodyStyle = useMemo(() => {
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
  }, [router.query, isBodyStylePage, preLoadFiltersData]);
  const vehicleType = useMemo(
    () => (isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV),
    [isCarSearch],
  );
  const leaseType = useMemo(
    () => (isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS),
    [isPersonal],
  );

  const [getProductCardData, { loading }] = useProductCardDataLazyQuery(
    capIds,
    vehicleType,
    data => {
      setCardsData(data?.productCard || []);
      if (prevPosition) {
        setPageOffset(prevPosition);
      }
    },
  );
  const [getProductCacheCardData] = useProductCardDataLazyQuery(
    capIds,
    vehicleType,
    data => {
      setCardsDataCache(data?.productCard || []);
    },
  );

  // Ranges list query for manufacturer page
  const [getRanges, { data: rangesData }] = getRangesList(
    vehicleType,
    router.query?.dynamicParam as string,
    leaseType,
  );

  // using for cache request
  const [getVehiclesCache, { data: cacheData }] = useVehiclesList(
    [vehicleType],
    leaseType,
    isSpecialOffers || null,
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
    isBodyStylePage ? manualBodyStyle : [],
  );
  // using onCompleted callback for request card data after vehicle list was loaded
  const [getVehicles, { data, fetchMore, called }] = useVehiclesList(
    [vehicleType],
    leaseType,
    isManufacturerPage || isDynamicFilterPage ? true : isSpecialOffers || null,
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
          if (!isManufacturerPage) {
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
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error:', err);
      }
    },
    RESULTS_PER_REQUEST,
    undefined,
    isBodyStylePage ? manualBodyStyle : [],
  );

  // new search with new filters
  const onSearch = useCallback(
    (filtersObject?: IFilters) => {
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
      } else {
        let onOffer;
        // set onOffer value to actual depend on page type
        if (isDynamicFilterPage) {
          onOffer = null;
        } else {
          onOffer = isSpecialOffers || null;
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
            isManualBodyStyle: isBodyStylePage,
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
            !(isManufacturerPage && (key === 'make' || key === 'rangeName')) &&
            !(isBodyStylePage && key === 'bodyStyles') &&
            !((isFuelPage || isPartnershipActive) && key === 'fuelTypes') &&
            !(isTransmissionPage && key === 'transmissions') &&
            !(isBudgetPage && key === 'pricePerMonth')
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
    },
    [
      filtersData,
      getRanges,
      getVehicles,
      isBodyStylePage,
      isBudgetPage,
      isCarSearch,
      isDynamicFilterPage,
      isFuelPage,
      isManufacturerPage,
      isPartnershipActive,
      isPersonal,
      isSpecialOffers,
      isSpecialOffersOrder,
      isTransmissionPage,
      manualBodyStyle,
      router,
      sortOrder,
    ],
  );

  // handler for changing sort dropdown
  const onChangeSortOrder = useCallback(
    (value: string) => {
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
    },
    [isSpecialOffersOrder, saveSortOrder],
  );

  /** save to sessions storage special offers status */
  const onSaveSpecialOffersStatus = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsSpecialOffers(event.target.checked);
      setIsSpecialOffersOrder(event.target.checked);
      sessionStorage.setItem('Car', JSON.stringify(event.target.checked));
    },
    [],
  );

  // load more offers
  const onLoadMore = useCallback(() => {
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
  }, [
    cacheData?.vehicleList.edges,
    cacheData?.vehicleList.pageInfo.endCursor,
    cacheData?.vehicleList.pageInfo.hasNextPage,
    cardsDataCache,
    totalCount,
    vehiclesList,
  ]);

  const tagArrayBuilder = useCallback(
    (entry: [string, string[]], filtersContainerData: IFilterList) =>
      tagArrayBuilderHelper(entry, filtersContainerData, {
        isPartnershipActive,
        isBudgetPage,
        isManufacturerPage,
        isFuelPage,
        isTransmissionPage,
        isBodyStylePage,
      }),
    [
      isBodyStylePage,
      isBudgetPage,
      isFuelPage,
      isManufacturerPage,
      isPartnershipActive,
      isTransmissionPage,
    ],
  );

  // prevent case when we navigate use back/forward button and useCallback return empty result list
  useEffect(() => {
    if (data && !cardsData.length && loading) {
      getProductCardData(
        createProductCardVariables(data.vehicleList.edges, isCarSearch),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // listen for any updates to metaDataSSR
  useEffect(() => {
    setMetaData(metaDataSSR);
    setPageData(pageDataSSR);
  }, [metaDataSSR, pageDataSSR]);

  // API call after load new pages
  useEffect(() => {
    // prevent request with empty filters
    const queryLength = Object.keys(router?.query || {})?.length;
    // if it's simple search page with presave special offers param made new request for actual params
    if (
      !queryLength &&
      getValueFromStorage(false, isCarSearch) &&
      !isDynamicFilterPage &&
      !isBodyStylePage
    ) {
      // load vehicles
      getVehicles();
    }
    // disabled lint because we can't add router to deps
    // it's change every url replace
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getVehicles, isCarSearch, isManufacturerPage, getRanges]);

  // get vehicles to cache
  useEffect(() => {
    // don't make a request for cache in manufacture page
    if (
      lastCard &&
      !isManufacturerPage &&
      hasNextPage &&
      shouldUpdateCache &&
      isDynamicFilterPage &&
      Object.values(filtersData).flat().length > 0
    ) {
      setShouldUpdateCache(false);
      const isOnOffer = !isDynamicFilterPage ? isSpecialOffers || null : null;

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
    isDynamicFilterPage,
    sortOrder,
    isSpecialOffersOrder,
    isPersonal,
  ]);

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

  useEffect(() => {
    scrollIntoPreviousView(pageOffset, prevPosition, setPrevPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageOffset]);

  useEffect(() => {
    setCachedLeaseType(leaseType);
  }, [isPersonal, leaseType, setCachedLeaseType]);

  useEffect(() => {
    const partnerActive = getPartnerProperties();

    if (partnerActive) {
      setCustomCTAColor(partnerActive.color);
      setCustomTextColor(globalColors.white);
      setPartnershipDescription(
        getPartnershipDescription(partnerActive, isCarSearch),
      );
      setTitle(getPartnershipTitle(partnerActive, isCarSearch));
    }
  }, [isCarSearch]);

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
        const { data: genericPageData, errors } = (await ssrCMSQueryExecutor(
          client,
          context,
          false,
          type as string,
        )) as ApolloQueryResult<GenericPageQuery>;
        if (genericPageData && !errors?.[0]) {
          setPageData(genericPageData);
          setMetaData(genericPageData.genericPage.metaData);
          setLastCard('');
          if (isManufacturerPage || isDynamicFilterPage) {
            setShouldUpdateTopOffers(true);
          }
        }
      };
      fetchPageData();
    }
  }, [router, router.query, client, isManufacturerPage, isDynamicFilterPage]);

  return (
    <>
      <PartnershipLogoHeader />
      <SearchPageTitle
        dataUiTestId={`${dataUiTestId}_page-title`}
        breadcrumbs={metaData.breadcrumbs}
        pageTitle={pageTitle}
        pageData={pageData}
        partnershipDescription={partnershipDescription}
        isPartnershipActive={isPartnershipActive}
      />
      {featured && (
        <ReadMoreBlock featured={featured} dataUiTestId={dataUiTestId} />
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
          preLoadVehiclesList={preLoadTopOffersList}
          preLoadProductCardsData={preLoadTopOffersCardsData}
        />
      )}

      {shouldRenderCheckbox && (
        <div className="-mv-400 -stretch-left">
          <Checkbox
            id="specialOffer"
            label="View Special Offers Only"
            checked={isSpecialOffers}
            onChange={onSaveSpecialOffersStatus}
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
            dataUiTestId={dataUiTestId}
            renderFilters={innerProps => (
              <SearchPageFilters
                onSearch={onSearch}
                isCarSearch={isCarSearch}
                isManufacturerPage={isManufacturerPage}
                preSearchVehicleCount={totalCount}
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
                  (isSpecialOffers && !isDynamicFilterPage) || null
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
          <ResultsCount totalCount={totalCount} dataUiTestId={dataUiTestId} />
          {!isManufacturerPage && (
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
              ranges={ranges}
              isPersonal={isPersonal}
              rangesUrls={rangesUrls}
              isCarSearch={isCarSearch}
              cardsData={cardsData}
              vehiclesList={vehiclesList}
              customCTAColor={customCTAColor}
            />
          </div>
          {!isManufacturerPage && (
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
          {isDynamicFilterPage && (
            <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
              <div className={`row:text ${applyColumns}`}>
                <SearchPageMarkdown
                  markdown={pageData?.genericPage.body}
                  withoutImage
                />
              </div>
            </LazyLoadComponent>
          )}

          {!isDynamicFilterPage && tiles?.tiles?.length && (
            <WhyLeaseWithVanaramaTiles
              tiles={tiles.tiles}
              title={tiles.tilesTitle || ''}
              titleTag={tiles.titleTag}
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
    </>
  );
};

export default DynamicParamSearchContainer;