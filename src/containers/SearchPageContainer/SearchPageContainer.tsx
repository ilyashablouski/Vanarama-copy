/* eslint-disable @typescript-eslint/camelcase */
/* 
  The first route param renamed to dynamicParam. 
  Because this route can be any filter value: make, bodystyle, transmission, fuel type.
  We define type of this params before page rendering in root page container,
  this query param should be using only with page type context for prevent any issues with it
*/
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useLazyQuery } from '@apollo/client';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import useSortOrder from '../../hooks/useSortOrder';
import { GENERIC_PAGE, GENERIC_PAGE_HEAD } from '../../gql/genericPage';
import RouterLink from '../../components/RouterLink/RouterLink';
import TopOffersContainer from './TopOffersContainer';
import { useProductCardData } from '../CustomerAlsoViewedContainer/gql';
import { IFilters } from '../FiltersContainer/interfaces';
import FiltersContainer from '../FiltersContainer';
import {
  useVehiclesList,
  getRangesList,
  useManufacturerList,
  GET_ALL_MAKES_PAGE,
} from './gql';
import VehicleCard, { IProductPageUrl } from './VehicleCard';
import { vehicleList_vehicleList_edges as IVehicles } from '../../../generated/vehicleList';
import {
  VehicleTypeEnum,
  SortField,
  LeaseTypeEnum,
  SortDirection,
} from '../../../generated/globalTypes';
import {
  buildRewriteRoute,
  prepareSlugPart,
  pageContentQueryExecutor,
  fuelMapper,
  getBodyStyleForCms,
  bodyUrls,
  sortValues,
} from './helpers';
import { GetProductCard_productCard as IProductCard } from '../../../generated/GetProductCard';
import RangeCard from './RangeCard';
import { GetDerivatives_derivatives } from '../../../generated/GetDerivatives';
import TopInfoBlock from './TopInfoBlock';
import {
  manufacturerPage_manufacturerPage_sections as sections,
  manufacturerPage,
} from '../../../generated/manufacturerPage';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
  GenericPageQuery_genericPage_metaData as PageMetaData,
  GenericPageQuery_genericPage_sections_carousel as CarouselData,
  GenericPageQuery_genericPage_sections_tiles as Tiles,
} from '../../../generated/GenericPageQuery';
import { getFeaturedClassPartial } from '../../utils/layout';
import {
  GenericPageHeadQuery,
  GenericPageHeadQueryVariables,
} from '../../../generated/GenericPageHeadQuery';
import useLeaseType from '../../hooks/useLeaseType';
import { LinkTypes } from '../../models/enum/LinkTypes';
import { getLegacyUrl, getNewUrl } from '../../utils/url';
import TileLink from '../../components/TileLink/TileLink';
import { getSectionsData } from '../../utils/getSectionsData';

interface IProps {
  isServer: boolean;
  isCarSearch?: boolean;
  isMakePage?: boolean;
  isSpecialOfferPage?: boolean;
  isPickups?: boolean;
  isRangePage?: boolean;
  isModelPage?: boolean;
  isAllMakesPage?: boolean;
  isBodyStylePage?: boolean;
  isTransmissionPage?: boolean;
  isFuelPage?: boolean;
}

const SearchPageContainer: React.FC<IProps> = ({
  isServer,
  isCarSearch = false,
  isMakePage,
  isSpecialOfferPage,
  isPickups,
  isRangePage,
  isModelPage,
  isAllMakesPage,
  isBodyStylePage,
  isTransmissionPage,
  isFuelPage,
}: IProps) => {
  const router = useRouter();
  const isDynamicFilterPage = useMemo(
    () => isBodyStylePage || isFuelPage || isTransmissionPage,
    [isBodyStylePage, isFuelPage, isTransmissionPage],
  );

  /** we storing the last value of special offers checkbox in Session storage */
  const getValueFromStorage = useCallback(
    (isServerCheck = false) => {
      // should check for server rendering, because it haven't Session storage
      const value = isServerCheck
        ? undefined
        : sessionStorage.getItem(isCarSearch ? 'Car' : 'Vans');
      return value ? JSON.parse(value) : undefined;
    },
    [isCarSearch],
  );

  const [vehiclesList, setVehicleList] = useState([] as any);

  const [capIds, setCapsIds] = useState([] as string[]);
  const [cardsDataCache, setCardsDataCache] = useState(
    [] as (IProductCard | null)[],
  );
  const [cardsData, setCardsData] = useState([] as (IProductCard | null)[]);
  const [carDerivativesCache, setCarDerivativesCache] = useState(
    [] as (GetDerivatives_derivatives | null)[],
  );
  const [carDer, setCarDerivatives] = useState(
    [] as (GetDerivatives_derivatives | null)[],
  );
  const [lastCard, setLastCard] = useState('');
  const [hasNextPage, setHasNextPage] = useState(true);

  const { cachedLeaseType, setCachedLeaseType } = useLeaseType(isCarSearch);
  const [isPersonal, setIsPersonal] = useState(cachedLeaseType === 'Personal');
  const [isSpecialOffers, setIsSpecialOffers] = useState(
    isSpecialOfferPage ? true : getValueFromStorage(isServer) ?? true,
  );
  const [totalCount, setTotalCount] = useState(0);
  const { savedSortOrder, saveSortOrder } = useSortOrder();
  const [sortOrder, setSortOrder] = useState(savedSortOrder);
  const [filtersData, setFiltersData] = useState<IFilters>({} as IFilters);

  useEffect(() => {
    const type = isPersonal ? 'Personal' : 'Business';
    setCachedLeaseType(type);
  }, [isPersonal, setCachedLeaseType]);

  const { refetch, loading } = useProductCardData(
    capIds,
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    !!capIds.length,
  );

  const manualBodyStyle = useMemo(() => {
    if (isPickups) return ['Pickup'];
    if (isModelPage) return [router.query?.bodyStyles as string];
    if (isBodyStylePage) {
      const bodyStyle = (router.query?.dynamicParam as string).replace(
        '-leasing',
        '',
      );
      // city-car is only one style with '-' we shouldn't to replace it
      return [
        bodyStyle.toLowerCase() === 'city-car'
          ? bodyStyle
          : bodyStyle.replace('-', ' '),
      ];
    }
    return [''];
  }, [isPickups, isModelPage, router.query, isBodyStylePage]);

  // get Caps ids for product card request
  const getCapsIds = (data: (IVehicles | null)[]) =>
    data.map(vehicle => vehicle?.node?.derivativeId || '') || [];

  // using onCompleted callback for request card data after vehicle list was loaded
  const [getVehicles, { data }] = useVehiclesList(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isMakePage || isDynamicFilterPage || isSpecialOfferPage
      ? true
      : isSpecialOffers || null,
    async vehicles => {
      try {
        const responseCapIds = getCapsIds(vehicles.vehicleList?.edges || []);
        setCapsIds(responseCapIds);
        if (responseCapIds.length) {
          return await refetch({
            capIds: responseCapIds,
            vehicleType: isCarSearch
              ? VehicleTypeEnum.CAR
              : VehicleTypeEnum.LCV,
          }).then(resp => {
            setCardsData(resp.data?.productCard || []);
            setCarDerivatives(resp.data?.derivatives || []);
          });
        }
        return false;
      } catch {
        return false;
      }
    },
    9,
    undefined,
    isPickups || isModelPage || isBodyStylePage ? manualBodyStyle : [],
  );
  // using for cache request
  const [getVehiclesCache, { data: cacheData }] = useVehiclesList(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isRangePage ? null : isSpecialOffers || null,
    async vehicles => {
      try {
        const responseCapIds = getCapsIds(vehicles.vehicleList?.edges || []);
        setCapsIds(responseCapIds);
        if (responseCapIds.length) {
          return await refetch({
            capIds: responseCapIds,
            vehicleType: isCarSearch
              ? VehicleTypeEnum.CAR
              : VehicleTypeEnum.LCV,
          }).then(resp => {
            setCardsDataCache(resp.data?.productCard || []);
            setCarDerivativesCache(resp.data?.derivatives || []);
          });
        }
        return false;
      } catch {
        return false;
      }
    },
    undefined,
    lastCard,
    isPickups || isModelPage || isBodyStylePage ? manualBodyStyle : [],
  );

  // Ranges list query for make page
  const [getRanges, { data: ranges }] = getRangesList(
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    router.query?.dynamicParam as string,
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
  );

  // Make list query for all makes page
  const [getManufacturerList, { data: manufatcurers }] = useManufacturerList(
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
  );

  // new search with new filters
  const onSearch = (filters = filtersData) => {
    // set search filters data
    setFiltersData(filters);
    if (isMakePage) {
      getRanges({
        variables: {
          vehicleTypes: isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
          leaseType: isPersonal
            ? LeaseTypeEnum.PERSONAL
            : LeaseTypeEnum.BUSINESS,
          ...filters,
          manufacturerName: router.query?.dynamicParam as string,
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
          onOffer,
          ...filters,
          sortField: isSpecialOffers ? SortField.offerRanking : sortOrder.type,
          sortDirection: isSpecialOffers
            ? SortDirection.ASC
            : sortOrder.direction,
          ...{
            bodyStyles:
              isPickups || isModelPage || isBodyStylePage
                ? manualBodyStyle
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
  };

  // API call after load new pages
  useEffect(() => {
    const objectQuery = Object.keys(router?.query || {});
    // prevent request with empty filters
    const queryLength = objectQuery.length;
    if ((!queryLength || isSpecialOfferPage) && !isAllMakesPage) getVehicles();
    // if page mount without additional search params in query we made request
    // else request will be made after filters preselected
    if (isMakePage && queryLength < 2) getRanges();
    if (isAllMakesPage && !queryLength) getManufacturerList();
    // disabled lint because we can't add router to deps
    // it's change every url replace
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getVehicles, isCarSearch, isMakePage, getRanges, isSpecialOfferPage]);

  // prevent case when we navigate use back/forward button and useCallback return empty result list
  useEffect(() => {
    if (data && !cardsData.length && loading) {
      refetch({
        capIds: getCapsIds(data.vehicleList.edges || []),
        vehicleType: isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
      }).then(resp => {
        setCardsData(resp.data?.productCard || []);
        setCarDerivatives(resp.data?.derivatives || []);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useLayoutEffect(() => {
    if (isServer) setIsSpecialOffers(getValueFromStorage() ?? true);
  }, [isServer, getValueFromStorage]);

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
      setHasNextPage(data.vehicleList.pageInfo.hasNextPage || false);
      // use range lenght for manufacture page
      if (!isMakePage && !isAllMakesPage)
        setTotalCount(data.vehicleList.totalCount);
      setCapsIds(
        data.vehicleList?.edges?.map(
          vehicle => vehicle?.node?.derivativeId || '',
        ) || [],
      );
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
    if (ranges?.rangeList) {
      setTotalCount(ranges.rangeList.length);
    }
  }, [ranges, setTotalCount]);

  // initial set makes
  useEffect(() => {
    if (manufatcurers?.manufacturerList && isAllMakesPage) {
      setTotalCount(manufatcurers?.manufacturerList.length);
    }
  }, [manufatcurers, setTotalCount, isAllMakesPage]);

  // get vehicles to cache
  useEffect(() => {
    // don't make a request for cache in manufacture page
    if (lastCard && !isMakePage && hasNextPage)
      getVehiclesCache({
        variables: {
          vehicleTypes: isCarSearch
            ? [VehicleTypeEnum.CAR]
            : [VehicleTypeEnum.LCV],
          onOffer: !(isRangePage || isModelPage || isDynamicFilterPage)
            ? isSpecialOffers || null
            : null,
          after: lastCard,
          ...filtersData,
          sortField: isSpecialOffers ? SortField.offerRanking : sortOrder.type,
          sortDirection: isSpecialOffers
            ? SortDirection.ASC
            : sortOrder.direction,
        },
      });
  }, [
    lastCard,
    getVehiclesCache,
    filtersData,
    isCarSearch,
    isSpecialOffers,
    isMakePage,
    hasNextPage,
    isRangePage,
    isModelPage,
    isDynamicFilterPage,
    sortOrder.direction,
    sortOrder.type,
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

  // handler for changing sort dropdown
  const onChangeSortOrder = (value: string) => {
    const [type, direction] = value.split('_');
    setSortOrder({ type, direction });
    saveSortOrder({
      type: type as SortField,
      direction: direction as SortDirection,
    });
  };

  // load more offers
  const onLoadMore = () => {
    setVehicleList([...vehiclesList, ...(cacheData?.vehicleList.edges || [])]);
    setCardsData(prevState => [...prevState, ...cardsDataCache]);
    setCarDerivatives(prevState => [...prevState, ...carDerivativesCache]);
    if (vehiclesList.length < totalCount)
      setLastCard(cacheData?.vehicleList.pageInfo.endCursor || '');
  };

  /** save to sessions storage special offers status */
  const onSaveSpecialOffersStatus = (value: boolean) => {
    setIsSpecialOffers(value);
    sessionStorage.setItem(isCarSearch ? 'Car' : 'Vans', JSON.stringify(value));
  };

  const getCardData = (capId: string, dataForCards = cardsData) =>
    dataForCards?.filter(card => card?.capId === capId)[0];

  const viewOffer = (productPageUrl: IProductPageUrl) => {
    sessionStorage.setItem('capId', productPageUrl.capId);
    router.push(productPageUrl.href, productPageUrl.url, { shallow: true });
  };
  /** navigate to Range Page */
  const viewRange = (range: string) => {
    const href = isCarSearch ? 'car-leasing' : 'van-leasing';
    const query = { make: router.query.dynamicParam };
    router.push(
      {
        pathname: `/${href}/[dynamicParam]/[rangeName]`,
        query,
      },
      `/${href}/${router.query.dynamicParam}/${range}`,
      { shallow: true },
    );
  };
  /** navigate to Model Page */
  const viewModel = (bodyStyle: string) => {
    const href = isCarSearch ? 'car-leasing' : 'van-leasing';
    const query = { make: router.query.dynamicParam };
    router.push(
      {
        pathname: `/${href}/[dynamicParam]/[rangeName]/[bodyStyles]`,
        query,
      },
      `/${href}/${router.query.dynamicParam}/${router.query.rangeName}/${bodyStyle}`,
      { shallow: true },
    );
  };
  /** navigate to Make Page */
  const viewMake = (make: string) => {
    if (make) {
      const href = isCarSearch ? 'car-leasing' : 'van-leasing';
      const query = { make: router.query.dynamicParam };
      router.push(
        {
          pathname: `/${href}/[dynamicParam]`,
          query,
        },
        `/${href}/${make}`,
        { shallow: true },
      );
    }
  };

  const [pageData, setPageData] = useState<GenericPageQuery>();
  const [metaData, setMetaData] = useState<PageMetaData>();
  const [topInfoSection, setTopInfoSection] = useState<sections | null>();

  const [getGenericPage] = useLazyQuery<
    GenericPageQuery,
    GenericPageQueryVariables
  >(GENERIC_PAGE, {
    onCompleted: result => {
      setPageData(result);
      setMetaData(result.genericPage.metaData);
    },
  });
  const [getGenericPageHead] = useLazyQuery<
    GenericPageHeadQuery,
    GenericPageHeadQueryVariables
  >(GENERIC_PAGE_HEAD, {
    onCompleted: result => {
      setMetaData(result.genericPage.metaData);
    },
  });
  const [getAllManufacturersPage] = useLazyQuery<manufacturerPage>(
    GET_ALL_MAKES_PAGE,
    {
      onCompleted: result => {
        setTopInfoSection(result.manufacturerPage.sections);
        setMetaData(result.manufacturerPage.metaData);
      },
    },
  );

  // made requests for different types of search pages
  useEffect(() => {
    const searchType = isCarSearch ? 'car-leasing' : 'van-leasing';
    const { query, pathname } = router;
    // remove first slash from route and build valid path
    const slug = pathname
      .slice(1, pathname.length)
      .replace('[dynamicParam]', (query.dynamicParam as string) || '')
      .replace('[rangeName]', (query.rangeName as string) || '')
      .replace('[bodyStyles]', (query.bodyStyles as string) || '');
    switch (true) {
      case isMakePage:
      case isRangePage:
      case isModelPage:
        pageContentQueryExecutor(getGenericPage, prepareSlugPart(slug));
        break;
      case isBodyStylePage:
        pageContentQueryExecutor(
          getGenericPage,
          `${searchType}/${prepareSlugPart(
            bodyUrls.find(
              getBodyStyleForCms,
              (query.dynamicParam as string).toLowerCase(),
            ) || '',
          )}${!isCarSearch ? '-leasing' : ''}`,
        );
        break;
      case isTransmissionPage:
        pageContentQueryExecutor(
          getGenericPage,
          'van-leasing/automatic-van-leasing',
        );
        break;
      case isFuelPage:
        pageContentQueryExecutor(getGenericPage, slug);
        break;
      case isSpecialOfferPage:
        pageContentQueryExecutor(
          getGenericPageHead,
          `${
            isCarSearch ? 'car-leasing' : 'pickup-truck-leasing'
          }/special-offers`,
        );
        break;
      case isAllMakesPage:
        getAllManufacturersPage();
        break;
      default:
        pageContentQueryExecutor(getGenericPage, `${searchType}/search`);
        break;
    }
    // router can't be added to deps, because it change every url replacing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCarSearch,
    isAllMakesPage,
    isSpecialOfferPage,
    isBodyStylePage,
    isTransmissionPage,
    isModelPage,
    isRangePage,
    isMakePage,
    isFuelPage,
    getGenericPage,
    getAllManufacturersPage,
    getGenericPageHead,
  ]);

  const tiles: Tiles = getSectionsData(
    ['sections', 'tiles'],
    pageData?.genericPage,
  );
  const carousel: CarouselData = getSectionsData(
    ['sections', 'carousel'],
    pageData?.genericPage,
  );
  const featured = getSectionsData(
    ['sections', 'featured'],
    pageData?.genericPage,
  );

  // TODO: render must be refactored, some components should be moved to separate components
  // Some props should be contain in one param for achieve more readable code
  return (
    <>
      <div className="row:title">
        <Heading tag="h1" size="xlarge" color="black">
          {(isModelPage &&
            `${filtersData.manufacturerName} ${filtersData.rangeName} ${filtersData.bodyStyles?.[0]}`) ||
            (metaData?.name ?? '')}
        </Heading>
        <Text color="darker" size="regular" tag="div">
          <ReactMarkdown
            escapeHtml={false}
            source={pageData?.genericPage.intro || ''}
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
      {pageData && (
        <>
          {isModelPage && (
            <>
              <div className="row:title">
                <Heading size="large" color="black">
                  {metaData?.name}
                </Heading>
              </div>
              <div className="row:text -columns">
                <div>
                  <ReactMarkdown
                    escapeHtml={false}
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
            </>
          )}
        </>
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
          isMakePage={isMakePage || false}
          isBodyPage={isBodyStylePage || false}
          isTransmissionPage={isTransmissionPage || false}
          isDynamicFilterPage={isDynamicFilterPage || false}
          isFuelPage={isFuelPage || false}
          isPersonal={isPersonal}
          isRangePage={isRangePage || false}
          isPickups={isPickups || false}
          isSpecialOfferPage={isSpecialOfferPage || false}
          viewOffer={viewOffer}
          viewModel={viewModel}
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
              onChange={e => onSaveSpecialOffersStatus(e.target.checked)}
            />
          </div>
        )}
      <div className="row:bg-light -xthin">
        <div className="row:search-filters">
          <FiltersContainer
            isPersonal={isPersonal}
            isMakePage={isMakePage}
            isRangePage={isRangePage}
            setType={value => setIsPersonal(value)}
            onSearch={onSearch}
            isPickups={isPickups}
            isCarSearch={isCarSearch}
            preSearchVehicleCount={totalCount}
            isSpecialOffers={isSpecialOffers || null}
            setIsSpecialOffers={setIsSpecialOffers}
            isModelPage={isModelPage}
            isAllMakesPage={isAllMakesPage}
            isBodyPage={isBodyStylePage}
            isDynamicFilterPage={isDynamicFilterPage}
            isFuelPage={isFuelPage}
            isTransmissionPage={isTransmissionPage}
            sortOrder={sortOrder}
          />
        </div>
      </div>
      <div className="row:bg-lighter -thin">
        <div className="row:results">
          <Text color="darker" size="regular" tag="span">
            {`Showing ${totalCount} Results`}
          </Text>
          {!(isAllMakesPage && isMakePage) && (
            <Select
              value={`${sortOrder.type}_${sortOrder.direction}`}
              onChange={e => onChangeSortOrder(e.target.value)}
              disabled={isSpecialOffers}
            >
              {sortValues.map(option => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </Select>
          )}
          <div className="row:cards-3col">
            {useCallback(
              isMakePage || isAllMakesPage ? (
                <>
                  {isMakePage &&
                    !!ranges?.rangeList?.length &&
                    ranges?.rangeList?.map((range, index) => (
                      <RangeCard
                        onView={() => viewRange(range.rangeName || '')}
                        title={range.rangeName || ''}
                        fromPrice={range.minPrice || undefined}
                        key={range.rangeId || index}
                        isPersonalPrice={isPersonal}
                        id={range.rangeId || ''}
                      />
                    ))}
                  {isAllMakesPage &&
                    !!manufatcurers?.manufacturerList?.length &&
                    manufatcurers?.manufacturerList?.map((makeData, index) => (
                      <RangeCard
                        onView={() => viewMake(makeData.manufacturerName || '')}
                        title={makeData.manufacturerName || ''}
                        fromPrice={makeData.minPrice || undefined}
                        key={makeData.manufacturerId || index}
                        isPersonalPrice={isPersonal}
                        id={makeData?.capId?.toString() || ''}
                        isAllMakesCard
                      />
                    ))}
                </>
              ) : (
                !!cardsData.length &&
                  !!carDer.length &&
                  vehiclesList?.map((vehicle: IVehicles) => (
                    <VehicleCard
                      viewOffer={viewOffer}
                      bodyStyle={
                        router.query?.bodyStyles === 'Pickup' ? 'Pickup' : null
                      }
                      key={vehicle?.node?.derivativeId + vehicle?.cursor || ''}
                      data={
                        getCardData(
                          vehicle.node?.derivativeId || '',
                        ) as IProductCard
                      }
                      derivativeId={vehicle.node?.derivativeId}
                      url={getLegacyUrl(
                        vehiclesList,
                        vehicle.node?.derivativeId,
                      )}
                      appUrl={getNewUrl(
                        vehiclesList,
                        vehicle.node?.derivativeId,
                      )}
                      title={{
                        title: '',
                        description: vehicle.node?.derivativeName || '',
                      }}
                      isPersonalPrice={isPersonal}
                      isModelPage={isModelPage}
                    />
                  ))
              ),
              [cardsData, isPersonal, ranges, carDer, totalCount],
            )}
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
      {!pageData && isRangePage && <Loading size="large" />}

      {isDynamicFilterPage && (
        <div className="row:features-4col">
          {tiles?.tiles?.length &&
            tiles.tiles.map((tile, indx) => (
              <Tile
                plain
                className="-align-center -button"
                key={`${tile.title}_${indx.toString()}`}
              >
                <span>
                  <Image
                    optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                    src={tile.image?.file?.url || ''}
                    inline
                    round
                    size="large"
                  />
                </span>
                <TileLink tile={tile} />
                <Text color="darker" size="regular">
                  {tile.body}
                </Text>
              </Tile>
            ))}
        </div>
      )}

      {pageData && (
        <>
          {(isRangePage || isDynamicFilterPage) && (
            <>
              <div className="row:title">
                <Heading size="large" color="black">
                  {metaData?.name}
                </Heading>
              </div>
              <div className="row:text -columns">
                <div>
                  <ReactMarkdown
                    source={pageData?.genericPage.body || ''}
                    escapeHtml={false}
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
              </div>
            </>
          )}
          {featured && (
            <div className={`row:${getFeaturedClassPartial(featured)}`}>
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                size="expand"
                src={featured.image?.file?.url || ''}
              />
              <div>
                <Heading tag="span" size="large" color="black">
                  {featured.title}
                </Heading>
                <ReactMarkdown
                  source={featured.body || ''}
                  escapeHtml={false}
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
            </div>
          )}

          {tiles && !isDynamicFilterPage && (
            <div className="row:features-4col">
              {tiles?.tiles?.length &&
                tiles.tiles.map((tile, indx) => (
                  <Tile
                    plain
                    className="-align-center -button"
                    key={`${tile.title}_${indx.toString()}`}
                  >
                    <span>
                      <Image
                        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                        src={tile.image?.file?.url || ''}
                        inline
                        round
                        size="large"
                      />
                    </span>
                    <TileLink tile={tile} />
                    <Text color="darker" size="regular">
                      {tile.body}
                    </Text>
                  </Tile>
                ))}
            </div>
          )}

          {carousel?.cards?.length && (
            <div className="row:bg-lighter ">
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
                          imageSrc={card?.image?.file?.url || ''}
                          title={{
                            title: card.link?.url ? '' : card.title || '',
                            link: (
                              <RouterLink
                                link={{
                                  href: card.link?.url || '',
                                  label: card.title || '',
                                  linkType: card.link?.url?.match('http')
                                    ? LinkTypes.external
                                    : '',
                                }}
                                className="card--link"
                                classNames={{ color: 'black', size: 'regular' }}
                              />
                            ),
                          }}
                        >
                          <ReactMarkdown
                            escapeHtml={false}
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
                              href: card.link?.url || '',
                              label: card.link?.text || '',
                              linkType: card.link?.url?.match('http')
                                ? LinkTypes.external
                                : '',
                            }}
                            classNames={{ color: 'teal' }}
                          />
                        </Card>
                      ),
                  )}
                </Carousel>
              </div>
            </div>
          )}
        </>
      )}
      <div className="row:text">
        <Text color="darker" size="regular" tag="span">
          Photos and videos are for illustration purposes only.
        </Text>
      </div>
    </>
  );
};

export default SearchPageContainer;
