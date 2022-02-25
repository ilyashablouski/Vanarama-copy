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
  buildRewriteRoute,
  createInitialVehiclesVariables,
  createProductCacheVariables,
  createProductCardVariables,
  createVehiclesVariables,
  dynamicQueryTypeCheck,
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
import Skeleton from '../../components/Skeleton';
import { isBrowser, isServerRenderOrAppleDevice } from '../../utils/deviceType';
import { getPartnerProperties } from '../../utils/partnerProperties';
import TermsAndConditions from './sections/TermsAndConditions';
import Head from '../../components/Head/Head';
import { globalColors } from '../../utils/colors';
import { TColor } from '../../types/color';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import { IFilters } from '../FiltersContainer/interfaces';
import useSortOrder from '../../hooks/useSortOrder';
import { useVehiclesList } from './gql';
import {
  getObjectFromSessionStorage,
  removeSessionStorageItem,
} from '../../utils/windowSessionStorage';
import { useProductCardDataLazyQuery } from '../CustomerAlsoViewedContainer/gql';
import useLeaseType from '../../hooks/useLeaseType';
import { GetProductCard_productCard as IProductCard } from '../../../generated/GetProductCard';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';
import { tagArrayBuilderHelper } from '../FiltersContainer/helpers';
import { ISearchPageContainerProps } from './interfaces';
import ResultsCount from './components/ResultsCount';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';

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
  const [sortOrder, setSortOrder] = useState(savedSortOrder);
  const [pageData, setPageData] = useState(pageDataSSR);
  const [metaData, setMetaData] = useState(metaDataSSR);
  const [pageTitle, setTitle] = useState(metaData?.name || '');
  const [customCTAColor, setCustomCTAColor] = useState<string | undefined>();
  const [customTextColor, setCustomTextColor] = useState<TColor | string>();
  const [isSpecialOffersOrder, setIsSpecialOffersOrder] = useState(true);
  const [isPartnershipActive, setPartnershipActive] = useState(false);
  const [prevPosition, setPrevPosition] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);
  const [filtersData, setFiltersData] = useState({} as IFilters);
  const [capIds, setCapsIds] = useState(preLoadResponseCapIds || []);
  const [partnershipDescription, setPartnershipDescription] = useState('');
  const [vehiclesList, setVehicleList] = useState(
    preLoadVehiclesList?.vehicleList.edges || [],
  );
  const [cardsData, setCardsData] = useState<(IProductCard | null)[]>(
    preLoadProductCardsData?.productCard || [],
  );
  const [cardsDataCache, setCardsDataCache] = useState<(IProductCard | null)[]>(
    [],
  );
  const [shouldUpdateCache, setShouldUpdateCache] = useState(
    preLoadVehiclesList?.vehicleList?.pageInfo?.hasNextPage ?? true,
  );
  const [hasNextPage, setHasNextPage] = useState(
    preLoadVehiclesList?.vehicleList?.pageInfo.hasNextPage ?? true,
  );
  const [isPersonal, setIsPersonal] = useState(
    cachedLeaseType === LeaseTypeEnum.PERSONAL,
  );
  const [isSpecialOffers, setIsSpecialOffers] = useState(
    getValueFromStorage(isServer, true) ?? false,
  );
  const [lastCard, setLastCard] = useState(
    preLoadVehiclesList?.vehicleList.pageInfo.endCursor || '',
  );
  const [totalCount, setTotalCount] = useState(
    preLoadVehiclesList?.vehicleList?.totalCount || 0,
  );
  const fuelTypesData = useMemo(
    () =>
      filtersData?.fuelTypes?.length > 0
        ? filtersData?.fuelTypes
        : getPartnerProperties()?.fuelTypes,
    [filtersData],
  );
  const router = useRouter();
  const client = useApolloClient();

  const manualBodyStyle = useMemo(() => {
    if (isPickups) {
      return ['Pickup'];
    }
    return [''];
  }, [isPickups]);

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

  const [getVehiclesCache, { data: cacheData }] = useVehiclesList(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    isSpecialOffers || null,
    async vehicles => {
      try {
        const responseCapIds = getCapsIds(vehicles.vehicleList?.edges || []);
        setCapsIds(responseCapIds);
        if (responseCapIds.length) {
          // add cache variable
          return getProductCacheCardData(
            createProductCacheVariables(responseCapIds, true),
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
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    isSpecialOffers || null,
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
          setTotalCount(vehicles.vehicleList.totalCount);
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
    isPickups ? manualBodyStyle : [],
  );

  /** save to sessions storage special offers status */
  const onSaveSpecialOffersStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsSpecialOffers(e.target.checked);
      sessionStorage.setItem('Car', JSON.stringify(e.target.checked));
      setIsSpecialOffersOrder(e.target.checked);
    },
    [],
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

  const onSearch = useCallback(
    (filtersObject?: IFilters) => {
      const filters = filtersObject || filtersData;
      const onOffer = isSpecialOffers || null;
      let fuelTypes;
      if (filters?.fuelTypes?.length > 0) {
        fuelTypes = filters.fuelTypes;
      } else {
        fuelTypes = getPartnerProperties()?.fuelTypes;
      }
      getVehicles(
        createVehiclesVariables({
          isCarSearch,
          isPersonal,
          isSpecialOffersOrder,
          isManualBodyStyle: isPickups,
          onOffer: onOffer ?? null,
          filters,
          manualBodyStyle,
          query: router.query,
          sortOrder: sortOrder as SortObject[],
          fuelTypes,
        }),
      );
      if (filtersObject) {
        let pathname = router.route
          .replace('[dynamicParam]', router.query?.dynamicParam as string)
          .replace('[rangeName]', router.query?.rangeName as string)
          .replace('[bodyStyles]', router.query?.bodyStyles as string);
        const queryString = new URLSearchParams();
        const query = buildRewriteRoute(filters as IFilters);
        Object.entries(query).forEach(filter => {
          const [key, value] = filter as [string, string | string[]];
          if (value?.length && !(isPartnershipActive && key === 'fuelTypes')) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      filtersData,
      sortOrder,
      isPersonal,
      isSpecialOffers,
      isSpecialOffersOrder,
      isPartnershipActive,
      getVehicles,
    ],
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

  useFirstRenderEffect(() => {
    onSearch();
    setLastCard('');
  }, [sortOrder]);

  useFirstRenderEffect(() => {
    onSearch();
  }, [isPersonal]);

  // prevent case when we navigate use back/forward button and useCallback return empty result list
  useEffect(() => {
    if (data && !cardsData.length && loading) {
      getProductCardData(
        createProductCardVariables(data.vehicleList.edges, isCarSearch),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setCachedLeaseType(
      isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    );
  }, [isPersonal, setCachedLeaseType]);

  useEffect(() => {
    const partnerActive = getPartnerProperties();
    setPartnershipActive(!!partnerActive);
  }, [isPartnershipActive]);

  useEffect(() => {
    scrollIntoPreviousView(pageOffset, prevPosition, setPrevPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageOffset]);

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
        if (data && !errors?.[0]) {
          setPageData(genericPageData);
          setMetaData(genericPageData.genericPage.metaData);
          setLastCard('');
        }
      };
      fetchPageData();
    }
  }, [router, router.query, client, data]);

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
  }, [getVehicles]);

  // get vehicles to cache
  useEffect(() => {
    // don't make a request for cache in manufacture page
    if (lastCard && hasNextPage && shouldUpdateCache) {
      setShouldUpdateCache(false);
      const isOnOffer = isSpecialOffers || null;

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
    isSpecialOffers,
    shouldUpdateCache,
    hasNextPage,
    filtersData,
    sortOrder,
    isSpecialOffersOrder,
    isPersonal,
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
  }, [cacheData, setCapsIds]);

  return (
    <>
      <PartnershipLogoHeader />
      <SearchPageTitle
        dataUiTestId={`${dataUiTestId}_page-title`}
        breadcrumbs={metaData.breadcrumbs}
        pageTitle={pageTitle}
        pageData={pageData}
        partnershipDescription={partnershipDescription}
      />
      <div className="-mv-400 -stretch-left">
        <Checkbox
          id="specialOffer"
          label="View Special Offers Only"
          checked={isSpecialOffers}
          onChange={onSaveSpecialOffersStatus}
          dataUiTestId={dataUiTestId}
        />
      </div>
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
                isSpecialOffers={isSpecialOffers || null}
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
              isPersonal={isPersonal}
              isCarSearch
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
