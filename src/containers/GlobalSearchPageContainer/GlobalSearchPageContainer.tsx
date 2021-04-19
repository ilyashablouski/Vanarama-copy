import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'core/atoms/button/Button';
import VehicleCard from '../SearchPageContainer/VehicleCard';
import {
  fullTextSearchVehicleList as ITextSearchQuery,
  fullTextSearchVehicleList_fullTextSearchVehicleList_vehicles as IVehiclesList,
} from '../../../generated/fullTextSearchVehicleList';
import { productCardDataMapper } from './helpers';
import { useTextSearchList } from '../GlobalSearchContainer/gql';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_metaData as PageMetaData,
} from '../../../generated/GenericPageQuery';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import CommonDescriptionContainer from '../SearchPageContainer/CommonDescriptionContainer';

interface IProps {
  pageData?: GenericPageQuery;
  metaData: PageMetaData;
  preLoadTextSearchList: ITextSearchQuery;
}
const GlobalSearchPageContainer = ({
  preLoadTextSearchList,
  metaData,
  pageData,
}: IProps) => {
  const router = useRouter();

  const [vehiclesList, setVehicleList] = useState<IVehiclesList[]>(
    preLoadTextSearchList.fullTextSearchVehicleList?.vehicles || [],
  );
  const [vehiclesListCache, setVehicleListCache] = useState<IVehiclesList[]>(
    [],
  );

  const [totalResults] = useState(
    preLoadTextSearchList?.fullTextSearchVehicleList?.aggregation
      ?.totalVehicles || 0,
  );

  const [getVehiclesCache] = useTextSearchList(
    router.query.searchTerm as string,
    vehiclesList.length + 1,
    async vehicles => {
      return setVehicleListCache(
        vehicles?.fullTextSearchVehicleList?.vehicles || [],
      );
    },
  );

  useEffect(() => {
    if (
      preLoadTextSearchList.fullTextSearchVehicleList?.vehicles?.length === 12
    ) {
      getVehiclesCache();
    }
  }, [getVehiclesCache, preLoadTextSearchList]);

  const onLoadMore = () => {
    setVehicleList(prevState => [...prevState, ...vehiclesListCache]);
    getVehiclesCache();
  };

  const breadcrumbsItems = useMemo(
    () =>
      metaData?.breadcrumbs?.map((el: any) => ({
        link: { href: el.href || '', label: el.label },
      })),
    [metaData],
  );

  const shouldLoadMore = useMemo(() => totalResults > vehiclesList.length, [
    totalResults,
    vehiclesList.length,
  ]);

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
        <CommonDescriptionContainer pageData={pageData} />
      </div>
      <div className="row:bg-lighter -thin">
        <div className="row:results">
          <div className="row:cards-3col">
            {vehiclesList?.map(vehicle => (
              <VehicleCard
                key={vehicle?.derivativeId || `${vehicle?.capBodyStyle}` || ''}
                data={productCardDataMapper(vehicle)}
                derivativeId={vehicle?.derivativeId}
                url={vehicle.legacyUrl || vehicle.lqUrl || ''}
                title={{
                  title: `${vehicle?.manufacturerName} ${vehicle?.modelName}`,
                  description: vehicle?.derivativeName || '',
                }}
                isPersonalPrice
              />
            ))}
          </div>
        </div>
      </div>
      {shouldLoadMore && (
        <div className="pagination">
          <Button
            color="teal"
            fill="outline"
            label="Load More"
            onClick={onLoadMore}
            size="regular"
            dataTestId="LoadMore"
          />
        </div>
      )}
    </>
  );
};

export default GlobalSearchPageContainer;
