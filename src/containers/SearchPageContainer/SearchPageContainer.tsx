/*
  The first route param renamed to dynamicParam.
  Because this route can be any filter value: make, bodystyle, transmission, fuel type.
  We define type of this params before page rendering in root page container,
  this query param should be using only with page type context for prevent any issues with it
*/
import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import {
  filterOrderByNumMap,
  findPreselectFilterValue,
  getLabelForSlug,
} from '../FiltersContainer/helpers';
import useSortOrder from '../../hooks/useSortOrder';
import RouterLink from '../../components/RouterLink/RouterLink';
import { useProductCardDataLazyQuery } from '../CustomerAlsoViewedContainer/gql';
import { IFilters } from '../FiltersContainer/interfaces';
import { useVehiclesList, getRangesList, useManufacturerList } from './gql';
import { vehicleList as IVehiclesData } from '../../../generated/vehicleList';
import {
  VehicleTypeEnum,
  SortField,
  LeaseTypeEnum,
  SortDirection,
  SortObject,
} from '../../../generated/globalTypes';
import {
  buildRewriteRoute,
  dynamicQueryTypeCheck,
  fuelMapper,
  getCapsIds,
  onMadeLineBreaks,
  sortObjectGenerator,
  ssrCMSQueryExecutor,
} from './helpers';
import {
  GetProductCard_productCard as IProductCard,
  GetProductCard,
} from '../../../generated/GetProductCard';
import TopInfoBlock from './TopInfoBlock';
import { manufacturerPage_manufacturerPage_sections as sections } from '../../../generated/manufacturerPage';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_metaData as PageMetaData,
  GenericPageQuery_genericPage_sections_carousel as CarouselData,
  GenericPageQuery_genericPage_sections_tiles as Tiles,
} from '../../../generated/GenericPageQuery';
import useLeaseType from '../../hooks/useLeaseType';
import { getSectionsData } from '../../utils/getSectionsData';
import { rangeList } from '../../../generated/rangeList';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';
import { bodyStyleList_bodyStyleList as IModelsData } from '../../../generated/bodyStyleList';
import { manufacturerList } from '../../../generated/manufacturerList';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import Head from '../../components/Head/Head';
import { genericPagesQuery_genericPages_items as ILegacyUrls } from '../../../generated/genericPagesQuery';
import Skeleton from '../../components/Skeleton';
import TopOffersContainer from './TopOffersContainer'; // Note: Dynamic import this, will break search filter bar.
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import SortOrder from './SortOrder';
import useMediaQuery from '../../hooks/useMediaQuery';
import TilesBlock from './TilesBlock';
import ResultsContainer from './ResultsContainer';
import CommonDescriptionContainer from './CommonDescriptionContainer';
import ReadMoreBlock from './ReadMoreBlock';
import SearchPageFilters from '../../components/SearchPageFilters';
import { FilterFields } from '../FiltersContainer/config';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={2} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Checkbox = dynamic(() => import('core/atoms/checkbox'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const Carousel = dynamic(() => import('core/organisms/carousel'), {
  loading: () => <Skeleton count={5} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={10} />,
});
const FiltersContainer = dynamic(() => import('../FiltersContainer'), {
  loading: () => <Skeleton count={2} />,
  ssr: true,
});

const initialFiltersState = {
  bodyStyles: [],
  transmissions: [],
  fuelTypes: [],
  make: [],
  model: [],
  from: [],
  to: [],
};

interface IProps {
  isServer: boolean;
  isCarSearch?: boolean;
  isMakePage?: boolean;
  isSimpleSearchPage?: boolean;
  isSpecialOfferPage?: boolean;
  isPickups?: boolean;
  isRangePage?: boolean;
  isModelPage?: boolean;
  isAllMakesPage?: boolean;
  isBodyStylePage?: boolean;
  isTransmissionPage?: boolean;
  isFuelPage?: boolean;
  isBudgetPage?: boolean;
  isEvPage?: boolean;
  pageData?: GenericPageQuery;
  metaData: PageMetaData;
  topInfoSection?: sections | null;
  preLoadFiltersData?: IFilterList | undefined;
  preLoadVehiclesList?: IVehiclesData;
  preLoadProductCardsData?: GetProductCard;
  preLoadResponseCapIds?: string[];
  preLoadTopOffersList?: IVehiclesData;
  preLoadTopOffersCardsData?: GetProductCard;
  preLoadRanges?: rangeList;
  rangesUrls?: ILegacyUrls[];
  makesUrls?: ILegacyUrls[];
  preLoadManufacturers?: manufacturerList | null;
  preloadBodyStyleList?: IModelsData[];
  preloadRange?: string;
  preloadMake?: string;
  defaultSort?: SortObject[];
}

const SearchPageContainer: React.FC<IProps> = ({
  isServer,
  isCarSearch = false,
  isSimpleSearchPage,
  isMakePage,
  isSpecialOfferPage,
  isPickups,
  isRangePage,
  isModelPage,
  isAllMakesPage,
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
  makesUrls,
  preLoadManufacturers,
  preloadMake,
  preloadRange,
  preLoadTopOffersList,
  preLoadTopOffersCardsData,
  defaultSort,
}: IProps) => {
  // assign here as when inline causing hook lint errors
  const applyColumns = !isEvPage ? '-columns' : '';

  const client = useApolloClient();
  const router = useRouter();
  const isDynamicFilterPage = useMemo(
    () => isBodyStylePage || isFuelPage || isTransmissionPage || isBudgetPage,
    [isBodyStylePage, isFuelPage, isTransmissionPage, isBudgetPage],
  );

  /** we storing the last value of special offers checkbox in Session storage */
  const getValueFromStorage = (isServerCheck = false): boolean | undefined => {
    // should check for server rendering, because it haven't Session storage
    const value = isServerCheck
      ? undefined
      : sessionStorage?.getItem(isCarSearch ? 'Car' : 'Vans');
    return value ? JSON.parse(value) : undefined;
  };

  const [isSpecialOffers, setIsSpecialOffers] = useState(
    isSpecialOfferPage ? true : getValueFromStorage(isServer) ?? false,
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

  const { cachedLeaseType, setCachedLeaseType } = useLeaseType(isCarSearch);
  const [isPersonal, setIsPersonal] = useState(cachedLeaseType === 'Personal');
  const [totalCount, setTotalCount] = useState(
    isMakePage
      ? preLoadRanges?.rangeList?.length || 0
      : preLoadVehiclesList?.vehicleList?.totalCount || 0,
  );
  const { savedSortOrder, saveSortOrder } = useSortOrder(defaultSort);
  const [sortOrder, setSortOrder] = useState(savedSortOrder);
  const [isSpecialOffersOrder, setIsSpecialOffersOrder] = useState(true);
  const [filtersData, setFiltersData] = useState<IFilters>({} as IFilters);
  const [pageOffset, setPageOffset] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: pageOffset,
      // @ts-ignore
      behavior: 'instant',
    });
  }, [pageOffset]);

  useEffect(() => {
    const type = isPersonal ? 'Personal' : 'Business';
    setCachedLeaseType(type);
  }, [isPersonal, setCachedLeaseType]);

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
          if (isMakePage || isDynamicFilterPage) setShouldUpdateTopOffers(true);
        }
      };
      fetchPageData();
    }
  }, [router, router.query, client, isMakePage, isDynamicFilterPage]);

  const [getProductCardData, { loading }] = useProductCardDataLazyQuery(
    capIds,
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    data => {
      setCardsData(data?.productCard || []);
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
    if (isPickups) return ['Pickup'];
    if (isModelPage) return [router.query?.bodyStyles as string];
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

  const titleWithBreaks = useMemo(
    () => onMadeLineBreaks(metaData?.name || ''),
    [metaData],
  );

  // Make list query for all makes page
  const [
    getManufacturerList,
    { data: manufatcurersData },
  ] = useManufacturerList(
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
  );

  // Ranges list query for make page
  const [getRanges, { data: rangesData }] = getRangesList(
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    router.query?.dynamicParam as string,
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
  );
  // using onCompleted callback for request card data after vehicle list was loaded
  const [getVehicles, { data }] = useVehiclesList(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    isMakePage || isDynamicFilterPage || isSpecialOfferPage
      ? true
      : isSpecialOffers || null,
    async vehicles => {
      try {
        const responseCapIds = getCapsIds(vehicles.vehicleList?.edges || []);
        setCapsIds(responseCapIds);
        if (responseCapIds.length) {
          return getProductCardData({
            variables: {
              capIds: responseCapIds,
              vehicleType: isCarSearch
                ? VehicleTypeEnum.CAR
                : VehicleTypeEnum.LCV,
            },
          });
        }
        return false;
      } catch {
        return false;
      }
    },
    12,
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
      getValueFromStorage() &&
      !isAllMakesPage &&
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
  }, [getVehicles, isCarSearch, isMakePage, getRanges, isSpecialOfferPage]);

  // prevent case when we navigate use back/forward button and useCallback return empty result list
  useEffect(() => {
    if (data && !cardsData.length && loading) {
      getProductCardData({
        variables: {
          capIds: getCapsIds(data.vehicleList.edges || []),
          vehicleType: isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // new search with new filters
  const onSearch = (filtersObject?: IFilters) => {
    const filters = filtersObject || filtersData;
    if (isMakePage) {
      const filtersForRanges = { ...filters, manufacturerSlug: undefined };
      getRanges({
        variables: {
          vehicleTypes: isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
          leaseType: isPersonal
            ? LeaseTypeEnum.PERSONAL
            : LeaseTypeEnum.BUSINESS,
          ...filtersForRanges,
          manufacturerSlug: router.query?.dynamicParam as string,
        },
      });
      // call only manufacturer list query call after select new filter
    } else if (isAllMakesPage) {
      getManufacturerList({
        variables: {
          vehicleType: isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
          leaseType: isPersonal
            ? LeaseTypeEnum.PERSONAL
            : LeaseTypeEnum.BUSINESS,
          rate: filters.rate,
          bodyStyles: filters.bodyStyles,
          transmissions: filters.transmissions,
          fuelTypes: filters.fuelTypes,
        },
      });
    } else {
      let onOffer;
      // set onOffer value to actual depend on page type
      if (isRangePage || isModelPage || isDynamicFilterPage) onOffer = null;
      else onOffer = isSpecialOfferPage ? true : isSpecialOffers || null;
      getVehicles({
        variables: {
          vehicleTypes: isCarSearch
            ? [VehicleTypeEnum.CAR]
            : [VehicleTypeEnum.LCV],
          leaseType: isPersonal
            ? LeaseTypeEnum.PERSONAL
            : LeaseTypeEnum.BUSINESS,
          onOffer,
          ...filters,
          sort: isSpecialOffersOrder
            ? [{ field: SortField.offerRanking, direction: SortDirection.ASC }]
            : sortOrder,
          ...{
            bodyStyles:
              isPickups || isModelPage || isBodyStylePage
                ? (filters.bodyStyles?.[0] && filters.bodyStyles) ||
                  manualBodyStyle
                : filters.bodyStyles,
            transmissions: isTransmissionPage
              ? [(router.query.dynamicParam as string).replace('-', ' ')]
              : filters.transmissions,
            fuelTypes: isFuelPage
              ? (fuelMapper[
                  router.query.dynamicParam as keyof typeof fuelMapper
                ] as string).split(',')
              : filters.fuelTypes,
          },
        },
      });
    }
    if (filtersObject) {
      let pathname = router.route
        .replace('[dynamicParam]', router.query?.dynamicParam as string)
        .replace('[rangeName]', router.query?.rangeName as string)
        .replace('[bodyStyles]', router.query?.bodyStyles as string);
      const queryString = new URLSearchParams();
      // don't add range and make to query for make/range pages
      const query = buildRewriteRoute(
        filters as IFilters,
        isMakePage || isRangePage,
        isModelPage,
        isBodyStylePage,
        isTransmissionPage,
        isFuelPage,
        isBudgetPage,
      );
      Object.entries(query).forEach(([key, value]) =>
        queryString.set(key, value as string),
      );
      if (Object.keys(query).length)
        pathname += `?${decodeURIComponent(queryString.toString())}`;
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

  useEffect(() => {
    if (isServer) setIsSpecialOffers(getValueFromStorage() ?? false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isServer]);

  // using for scroll page to top only for page mount
  useEffect(() => {
    if (window) {
      window.scrollTo(0, 0);
    }
    // can't add a window to deps, because it isn't exist in SSR
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // initial set offers
  useEffect(() => {
    if (data?.vehicleList) {
      if (data.vehicleList?.edges?.length === 0 && isSpecialOffers) {
        setIsSpecialOffers(false);
        return;
      }
      setVehicleList(data.vehicleList?.edges || []);
      setLastCard(data.vehicleList.pageInfo.endCursor || '');
      setShouldUpdateCache(data.vehicleList.pageInfo.hasNextPage || false);
      setHasNextPage(data.vehicleList.pageInfo.hasNextPage || false);
      // use range lenght for manufacture page
      if (!isMakePage && !isAllMakesPage)
        setTotalCount(data.vehicleList.totalCount);
    }
  }, [
    data,
    setVehicleList,
    setLastCard,
    setTotalCount,
    setCapsIds,
    isMakePage,
    isAllMakesPage,
    isSpecialOffers,
  ]);

  // initial set ranges
  useEffect(() => {
    if (rangesData?.rangeList) {
      setTotalCount(rangesData.rangeList.length);
      setRanges(rangesData);
    }
  }, [rangesData, setTotalCount]);

  // initial set makes
  useEffect(() => {
    if (manufacturers?.manufacturerList && isAllMakesPage) {
      setTotalCount(manufacturers?.manufacturerList.length);
    }
  }, [manufacturers, setTotalCount, isAllMakesPage]);

  useEffect(() => {
    if (manufatcurersData?.manufacturerList && isAllMakesPage) {
      setManufacturers(manufatcurersData);
    }
  }, [manufatcurersData, setManufacturers, isAllMakesPage]);

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
          return getProductCacheCardData({
            variables: {
              capIds: responseCapIds,
              vehicleType: isCarSearch
                ? VehicleTypeEnum.CAR
                : VehicleTypeEnum.LCV,
            },
          });
        }
        return false;
      } catch {
        return false;
      }
    },
    12,
    lastCard,
    isPickups || isModelPage || isBodyStylePage ? manualBodyStyle : [],
  );

  // get vehicles to cache
  useEffect(() => {
    // don't make a request for cache in manufacture page
    if (
      lastCard &&
      !isMakePage &&
      hasNextPage &&
      shouldUpdateCache &&
      ((isRangePage && filtersData.rangeSlug) ||
        (isDynamicFilterPage && Object.values(filtersData).flat().length > 0) ||
        (isModelPage && filtersData.rangeSlug) ||
        isSpecialOfferPage ||
        isSimpleSearchPage)
    ) {
      setShouldUpdateCache(false);
      getVehiclesCache({
        variables: {
          vehicleTypes: isCarSearch
            ? [VehicleTypeEnum.CAR]
            : [VehicleTypeEnum.LCV],
          leaseType: isPersonal
            ? LeaseTypeEnum.PERSONAL
            : LeaseTypeEnum.BUSINESS,
          onOffer: !(isRangePage || isModelPage || isDynamicFilterPage)
            ? isSpecialOffers || null
            : null,
          after: lastCard,
          ...filtersData,
          sort: isSpecialOffersOrder
            ? [{ field: SortField.offerRanking, direction: SortDirection.ASC }]
            : sortOrder,
        },
      });
    }
  }, [
    lastCard,
    getVehiclesCache,
    isCarSearch,
    isSpecialOffers,
    isMakePage,
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

  // load more offers
  const onLoadMore = () => {
    setVehicleList([...vehiclesList, ...(cacheData?.vehicleList.edges || [])]);
    setCardsData(prevState => [...prevState, ...cardsDataCache]);
    // Chrome sroll down page after load new offers
    // using for prevent it
    setPageOffset(window.pageYOffset);
    if (vehiclesList.length < totalCount) {
      setLastCard(cacheData?.vehicleList.pageInfo.endCursor || '');
      setShouldUpdateCache(
        cacheData?.vehicleList.pageInfo.hasNextPage || false,
      );
    }
  };

  const tagArrayBuilderHelper = (
    entry: [string, string[]],
    filtersContainerData: IFilterList,
  ) => {
    // makes in make page should not to be added
    // makes, model, bodystyles in model page should not to be added
    // makes, model in range page should not to be added
    // bodyStyles/transmissions/fuels in body/transmission/fuel page should not to be added
    if (
      (entry[0] === FilterFields.from || entry[0] === FilterFields.to) &&
      entry[1]?.[0]
    ) {
      return {
        order: filterOrderByNumMap[entry[0]],
        value: isBudgetPage ? '' : `£${entry[1]}`,
      };
    }
    const value =
      ((isMakePage || isRangePage || isModelPage) &&
        entry[0] === FilterFields.make) ||
      ((isRangePage || isModelPage) && entry[0] === FilterFields.model) ||
      (isFuelPage && entry[0] === FilterFields.fuelTypes) ||
      (isTransmissionPage && entry[0] === FilterFields.transmissions) ||
      ((isModelPage || isBodyStylePage) && entry[0] === FilterFields.bodyStyles)
        ? ''
        : entry[1];

    // for make and model we should get label value
    return typeof value === 'string'
      ? {
          order: filterOrderByNumMap[entry[0]],
          value:
            (entry[0] === FilterFields.make ||
              entry[0] === FilterFields.model) &&
            value.length
              ? getLabelForSlug(
                  entry[1][0],
                  filtersContainerData,
                  entry[0] === FilterFields.make,
                )
              : value,
        }
      : value.map(v => ({
          order: filterOrderByNumMap[entry[0]],
          value: v,
        }));
  };
  // TODO: render must be refactored, some components should be moved to separate components
  // Some props should be contain in one param for achieve more readable code
  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
        <Heading tag="h1" size="xlarge" color="black" className="-mb-300">
          {isDesktopOrTablet
            ? metaData?.name
            : titleWithBreaks.map((line, idx) => (
                <React.Fragment key={String(idx)}>
                  {line} <br />
                </React.Fragment>
              ))}
        </Heading>

        <CommonDescriptionContainer pageData={pageData} />
      </div>

      {pageData && (
        <>
          {isModelPage && (
            <div className="row:text -columns">
              <div>
                <ReactMarkdown
                  className="markdown"
                  allowDangerousHtml
                  source={pageData?.genericPage.body || ''}
                  renderers={{
                    link: props => {
                      const { href, children } = props;
                      return (
                        <RouterLink
                          link={{ href, label: children }}
                          classNames={{ color: 'teal' }}
                        />
                      );
                    },
                    image: props => {
                      const { src, alt } = props;
                      return (
                        <img {...{ src, alt }} style={{ maxWidth: '100%' }} />
                      );
                    },
                    heading: props => (
                      <Text {...props} size="lead" color="darker" tag="h3" />
                    ),
                    paragraph: props => (
                      <Text {...props} tag="p" color="darker" />
                    ),
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}

      {!(isSpecialOfferPage && isCarSearch) && featured && (
        <ReadMoreBlock featured={featured} />
      )}

      {isAllMakesPage && topInfoSection && (
        <TopInfoBlock topInfoSection={topInfoSection} />
      )}
      {(isMakePage ||
        isSpecialOfferPage ||
        isRangePage ||
        isDynamicFilterPage) && (
        <TopOffersContainer
          isCarSearch={isCarSearch}
          shouldForceUpdate={shouldUpdateTopOffers}
          setShouldForceUpdate={setShouldUpdateTopOffers}
          isMakePage={isMakePage || false}
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
          preloadMake={preloadMake}
          preloadRange={preloadRange}
        />
      )}
      {!isMakePage &&
        !isSpecialOfferPage &&
        !isRangePage &&
        !isModelPage &&
        !isDynamicFilterPage &&
        !isAllMakesPage && (
          <div className="-mv-400 -stretch-left">
            <Checkbox
              id="specialOffer"
              label="View Special Offers Only"
              checked={isSpecialOffers}
              onChange={e => {
                onSaveSpecialOffersStatus(e.target.checked);
                setIsSpecialOffersOrder(e.target.checked);
              }}
            />
          </div>
        )}
      <div className="row:bg-light -xthin">
        <div className="row:search-filters">
          <FiltersContainer
            isPersonal={isPersonal}
            setType={value => setIsPersonal(value)}
            tagArrayBuilderHelper={tagArrayBuilderHelper}
            preLoadFilters={preLoadFiltersData}
            initialState={initialFiltersState}
            renderFilters={innerProps => (
              <SearchPageFilters
                onSearch={onSearch}
                isPersonal={isPersonal}
                isCarSearch={isCarSearch}
                isMakePage={isMakePage}
                isRangePage={isRangePage}
                isPickups={isPickups}
                preSearchVehicleCount={totalCount}
                isModelPage={isModelPage}
                isAllMakesPage={isAllMakesPage}
                isBodyPage={isBodyStylePage}
                isBudgetPage={isBudgetPage}
                isDynamicFilterPage={isDynamicFilterPage}
                isFuelPage={isFuelPage}
                isTransmissionPage={isTransmissionPage}
                isPreloadList={!!preLoadVehiclesList}
                setSearchFilters={setFiltersData}
                preLoadFilters={preLoadFiltersData}
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
          <Text color="darker" size="regular" tag="span">
            {`Showing ${totalCount} Results`}
          </Text>
          {!(isAllMakesPage || isMakePage) && (
            <SortOrder
              isSpecialOffersOrder={isSpecialOffersOrder}
              sortOrder={sortOrder[0]}
              onChangeSortOrder={onChangeSortOrder}
            />
          )}
          <div className="row:cards-3col">
            <ResultsContainer
              isMakePage={isMakePage}
              isAllMakesPage={isAllMakesPage}
              ranges={ranges}
              isPersonal={isPersonal}
              rangesUrls={rangesUrls}
              isCarSearch={isCarSearch}
              manufacturers={manufacturers}
              makesUrls={makesUrls}
              cardsData={cardsData}
              vehiclesList={vehiclesList}
              isModelPage={isModelPage}
            />
          </div>
          {!(isMakePage || isAllMakesPage) ? (
            <div className="pagination">
              {totalCount > vehiclesList?.length && (
                <Button
                  color="teal"
                  fill="outline"
                  label="Load More"
                  onClick={onLoadMore}
                  size="regular"
                  dataTestId="LoadMore"
                />
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {isSpecialOfferPage && isCarSearch && featured && (
        <ReadMoreBlock featured={featured} />
      )}

      {pageData?.genericPage?.sections?.featured2?.body && (
        <div className="row:text">
          <Heading tag="h2" size="large" color="black" className="-mb-300">
            {pageData.genericPage.sections.featured2.title}
          </Heading>
          <Text color="darker" size="regular" tag="div">
            <ReactMarkdown
              className="markdown"
              allowDangerousHtml
              source={pageData.genericPage.sections.featured2.body}
              renderers={{
                link: props => {
                  const { href, children } = props;
                  return (
                    <RouterLink
                      link={{ href, label: children }}
                      classNames={{ color: 'teal' }}
                    />
                  );
                },
                image: props => {
                  const { src, alt } = props;
                  return <img {...{ src, alt }} style={{ maxWidth: '100%' }} />;
                },
                heading: props => (
                  <Text {...props} size="lead" color="darker" tag="h3" />
                ),
                paragraph: props => <Text {...props} tag="p" color="darker" />,
              }}
            />
          </Text>
        </div>
      )}

      {isDynamicFilterPage && tiles?.tiles?.length && (
        <TilesBlock tiles={tiles} />
      )}

      {pageData && (
        <>
          {isRangePage ||
            (isDynamicFilterPage && (
              <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
                <div className={`row:text ${applyColumns}`}>
                  <ReactMarkdown
                    className="markdown"
                    source={pageData?.genericPage.body || ''}
                    allowDangerousHtml
                    renderers={{
                      link: props => {
                        const { href, children } = props;
                        return (
                          <RouterLink
                            link={{ href, label: children }}
                            classNames={{ color: 'teal' }}
                          />
                        );
                      },
                      heading: props => (
                        <Text {...props} size="lead" color="darker" tag="h3" />
                      ),
                      paragraph: props => (
                        <Text {...props} tag="p" color="darker" />
                      ),
                    }}
                  />
                </div>
              </LazyLoadComponent>
            ))}

          {!isDynamicFilterPage && tiles?.tiles?.length && (
            <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
              <TilesBlock tiles={tiles} />
            </LazyLoadComponent>
          )}

          {carousel?.cards?.length && (
            <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
              <div className="row:bg-lighter">
                <div className="row:carousel">
                  <Heading size="large" color="black" tag="h3">
                    {carousel.title}
                  </Heading>
                  <Carousel
                    countItems={carousel?.cards?.length || 0}
                    className="-col3"
                  >
                    {carousel?.cards.map(
                      (card, indx) =>
                        card && (
                          <Card
                            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                            key={`${card.name}_${indx.toString()}`}
                            className="card__article"
                            imageSrc={
                              card?.image?.file?.url ||
                              `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
                            }
                            title={{
                              title:
                                card.link?.legacyUrl || card.link?.url
                                  ? ''
                                  : card.title || '',
                              link: (
                                <RouterLink
                                  link={{
                                    href:
                                      card.link?.legacyUrl ||
                                      card.link?.url ||
                                      '',
                                    label: card.title || '',
                                  }}
                                  className="card--link"
                                  classNames={{
                                    color: 'black',
                                    size: 'regular',
                                  }}
                                />
                              ),
                            }}
                          >
                            <ReactMarkdown
                              className="markdown"
                              allowDangerousHtml
                              source={card.body || ''}
                              renderers={{
                                link: props => {
                                  const { href, children } = props;
                                  return (
                                    <RouterLink
                                      link={{ href, label: children }}
                                      classNames={{ color: 'teal' }}
                                    />
                                  );
                                },
                                heading: props => (
                                  <Text
                                    {...props}
                                    size="lead"
                                    color="darker"
                                    tag="h3"
                                  />
                                ),
                                paragraph: props => (
                                  <Text {...props} tag="p" color="darker" />
                                ),
                              }}
                            />
                            <RouterLink
                              link={{
                                href:
                                  card.link?.legacyUrl || card.link?.url || '',
                                label: card.link?.text || '',
                              }}
                              classNames={{ color: 'teal' }}
                            />
                          </Card>
                        ),
                    )}
                  </Carousel>
                </div>
              </div>
            </LazyLoadComponent>
          )}
        </>
      )}

      <div className="row:text">
        <Text color="darker" size="regular" tag="span">
          Photos and videos are for illustration purposes only.{' '}
          <RouterLink
            link={{
              href: '/legal/terms-and-conditions.html',
              label: 'Terms and conditions apply',
            }}
            classNames={{ color: 'teal' }}
          >
            Terms and conditions apply
          </RouterLink>
          .
        </Text>
      </div>
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={null} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export default SearchPageContainer;
