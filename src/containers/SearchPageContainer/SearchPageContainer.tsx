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
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { useRouter } from 'next/router';
import { useProductCardData } from '../CustomerAlsoViewedContainer/gql';
import { IFilters } from '../FiltersContainer/interfaces';
import FiltersContainer from '../FiltersContainer';
import VehicleCard from './VehicleCard';
import { getVehiclesList } from './gql';
import { vehicleList_vehicleList_edges as IVehicles } from '../../../generated/vehicleList';
import { VehicleTypeEnum, SortField } from '../../../generated/globalTypes';
import buildRewriteRoute from './helpers';
import { GetProductCard_productCard as IProductCard } from '../../../generated/GetProductCard';

interface IProps {
  isServer: boolean;
  isCarSearch: boolean;
}

const SearchPageContainer: React.FC<IProps> = ({
  isServer,
  isCarSearch,
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
  const [lastCard, setLastCard] = useState('');
  const [isPersonal, setIsPersonal] = useState(true);
  const [isSpecialOffers, setIsSpecialOffers] = useState(
    getValueFromStorage(isServer) ?? true,
  );
  const [totalCount, setTotalCount] = useState(0);

  const [filtersData, setFiltersData] = useState({});

  const { refetch, loading } = useProductCardData(
    capIds,
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
  );

  // get Caps ids for prodect card request
  const getCapsIds = (data: (IVehicles | null)[]) =>
    data.map(vehicle => vehicle?.node?.derivativeId || '') || [];

  // using onCompleted callback for request card data after vehicle list was loaded
  const [getVehicles, { data }] = getVehiclesList(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isSpecialOffers,
    async vehicles => {
      try {
        const responseCapIds = getCapsIds(vehicles.vehicleList?.edges || []);
        setCapsIds(responseCapIds);
        return await refetch({
          capIds: responseCapIds,
          vehicleType: isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
        }).then(resp => setCardsData(resp.data?.productCard || []));
      } catch {
        return false;
      }
    },
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
        }).then(resp => setCardsDataCache(resp.data?.productCard || []));
      } catch {
        return false;
      }
    },
    lastCard,
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
    const pathname = isCarSearch ? '/car-leasing' : '/van-leasing';
    // changing url dynamically
    router.replace(
      {
        query: buildRewriteRoute(filters as IFilters),
        pathname,
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    getVehicles();
  }, [getVehicles]);

  // prevent case when we navigate use back/forward button and useCallback return empty result list
  useEffect(() => {
    if (data && !cardsData.length && loading) {
      refetch({
        capIds: getCapsIds(data.vehicleList.edges || []),
        vehicleType: isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
      }).then(resp => setCardsData(resp.data?.productCard || []));
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
      setTotalCount(data.vehicleList.totalCount);
      setCapsIds(
        data.vehicleList?.edges?.map(
          vehicle => vehicle?.node?.derivativeId || '',
        ) || [],
      );
    }
  }, [data, setVehicleList, setLastCard, setTotalCount, setCapsIds]);

  // get vehicles to cache
  useEffect(() => {
    if (lastCard)
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
    if (vehiclesList.length < totalCount)
      setLastCard(cacheData?.vehicleList.pageInfo.endCursor || '');
  };

  /** save to sessions storage special offers status */
  const onSaveSpecialOffersStatus = (value: boolean) => {
    setIsSpecialOffers(value);
    sessionStorage.setItem(isCarSearch ? 'Car' : 'Vans', JSON.stringify(value));
  };

  const getCardData = (capId: string) => {
    return cardsData?.filter(card => card?.capId === capId)[0];
  };

  const viewOffer = (capId: string) => {
    const href = `${
      isCarSearch ? '/cars/car-details/' : '/vans/van-details/'
    }[capId]`;
    router.push(href, href.replace('[capId]', capId));
  };

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={crumbs} />
        <Heading tag="h1" size="xlarge" color="black">
          Lorem Ips
        </Heading>
        <Text color="darker" size="lead" />
      </div>
      <div className="-mv-400 -stretch-left">
        <Search />
        <Checkbox
          id="specialOffer"
          label="View Special Offers Only"
          checked={isSpecialOffers}
          onChange={e => onSaveSpecialOffersStatus(e.target.checked)}
        />
      </div>
      <div className="row:bg-light -xthin">
        <div className="row:search-filters">
          <FiltersContainer
            isPersonal={isPersonal}
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
              cardsData.length ? (
                vehiclesList?.map((vehicle: IVehicles) => (
                  <VehicleCard
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
                ))
              ) : (
                <></>
              ),
              [cardsData, isPersonal, totalCount],
            )}
          </div>
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
