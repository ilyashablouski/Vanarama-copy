import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Search from '@vanarama/uibook/lib/components/atoms/search';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import FiltersContainer from 'containers/FiltersContainer';
import withApollo from '../../hocs/withApollo';
import { getVehiclesList } from './gql';
import { useRouter } from 'next/router';
import VehicleCard from './VehicleCard';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { vehicleList_vehicleList_edges as IEdges } from '../../../generated/vehicleList';
import { VehicleTypeEnum } from '../../../generated/globalTypes';


const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Home', href: '/' },
  { label: 'Home', href: '/' },
];

const SearchPage: NextPage = () => {
  const { pathname, query } = useRouter();

  const [vehiclesList, setVehicleList] = useState([] as (IEdges | null)[] | null);
  const [lastCard, setLastCard] = useState('');
  const [isPersonal, setIsPersonal] = useState(true);

  const [getVehicles, {data}] = getVehiclesList([VehicleTypeEnum["LCV"]]);
  const [getVehiclesCache, {data: cacheData}] = getVehiclesList([VehicleTypeEnum["LCV"]], lastCard);

  useEffect(() => {
    getVehicles()
  }, [getVehicles]);

  useEffect(() => {
    if(data?.vehicleList) {
      setVehicleList(data.vehicleList.edges)
      setLastCard(data.vehicleList.pageInfo.endCursor || '')
    }
  }, [data, setVehicleList, setLastCard]);

  useEffect(() => {
    if(lastCard) getVehiclesCache();
  }, [lastCard]);

  const onLoadMore = () => {
    setVehicleList([...vehiclesList, ...cacheData.vehicleList.edges])
    setLastCard(cacheData?.vehicleList.pageInfo.endCursor || '')
  }

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
        <Checkbox id="specialOffer" label="View Special Offers Only" />
      </div>
      <div className="row:bg-light -xthin">
        <div className="row:search-filters">
          <FiltersContainer 
            isPersonal={isPersonal}
            setType={(value) => setIsPersonal(value)}
          />
        </div>
      </div>
      <div className="row:bg-lighter -thin">
        <div className="row:results">
          <Text color="darker" size="regular" tag="span">
            We just need some initial details for your credit check.
          </Text>
          <div className="row:cards-3col" >
            {vehiclesList?.map((vehicle) => (
              <VehicleCard
                key={vehicle.node.capCode}
                header={{
                  accentIcon: (
                    <Icon icon={<Flame />} color="white" className="md hydrated" />
                  ),
                  accentText: 'Hot Deal',
                  text: 'In Stock - 14-21 Days Delivery',
                }}

                title={{
                  title: '',
                  link: (
                    <a href="#" className="heading -large -black">
                      Peugeot 208
                    </a>
                  ),
                  description: '1.0 IG-T 100 Tekna 5dr Xtronic [Leather]',
                  score: 4.5,
                }}
                price={222}
            
            />
            ))}
            
          </div>
          <div className="pagination">
            <Button 
               color="teal"
               fill="outline"
               label="Load More"
               onClick={onLoadMore}
               size="regular"
            />
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
