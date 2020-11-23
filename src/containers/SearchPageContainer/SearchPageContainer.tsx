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
import Select from '@vanarama/uibook/lib/components/atoms/select';
import { findPreselectFilterValue } from '../FiltersContainer/helpers';
import useSortOrder from '../../hooks/useSortOrder';
import RouterLink from '../../components/RouterLink/RouterLink';
import TopOffersContainer from './TopOffersContainer';
import { useProductCardData } from '../CustomerAlsoViewedContainer/gql';
import { IFilters } from '../FiltersContainer/interfaces';
import FiltersContainer from '../FiltersContainer';
import { useVehiclesList, getRangesList, useManufacturerList } from './gql';
import VehicleCard from './VehicleCard';
import {
  vehicleList_vehicleList_edges as IVehicles,
  vehicleList as IVehiclesData,
} from '../../../generated/vehicleList';
import {
  VehicleTypeEnum,
  SortField,
  LeaseTypeEnum,
  SortDirection,
} from '../../../generated/globalTypes';
import {
  buildRewriteRoute,
  fuelMapper,
  getCapsIds,
  sortValues,
} from './helpers';
import {
  GetProductCard_productCard as IProductCard,
  GetProductCard,
} from '../../../generated/GetProductCard';
import RangeCard from './RangeCard';
import { GetDerivatives_derivatives } from '../../../generated/GetDerivatives';
import TopInfoBlock from './TopInfoBlock';
import { manufacturerPage_manufacturerPage_sections as sections } from '../../../generated/manufacturerPage';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_metaData as PageMetaData,
  GenericPageQuery_genericPage_sections_carousel as CarouselData,
  GenericPageQuery_genericPage_sections_tiles as Tiles,
} from '../../../generated/GenericPageQuery';
import { getFeaturedClassPartial } from '../../utils/layout';

import useLeaseType from '../../hooks/useLeaseType';
import { getLegacyUrl } from '../../utils/url';
import TileLink from '../../components/TileLink/TileLink';
import { getSectionsData } from '../../utils/getSectionsData';
import { rangeList } from '../../../generated/rangeList';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';
import { manufacturerList } from '../../../generated/manufacturerList';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

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
  pageData?: GenericPageQuery;
  metaData: PageMetaData;
  topInfoSection?: sections | null;
  preLoadFiltersData?: IFilterList | undefined;
  preLoadVehiclesList?: IVehiclesData;
  preLoadProductCardsData?: GetProductCard;
  preLoadResponseCapIds?: string[];
  preLoadRanges?: rangeList;
  preLoadManufacturers?: manufacturerList | null;
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
  pageData,
  metaData,
  topInfoSection,
  preLoadFiltersData,
  preLoadVehiclesList,
  preLoadProductCardsData,
  preLoadResponseCapIds,
  preLoadRanges,
  preLoadManufacturers,
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

  const [vehiclesList, setVehicleList] = useState(
    preLoadVehiclesList?.vehicleList.edges || ([] as any),
  );
  const [ranges, setRanges] = useState(preLoadRanges || ({} as rangeList));
  const [manufatcurers, setManufatcurers] = useState(
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
  const [carDerivativesCache, setCarDerivativesCache] = useState(
    [] as (GetDerivatives_derivatives | null)[],
  );
  const [carDer, setCarDerivatives] = useState(
    preLoadProductCardsData?.derivatives ||
      ([] as (GetDerivatives_derivatives | null)[]),
  );
  const [lastCard, setLastCard] = useState(
    preLoadVehiclesList?.vehicleList.pageInfo.endCursor || '',
  );
  const [hasNextPage, setHasNextPage] = useState(
    preLoadVehiclesList?.vehicleList?.pageInfo.hasNextPage ?? true,
  );

  const { cachedLeaseType, setCachedLeaseType } = useLeaseType(isCarSearch);
  const [isPersonal, setIsPersonal] = useState(cachedLeaseType === 'Personal');
  const [isSpecialOffers, setIsSpecialOffers] = useState(
    isSpecialOfferPage ? true : getValueFromStorage(isServer) ?? true,
  );
  const [totalCount, setTotalCount] = useState(
    isMakePage
      ? preLoadRanges?.rangeList?.length || 0
      : preLoadVehiclesList?.vehicleList.totalCount || 0,
  );
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

  // using onCompleted callback for request card data after vehicle list was loaded
  const [getVehicles, { data, called }] = useVehiclesList(
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
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
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
  const [getRanges, { data: rangesData }] = getRangesList(
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    router.query?.dynamicParam as string,
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
  );

  // Make list query for all makes page
  const [
    getManufacturerList,
    { data: manufatcurersData },
  ] = useManufacturerList(
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
  );

  // new search with new filters
  const onSearch = (filters = filtersData) => {
    // set search filters data
    setFiltersData(filters);
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
          sortField: isSpecialOffers ? SortField.offerRanking : sortOrder.type,
          sortDirection: isSpecialOffers
            ? SortDirection.ASC
            : sortOrder.direction,
          ...{
            bodyStyles:
              isPickups || isModelPage || isBodyStylePage
                ? (filters.bodyStyles[0] && filters.bodyStyles) ||
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
    // if it's simple search page with presave special offers param made new request for actual params
    if (
      !queryLength &&
      !getValueFromStorage() &&
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

  // force call getVehicles query if user press to checkbox after SSR and getVehicles instanse don't exist
  useEffect(() => {
    if (isSpecialOffers && !isSpecialOfferPage && !called) {
      // getVehicles();
    }
  }, [isSpecialOffers, called, getVehicles, isSpecialOfferPage]);

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
    if (rangesData?.rangeList) {
      setTotalCount(rangesData.rangeList.length);
      setRanges(rangesData);
    }
  }, [rangesData, setTotalCount]);

  // initial set makes
  useEffect(() => {
    if (manufatcurers?.manufacturerList && isAllMakesPage) {
      setTotalCount(manufatcurers?.manufacturerList.length);
    }
  }, [manufatcurers, setTotalCount, isAllMakesPage]);

  useEffect(() => {
    if (manufatcurersData?.manufacturerList && isAllMakesPage) {
      setManufatcurers(manufatcurersData);
    }
  }, [manufatcurersData, setManufatcurers, isAllMakesPage]);

  // get vehicles to cache
  useEffect(() => {
    // don't make a request for cache in manufacture page
    if (
      lastCard &&
      !isMakePage &&
      hasNextPage &&
      ((isRangePage && filtersData.rangeSlug) ||
        (isDynamicFilterPage && Object.values(filtersData).flat().length > 0) ||
        (isModelPage && filtersData.rangeSlug) ||
        isSpecialOfferPage ||
        isSimpleSearchPage)
    )
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

  // handler for changing sort dropdown
  const onChangeSortOrder = (value: string) => {
    const [type, direction] = value.split('_');
    setSortOrder({ type, direction });
    saveSortOrder({
      type: type as SortField,
      direction: direction as SortDirection,
    });
  };

  useFirstRenderEffect(() => {
    onSearch();
  }, [sortOrder]);

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
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  const [readmore, setReadMore] = useState(true);

  // TODO: render must be refactored, some components should be moved to separate components
  // Some props should be contain in one param for achieve more readable code
  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
      </div>
      <div className="row:title">
        <Heading tag="h1" size="xlarge" color="black" className="-mb-300">
          {(isModelPage &&
            metaData?.name?.slice(0, metaData?.name?.indexOf('Car Leasing'))) ||
            (metaData?.name ?? '')}
        </Heading>
        <Text color="darker" size="regular" tag="div">
          <ReactMarkdown
            className="markdown"
            allowDangerousHtml
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
                <Heading size="large" color="black" className="-mb-300">
                  {metaData?.name}
                </Heading>
              </div>
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
            </>
          )}
        </>
      )}

      {featured && (
        <div className={`row:${getFeaturedClassPartial(featured)}`}>
          {!featured?.layout?.includes('Full Width') && (
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              size="expand"
              src={featured.image?.file?.url || ''}
            />
          )}
          <div>
            <div
              style={{
                height:
                  featured?.layout?.includes('Read More') && readmore
                    ? featured?.defaultHeight || 100
                    : '',
                overflow: readmore ? 'hidden' : '',
              }}
            >
              <Heading
                tag={featured.titleTag || 'span'}
                size="large"
                color="black"
                className="-mb-300"
              >
                {featured.title}
              </Heading>
              <ReactMarkdown
                className="markdown"
                source={featured.body || ''}
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
                }}
              />
            </div>
            {featured?.layout?.includes('Read More') && (
              <Button
                size="small"
                color="teal"
                fill="clear"
                label={readmore ? 'Read More' : 'Read Less'}
                onClick={() => setReadMore(!readmore)}
              />
            )}
          </div>
        </div>
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
          manualBodyStyle={manualBodyStyle}
          preLoadVehiclesList={preLoadVehiclesList}
          preLoadProductCardsData={preLoadProductCardsData}
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
            isSpecialOffers={
              (isSpecialOffers &&
                !(isRangePage || isModelPage || isDynamicFilterPage)) ||
              null
            }
            setIsSpecialOffers={setIsSpecialOffers}
            isModelPage={isModelPage}
            isAllMakesPage={isAllMakesPage}
            isBodyPage={isBodyStylePage}
            isDynamicFilterPage={isDynamicFilterPage}
            isFuelPage={isFuelPage}
            isTransmissionPage={isTransmissionPage}
            sortOrder={sortOrder}
            isPreloadList={!!preLoadVehiclesList}
            setSearchFilters={setFiltersData}
            preLoadFilters={preLoadFiltersData}
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
                        title={range.rangeName || ''}
                        fromPrice={range.minPrice || undefined}
                        key={range.rangeId || index}
                        isPersonalPrice={isPersonal}
                        id={range.rangeId || ''}
                        vehicleType={
                          isCarSearch
                            ? VehicleTypeEnum.CAR
                            : VehicleTypeEnum.LCV
                        }
                      />
                    ))}
                  {isAllMakesPage &&
                    !!manufatcurers?.manufacturerList?.length &&
                    manufatcurers?.manufacturerList?.map((makeData, index) => (
                      <RangeCard
                        title={makeData.manufacturerName || ''}
                        fromPrice={makeData.minPrice || undefined}
                        key={makeData.manufacturerId || index}
                        isPersonalPrice={isPersonal}
                        id={makeData?.capId?.toString() || ''}
                        vehicleType={
                          isCarSearch
                            ? VehicleTypeEnum.CAR
                            : VehicleTypeEnum.LCV
                        }
                        isAllMakesCard
                      />
                    ))}
                </>
              ) : (
                !!cardsData.length &&
                  !!carDer.length &&
                  vehiclesList?.map((vehicle: IVehicles) => (
                    <VehicleCard
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
            <div className="row:text -columns">
              <div>
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
                                classNames={{ color: 'black', size: 'regular' }}
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
