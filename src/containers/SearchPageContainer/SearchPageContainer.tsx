/* eslint-disable @typescript-eslint/camelcase */
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { useRouter } from 'next/router';
import TopOffersContainer from './TopOffersContainer';
import { useProductCardData } from '../CustomerAlsoViewedContainer/gql';
import { IFilters } from '../FiltersContainer/interfaces';
import FiltersContainer from '../FiltersContainer';
import { getVehiclesList, getRangesList, useManufacturerList } from './gql';
import VehicleCard, { IProductPageUrl } from './VehicleCard';
import { vehicleList_vehicleList_edges as IVehicles } from '../../../generated/vehicleList';
import {
  VehicleTypeEnum,
  SortField,
  LeaseTypeEnum,
} from '../../../generated/globalTypes';
import buildRewriteRoute from './helpers';
import { GetProductCard_productCard as IProductCard } from '../../../generated/GetProductCard';
import RangeCard from './RangeCard';
import { GetDerivatives_derivatives } from '../../../generated/GetDerivatives';
import useLeaseType from '../../hooks/useLeaseType';

interface IProps {
  isServer: boolean;
  isCarSearch?: boolean;
  isMakePage?: boolean;
  isSpecialOfferPage?: boolean;
  isPickups?: boolean;
  isRangePage?: boolean;
  isModelPage?: boolean;
  isAllMakesPage?: boolean;
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
}: IProps) => {
  const router = useRouter();
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

  const { getCachedLeaseType, setCachedLeaseType } = useLeaseType();
  const [isPersonal, setIsPersonal] = useState(
    getCachedLeaseType() === 'Personal',
  );
  const [isSpecialOffers, setIsSpecialOffers] = useState(
    isSpecialOfferPage ? true : getValueFromStorage(isServer) ?? true,
  );
  const [totalCount, setTotalCount] = useState(0);

  const [filtersData, setFiltersData] = useState<IFilters>({} as IFilters);

  useEffect(() => {
    const type = isPersonal ? 'Personal' : 'Business';
    setCachedLeaseType(type);
    getCachedLeaseType();
    // eslint-disable-next-line no-console
    console.log(getCachedLeaseType() === 'Personal');
  }, [isPersonal, getCachedLeaseType, setCachedLeaseType]);

  const { refetch, loading } = useProductCardData(
    capIds,
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    true,
  );

  const manualBodyStyle = useMemo(() => {
    if (isPickups) return ['Pickup'];
    if (isModelPage) return [router.query?.bodyStyles as string];
    return [''];
  }, [isPickups, isModelPage, router.query]);

  // get Caps ids for product card request
  const getCapsIds = (data: (IVehicles | null)[]) =>
    data.map(vehicle => vehicle?.node?.derivativeId || '') || [];

  // using onCompleted callback for request card data after vehicle list was loaded
  const [getVehicles, { data }] = getVehiclesList(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isMakePage || isSpecialOfferPage ? true : isSpecialOffers || null,
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
    isPickups || isModelPage ? manualBodyStyle : [],
  );
  // using for cache request
  const [getVehiclesCache, { data: cacheData }] = getVehiclesList(
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
    isPickups || isModelPage ? manualBodyStyle : [],
  );

  // Ranges list query for make page
  const [getRanges, { data: ranges }] = getRangesList(
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    router.query?.make as string,
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
  );

  // Make list query for all makes page
  const [getManufacturerList, { data: manufatcurers }] = useManufacturerList(
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
  );

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: `${isCarSearch ? 'Car' : 'Vans'} Search`, href: '/' },
  ];

  const sortField =
    !isRangePage && isSpecialOffers ? SortField.offerRanking : SortField.rate;

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
          manufacturerName: router.query?.make as string,
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
      if (isRangePage || isModelPage) onOffer = null;
      else onOffer = isSpecialOfferPage ? true : isSpecialOffers || null;
      getVehicles({
        variables: {
          vehicleTypes: isCarSearch
            ? [VehicleTypeEnum.CAR]
            : [VehicleTypeEnum.LCV],
          onOffer,
          ...filters,
          sortField,
          ...{
            bodyStyles:
              isPickups || isModelPage ? manualBodyStyle : filters.bodyStyles,
          },
        },
      });
    }

    let pathname = router.route
      .replace('[make]', router.query?.make as string)
      .replace('[rangeName]', router.query?.rangeName as string)
      .replace('[bodyStyles]', router.query?.bodyStyles as string);
    const queryString = new URLSearchParams();
    // don't add range and make to query for make/range pages
    const query = buildRewriteRoute(
      filters as IFilters,
      isMakePage || isRangePage,
      isModelPage,
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

  // initial set offers
  useEffect(() => {
    if (data?.vehicleList) {
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
          onOffer: !(isRangePage || isModelPage)
            ? isSpecialOffers || null
            : null,
          after: lastCard,
          ...filtersData,
          sortField,
        },
      });
  }, [
    lastCard,
    getVehiclesCache,
    filtersData,
    isCarSearch,
    isSpecialOffers,
    sortField,
    isMakePage,
    hasNextPage,
    isRangePage,
    isModelPage,
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
    router.push(
      `/${href}/[make]/[rangeName]`,
      `/${href}/${router.query.make}/${range}`,
    );
  };
  /** navigate to Model Page */
  const viewModel = (bodyStyle: string) => {
    const href = isCarSearch ? 'car-leasing' : 'van-leasing';
    router.push(
      `/${href}/[make]/[rangeName]/[bodyStyles]`,
      `/${href}/${router.query.make}/${router.query.rangeName}/${bodyStyle}`,
    );
  };
  /** navigate to Make Page */
  const viewMake = (make: string) => {
    if (make) {
      const href = isCarSearch ? 'car-leasing' : 'van-leasing';
      router.push(`/${href}/[make]`, `/${href}/${make}`);
    }
  };

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={crumbs} />
        <Heading tag="h1" size="xlarge" color="black">
          {isModelPage
            ? `${filtersData.manufacturerName} ${filtersData.rangeName} ${filtersData.bodyStyles?.[0]}`
            : 'Lorem Ips'}
        </Heading>
        <Text color="darker" size="lead" />
      </div>
      {(isMakePage || isSpecialOfferPage || isRangePage) && (
        <TopOffersContainer
          isCarSearch={isCarSearch}
          isMakePage={isMakePage || false}
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
            isModelPage={isModelPage}
            isAllMakesPage={isAllMakesPage}
          />
        </div>
      </div>
      <div className="row:bg-lighter -thin">
        <div className="row:results">
          <Text color="darker" size="regular" tag="span">
            {`Showing ${totalCount} Results`}
          </Text>
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
                      dataDerivatives={carDer}
                      key={vehicle?.node?.derivativeId + vehicle?.cursor || ''}
                      data={
                        getCardData(
                          vehicle.node?.derivativeId || '',
                        ) as IProductCard
                      }
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
      <div className="row:text">
        <Text color="darker" size="regular" tag="span">
          Photos and videos are for illustration purposes only.
        </Text>
      </div>
    </>
  );
};

export default SearchPageContainer;
