import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Search from '@vanarama/uibook/lib/components/atoms/search';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import { useRouter } from 'next/router';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import FiltersContainer from '../FiltersContainer';
import VehicleCard from './VehicleCard';
import { getVehiclesList } from './gql';
import withApollo from '../../hocs/withApollo';
import {
  vehicleList_vehicleList_edges_node_financeProfiles as IFinanceProfile,
  vehicleList_vehicleList_edges as IVehicles,
} from '../../../generated/vehicleList';
import { VehicleTypeEnum } from '../../../generated/globalTypes';

const SearchPage: NextPage = () => {
  const { query } = useRouter();

  const [vehiclesList, setVehicleList] = useState([] as any);
  const [lastCard, setLastCard] = useState('');
  const [isPersonal, setIsPersonal] = useState(true);
  const [isSpecialOffers, setIsSpecialOffers] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [isCarSearchType, setCarSearchType] = useState(false);

  const [getVehicles, { data }] = getVehiclesList(
    isCarSearchType ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isSpecialOffers,
  );
  // using for cache request
  const [getVehiclesCache, { data: cacheData }] = getVehiclesList(
    isCarSearchType ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isSpecialOffers,
    lastCard,
  );

  // check for vehicle type search
  const isCarSearch = (value = '') => value.indexOf('car') > -1;
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: `${isCarSearchType ? 'Car' : 'Vans'} Search`, href: '/' },
  ];

  // made a first requeset after render
  useEffect(() => {
    if (query.search) {
      getVehicles();
      setCarSearchType(isCarSearch(query.search as string));
    }
  }, [getVehicles, query.search]);

  // initial set offers
  useEffect(() => {
    if (data?.vehicleList) {
      setVehicleList(data.vehicleList?.edges || []);
      setLastCard(data.vehicleList.pageInfo.endCursor || '');
      setTotalCount(data.vehicleList.totalCount);
    }
  }, [data, setVehicleList, setLastCard, setTotalCount]);

  // get vehicles to cache
  useEffect(() => {
    if (lastCard) getVehiclesCache();
  }, [lastCard, getVehiclesCache]);

  // load more offers
  const onLoadMore = () => {
    setVehicleList([...vehiclesList, ...(cacheData?.vehicleList.edges || [])]);
    if (vehiclesList.length < totalCount)
      setLastCard(cacheData?.vehicleList.pageInfo.endCursor || '');
  };

  // build price for offers
  const priceBuilder = (financeProfiles: IFinanceProfile[]): number | null => {
    let price = null;
    if (isPersonal) {
      financeProfiles.forEach(el => {
        if (el.leaseType === 'PERSONAL') price = el.rate;
      });
    } else {
      financeProfiles.forEach(el => {
        if (el.leaseType === 'BUSINESS') price = el.rate;
      });
    }

    return price;
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
          onChange={e => setIsSpecialOffers(e.target.checked)}
        />
      </div>
      <div className="row:bg-light -xthin">
        <div className="row:search-filters">
          <FiltersContainer
            isPersonal={isPersonal}
            setType={value => setIsPersonal(value)}
          />
        </div>
      </div>
      <div className="row:bg-lighter -thin">
        <div className="row:results">
          <Text color="darker" size="regular" tag="span">
            {`Showing ${totalCount} Results`}
          </Text>
          <div className="row:cards-3col">
            {vehiclesList?.map((vehicle: IVehicles) => (
              <VehicleCard
                key={vehicle?.node?.capCode || ''}
                header={{
                  accentIcon: (
                    <Icon
                      icon={<Flame />}
                      color="white"
                      className="md hydrated"
                    />
                  ),
                  accentText: 'Hot Deal',
                  text: 'In Stock - 14-21 Days Delivery',
                }}
                title={{
                  title: '',
                  link: (
                    <a href="/" className="heading -large -black">
                      {`${vehicle.node?.manufacturerName} ${vehicle.node?.modelName}`}
                    </a>
                  ),
                  description: vehicle.node?.derivativeName || '',
                  score: 4.5,
                }}
                price={priceBuilder(
                  vehicle.node?.financeProfiles as IFinanceProfile[],
                )}
              />
            ))}
          </div>
          <div className="pagination">
            {totalCount > vehiclesList?.length && (
              <Button
                color="teal"
                fill="outline"
                label="Load More"
                onClick={onLoadMore}
                size="regular"
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

export default withApollo(SearchPage);
