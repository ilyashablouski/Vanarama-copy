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
import { useProductCardData } from '../CustomerAlsoViewedContainer/gql';
import { IFilters } from '../FiltersContainer/interfaces';
import FiltersContainer from '../FiltersContainer';
import VehicleCard from './VehicleCard';
import { getVehiclesList } from './gql';
import {
  vehicleList_vehicleList_edges_node_financeProfiles as IFinanceProfile,
  vehicleList_vehicleList_edges as IVehicles,
} from '../../../generated/vehicleList';
import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';
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

  const { refetch } = useProductCardData(
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
        return await refetch({
          capIds: getCapsIds(vehicles.vehicleList?.edges || []),
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
        return await refetch({
          capIds: getCapsIds(vehicles.vehicleList?.edges || []),
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
      },
    });
    // we should make 2 call for clear all queries
    // because it's easy way for remove params
    window.history.replaceState({}, '', '/');
    window.history.replaceState(
      {},
      '',
      buildRewriteRoute(filters as IFilters, isCarSearch),
    );
  };

  useEffect(() => {
    getVehicles();
  }, [getVehicles]);

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
        },
      });
  }, [lastCard, getVehiclesCache, filtersData, isCarSearch, isSpecialOffers]);

  // get vehicles to cache
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

  // build price for offers
  const priceBuilder = (financeProfiles: IFinanceProfile[]): number | null => {
    const leaseType = isPersonal
      ? LeaseTypeEnum.PERSONAL
      : LeaseTypeEnum.BUSINESS;
    const financeProfile = financeProfiles.find(
      el => el.leaseType === leaseType,
    );
    return financeProfile?.rate || null;
  };

  /** save to sessions storage special offers status */
  const onSaveSpecialOffersStatus = (value: boolean) => {
    setIsSpecialOffers(value);
    sessionStorage.setItem(isCarSearch ? 'Car' : 'Vans', JSON.stringify(value));
  };

  const getCardData = (capId: string) => {
    return cardsData?.filter(card => card?.capId === capId)[0];
  };

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={crumbs} />
        <Heading tag="h1" size="xlarge" color="black">
          Lorem Ips
        </Heading>
        <Text color="darker" size="lead">
          We just need some initial details for your credit check.
        </Text>
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
              vehiclesList?.map((vehicle: IVehicles) => (
                <VehicleCard
                  key={vehicle?.node?.derivativeId || ''}
                  data={
                    getCardData(
                      vehicle.node?.derivativeId || '',
                    ) as IProductCard
                  }
                  title={{
                    title: '',
                    link: (
                      <a href="/" className="heading -large -black">
                        {`${vehicle.node?.manufacturerName} ${vehicle.node?.modelName}`}
                      </a>
                    ),
                    description: vehicle.node?.derivativeName || '',
                  }}
                  price={priceBuilder(
                    vehicle.node?.financeProfiles as IFinanceProfile[],
                  )}
                />
              )),
              [cardsData],
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
          We just need some initial details for your credit check.
        </Text>
      </div>
    </>
  );
};

export default SearchPageContainer;
