import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import SchemaJSON from 'core/atoms/schema-json';
import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import PartnershipLogoHeader from '../PartnershipLogoHeader';
import SearchPageTitle from './sections/SearchPageTitle';
import SearchPageFilters from '../../components/SearchPageFilters';
import SortOrder from '../../components/SortOrder';
import {
  buildUrlWithFilter,
  createFetchMoreOptions,
  createInitialVehiclesVariables,
  createProductCacheVariables,
  createProductCardVariables,
  createVehiclesVariables,
  getCapsIds,
  getFuelType,
  getNumberOfVehiclesFromSessionStorage,
  getPageTypeAndContext,
  getPartnershipDescription,
  getPartnershipTitle,
  getValueFromStorage,
  isOnOffer,
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
import Skeleton from '../../components/Skeleton';
import { isBrowser, isServerRenderOrAppleDevice } from '../../utils/deviceType';
import { getPartnerProperties } from '../../utils/partnerProperties';
import TermsAndConditions from './sections/TermsAndConditions';
import Head from '../../components/Head/Head';
import { globalColors } from '../../utils/colors';
import { TColor } from '../../types/color';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_carousel as CarouselData,
  GenericPageQuery_genericPage_sections_tiles as Tiles,
} from '../../../generated/GenericPageQuery';
import { IFilters } from '../FiltersContainer/interfaces';
import useSortOrder from '../../hooks/useSortOrder';
import { getRangesList, useVehiclesList } from './gql';
import {
  getObjectFromSessionStorage,
  removeSessionStorageItem,
} from '../../utils/windowSessionStorage';
import { useProductCardDataLazyQuery } from '../CustomerAlsoViewedContainer/gql';
import useLeaseType from '../../hooks/useLeaseType';
import { GetProductCard_productCard as IProductCard } from '../../../generated/GetProductCard';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';
import {
  getManualBodyStyle,
  tagArrayBuilderHelper,
} from '../FiltersContainer/helpers';
import { ISearchPageContainerProps } from './interfaces';
import ResultsCount from './components/ResultsCount';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import { rangeList } from '../../../generated/rangeList';
import { getSectionsData } from '../../utils/getSectionsData';
import ReadMoreBlock from './sections/ReadMoreBlock';
import FeaturedSectionBlock from './sections/FeaturedSectionBlock';
import WhyLeaseWithVanaramaTiles from '../../components/WhyLeaseWithVanaramaTiles';
import RelatedCarousel from '../../components/RelatedCarousel';
import { OnOffer } from '../../../entities/global';

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

const SearchContainer: FC<ISearchPageContainerProps> = ({
  dataUiTestId,
  isServer,
  isCarSearch = false,
  isPickups,
  pageData: pageDataSSR,
  metaData: metaDataSSR,
  preLoadVehiclesList,
  preLoadResponseCapIds,
  preLoadProductCardsData,
}) => {
  const { savedSortOrder, saveSortOrder } = useSortOrder();
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
  const [shouldUpdateCache, setShouldUpdateCache] = useState(
    preLoadVehiclesList?.vehicleList?.pageInfo?.hasNextPage ?? true,
  );

  const [vehiclesList, setVehicleList] = useState(
    preLoadVehiclesList?.vehicleList.edges || ([] as any),
  );
  const [ranges, setRanges] = useState({} as rangeList);

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
    preLoadVehiclesList?.vehicleList?.totalCount || 0,
  );

  const [sortOrder, setSortOrder] = useState(savedSortOrder);
  const [isSpecialOffersOrder, setIsSpecialOffersOrder] = useState(true);
  const [filtersData, setFiltersData] = useState<IFilters>({} as IFilters);
  const [pageOffset, setPageOffset] = useState(0);

  const [customCTAColor, setCustomCTAColor] = useState<string | undefined>();
  const [customTextColor, setCustomTextColor] = useState<TColor | string>();
  const [pageTitle, setTitle] = useState(metaData?.name || '');
  const [partnershipDescription, setPartnershipDescription] = useState('');

  const [prevPosition, setPrevPosition] = useState(0);

  const client = useApolloClient();
  const router = useRouter();

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
  const shouldRenderCheckbox = useMemo(() => !isPartnershipActive, [
    isPartnershipActive,
  ]);
  const isCarousel = useMemo(() => !!carousel?.cards?.length, [
    carousel?.cards?.length,
  ]);
  const manualBodyStyle = useMemo(() => getManualBodyStyle({ isPickups }), [
    isPickups,
  ]);

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
    isSpecialOffers || OnOffer.FILTER_DISABLED,
    async ({ vehicleList }) => {
      try {
        const responseCapIds = getCapsIds(vehicleList?.edges || []);
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
    isPickups ? manualBodyStyle : [],
  );
  // using onCompleted callback for request card data after vehicle list was loaded
  const [getVehicles, { data, fetchMore, called }] = useVehiclesList(
    [vehicleType],
    leaseType,
    isSpecialOffers || OnOffer.FILTER_DISABLED,
    async ({ vehicleList }) => {
      const savedPageData = getObjectFromSessionStorage('searchPageScrollData');
      const edges = vehicleList?.edges || [];
      const lastCursor = edges[edges.length - 1]?.cursor;
      // backend don't return more than 24 results per one request, so we need to use recursion for get all results
      async function fetchMoreRec() {
        const isNotEnough = savedPageData?.offerPosition > (edges?.length || 0);
        if (isNotEnough && fetchMore) {
          await fetchMore(
            createFetchMoreOptions(lastCursor, savedPageData, edges),
          );
          await fetchMoreRec();
        }
      }
      if (isPreviousPage(router.query)) {
        await fetchMoreRec();
        setPrevPosition(savedPageData.scrollPosition);
        removeSessionStorageItem('searchPageScrollData');
      }
      try {
        if (edges?.length === 0 && isSpecialOffers) {
          setIsSpecialOffers(OnOffer.FILTER_ENABLED_AND_SET_TO_FALSE);
          return;
        }
        const responseCapIds = getCapsIds(edges || []);
        setCapsIds(responseCapIds);
        if (responseCapIds.length) {
          setVehicleList(edges || []);
          // use range length for manufacture page
          setTotalCount(vehicleList.totalCount);
          getProductCardData(
            createProductCacheVariables(responseCapIds, isCarSearch),
          );
          setLastCard(vehicleList.pageInfo.endCursor || '');
          setShouldUpdateCache(vehicleList.pageInfo.hasNextPage || false);
          setHasNextPage(vehicleList.pageInfo.hasNextPage || false);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error:', err);
      }
    },
    RESULTS_PER_REQUEST,
    undefined,
    isPickups ? manualBodyStyle : [],
  );

  // new search with new filters
  const onSearch = useCallback(
    (filtersObject?: IFilters) => {
      const filters = filtersObject || filtersData;
      const fuelTypes = getFuelType(filters?.fuelTypes);
      const onOffer = isOnOffer(isSpecialOffers);
      getVehicles(
        createVehiclesVariables({
          isCarSearch,
          isPersonal,
          isSpecialOffersOrder,
          isManualBodyStyle: isPickups,
          onOffer,
          filters,
          query: router.query,
          sortOrder: sortOrder as SortObject[],
          manualBodyStyle,
          fuelTypes,
        }),
      );

      if (filtersObject) {
        const { queries, pathname } = buildUrlWithFilter(
          router.route,
          router.query,
          filters,
          isPartnershipActive,
        );
        // changing url dynamically
        router.replace(
          {
            pathname: router.route,
            query: queries,
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
      getVehicles,
      isCarSearch,
      isPartnershipActive,
      isPersonal,
      isPickups,
      isSpecialOffers,
      isSpecialOffersOrder,
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
      }),
    [isPartnershipActive],
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
    if (!queryLength && getValueFromStorage(false, isCarSearch)) {
      // load vehicles
      getVehicles();
    }
    // disabled lint because we can't add router to deps
    // it's change every url replace
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getVehicles, isCarSearch, getRanges]);

  // get vehicles to cache
  useEffect(() => {
    // don't make a request for cache in manufacture page
    if (lastCard && hasNextPage && shouldUpdateCache) {
      setShouldUpdateCache(false);
      const onOffer = isOnOffer(isSpecialOffers);

      if (isPreviousPage(router.query) && isBrowser() && !called) {
        getVehicles(
          createInitialVehiclesVariables({
            isCarSearch,
            isPersonal,
            isSpecialOffersOrder,
            onOffer,
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
          onOffer,
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
    shouldUpdateCache,
    hasNextPage,
    filtersData,
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
      setCapsIds(getCapsIds(cacheData.vehicleList?.edges));
    }
  }, [cacheData, setCapsIds]);

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
        const [type, context] = getPageTypeAndContext(router);
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
        }
      };
      fetchPageData();
    }
  }, [router, router.query, client]);

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
            dataUiTestId={dataUiTestId}
            renderFilters={innerProps => (
              <SearchPageFilters
                onSearch={onSearch}
                isCarSearch={isCarSearch}
                isPickups={isPickups}
                preSearchVehicleCount={totalCount}
                isPreloadList={!!preLoadVehiclesList}
                isPartnershipActive={isPartnershipActive}
                setSearchFilters={setFiltersData}
                dataUiTestId={dataUiTestId}
                isSpecialOffers={isSpecialOffers || OnOffer.FILTER_DISABLED}
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
          <SortOrder
            sortValues={sortValues}
            sortOrder={(sortOrder as SortObject[])[0]}
            isSpecialOffersOrder={isSpecialOffersOrder}
            onChangeSortOrder={onChangeSortOrder}
            dataUiTestId={dataUiTestId}
          />
          <div className="row:cards-3col">
            <ResultsContainer
              dataUiTestId={`${dataUiTestId}_search-results`}
              ranges={ranges}
              isPersonal={isPersonal}
              isCarSearch={isCarSearch}
              cardsData={cardsData}
              vehiclesList={vehiclesList}
              customCTAColor={customCTAColor}
            />
          </div>
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
        </div>
      </div>
      {pageData?.genericPage?.sections?.featured2?.body && (
        <FeaturedSectionBlock
          title={pageData.genericPage.sections.featured2.title}
          body={pageData.genericPage.sections.featured2.body}
        />
      )}
      {pageData && (
        <>
          {tiles?.tiles?.length && (
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

export default SearchContainer;
