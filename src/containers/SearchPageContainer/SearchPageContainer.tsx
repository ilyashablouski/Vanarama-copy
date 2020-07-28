/* eslint-disable @typescript-eslint/camelcase */
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Search from '@vanarama/uibook/lib/components/atoms/search';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { useRouter } from 'next/router';
import { useProductCardData } from '../CustomerAlsoViewedContainer/gql';
import { IFilters } from '../FiltersContainer/interfaces';
import FiltersContainer from '../FiltersContainer';
import { getVehiclesList, getRangesList } from './gql';
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

interface IProps {
  isServer: boolean;
  isCarSearch: boolean;
  isMakePage?: boolean;
}

const SearchPageContainer: React.FC<IProps> = ({
  isServer,
  isCarSearch,
  isMakePage,
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
  const [isPersonal, setIsPersonal] = useState(true);
  const [isSpecialOffers, setIsSpecialOffers] = useState(
    getValueFromStorage(isServer) ?? true,
  );
  const [totalCount, setTotalCount] = useState(0);

  const [filtersData, setFiltersData] = useState<IFilters>({} as IFilters);

  const { refetch, loading } = useProductCardData(
    capIds,
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
  );

  // get Caps ids for product card request
  const getCapsIds = (data: (IVehicles | null)[]) =>
    data.map(vehicle => vehicle?.node?.derivativeId || '') || [];

  // using onCompleted callback for request card data after vehicle list was loaded
  const [getVehicles, { data }] = getVehiclesList(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isMakePage ? true : isSpecialOffers,
    async vehicles => {
      try {
        const responseCapIds = getCapsIds(vehicles.vehicleList?.edges || []);
        setCapsIds(responseCapIds);
        return await refetch({
          capIds: responseCapIds,
          vehicleType: isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
        }).then(resp => {
          setCardsData(resp.data?.productCard || []);
          setCarDerivatives(resp.data?.derivatives || []);
        });
      } catch {
        return false;
      }
    },
    isMakePage ? 6 : 9,
  );
  // using for cache request
  const [getVehiclesCache, { data: cacheData }] = getVehiclesList(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isSpecialOffers,
    async vehicles => {
      try {
        const responseCapIds = getCapsIds(vehicles.vehicleList?.edges || []);
        setCapsIds(responseCapIds);
        return await refetch({
          capIds: responseCapIds,
          vehicleType: isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
        }).then(resp => {
          setCardsDataCache(resp.data?.productCard || []);
          setCarDerivativesCache(resp.data?.derivatives || []);
        });
      } catch {
        return false;
      }
    },
    undefined,
    lastCard,
  );

  // Ranges list query for make page
  const [getRanges, { data: ranges }] = getRangesList(
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    router.query?.make as string,
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
  );

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: `${isCarSearch ? 'Car' : 'Vans'} Search`, href: '/' },
  ];

  const sortField = isSpecialOffers ? SortField.offerRanking : SortField.rate;

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
    } else {
      getVehicles({
        variables: {
          vehicleTypes: isCarSearch
            ? [VehicleTypeEnum.CAR]
            : [VehicleTypeEnum.LCV],
          onOffer: isSpecialOffers,
          ...filters,
          sortField,
        },
      });
    }

    let pathname = router.route
      .replace('[make]', router.query?.make as string)
      .replace('[model]', router.query?.model as string);
    const queryString = new URLSearchParams();
    const query = buildRewriteRoute(filters as IFilters, isMakePage);
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
    if (!queryLength || isMakePage) getVehicles();
    if (
      (queryLength === 1 && objectQuery[0] === 'bodyStyles') ||
      (isMakePage && queryLength === 1)
    ) {
      getVehicles({
        variables: {
          vehicleTypes: isCarSearch
            ? [VehicleTypeEnum.CAR]
            : [VehicleTypeEnum.LCV],
          onOffer: isMakePage ? true : isSpecialOffers,
          sortField: SortField.offerRanking,
          manufacturerName: isMakePage
            ? (router.query?.make as string)
            : (filtersData.manufacturerName as string),
          bodyStyles: router.query?.bodyStyles as string[],
        },
      });
      // if page mount without additional search params in query we made request
      // else request will be made after filters preselected
      if (isMakePage && queryLength < 2) getRanges();
    }
  }, [
    getVehicles,
    isCarSearch,
    isMakePage,
    router,
    setFiltersData,
    filtersData,
    getRanges,
    isSpecialOffers,
  ]);

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
      // use range lenght for manufacture page
      if (!isMakePage) setTotalCount(data.vehicleList.totalCount);
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
  ]);

  // initial set ranges
  useEffect(() => {
    if (ranges?.rangeList) {
      setTotalCount(ranges.rangeList.length);
    }
  }, [ranges, setTotalCount]);

  // get vehicles to cache
  useEffect(() => {
    // don't make a request for cache in manufacture page
    if (lastCard && !isMakePage)
      getVehiclesCache({
        variables: {
          vehicleTypes: isCarSearch
            ? [VehicleTypeEnum.CAR]
            : [VehicleTypeEnum.LCV],
          onOffer: isSpecialOffers,
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

  const getCardData = (capId: string) =>
    cardsData?.filter(card => card?.capId === capId)[0];

  const viewOffer = (productPageUrl: IProductPageUrl) => {
    sessionStorage.setItem('capId', productPageUrl.capId);
    router.push(productPageUrl.href, productPageUrl.url, { shallow: true });
  };

  // TODO: add logic when range page will complete
  const viewRange = () => {};

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={crumbs} />
        <Heading tag="h1" size="xlarge" color="black">
          Lorem Ips
        </Heading>
        <Text color="darker" size="lead" />
      </div>
      {isMakePage && vehiclesList.length > 3 && !!carDer.length && (
        <div className="row:bg-lighter">
          <div className="row:carousel">
            <Heading size="large" color="black" tag="h3">
              Top Offers
            </Heading>
            <Carousel
              className="-mh-auto"
              countItems={vehiclesList.length || 0}
            >
              {vehiclesList?.map((vehicle: IVehicles) => (
                <VehicleCard
                  dataDerivatives={carDer}
                  viewOffer={viewOffer}
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
                />
              ))}
            </Carousel>
          </div>
        </div>
      )}
      <div className="-mv-400 -stretch-left">
        {!isMakePage && (
          <>
            <Search />
            <Checkbox
              id="specialOffer"
              label="View Special Offers Only"
              checked={isSpecialOffers}
              onChange={e => onSaveSpecialOffersStatus(e.target.checked)}
            />
          </>
        )}
      </div>
      <div className="row:bg-light -xthin">
        <div className="row:search-filters">
          <FiltersContainer
            isPersonal={isPersonal}
            isMakePage={isMakePage}
            setType={value => setIsPersonal(value)}
            onSearch={onSearch}
            isCarSearch={isCarSearch}
            preSearchVehicleCount={totalCount}
            isSpecialOffers={isSpecialOffers}
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
              isMakePage
                ? !!ranges?.rangeList?.length &&
                    ranges?.rangeList?.map((range, index) => (
                      <RangeCard
                        viewRange={viewRange}
                        data={range}
                        key={range.rangeId || index}
                        isPersonalPrice={isPersonal}
                      />
                    ))
                : !!cardsData.length &&
                    !!carDer.length &&
                    vehiclesList?.map((vehicle: IVehicles) => (
                      <VehicleCard
                        viewOffer={viewOffer}
                        dataDerivatives={carDer}
                        key={
                          vehicle?.node?.derivativeId + vehicle?.cursor || ''
                        }
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
                      />
                    )),
              [cardsData, isPersonal, ranges, carDer],
            )}
          </div>
          {!isMakePage ? (
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
