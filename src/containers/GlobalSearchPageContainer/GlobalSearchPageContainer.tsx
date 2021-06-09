import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'core/atoms/button/Button';
import dynamic from 'next/dynamic';
import {
  fullTextSearchVehicleList as ITextSearchQuery,
  fullTextSearchVehicleList_fullTextSearchVehicleList_vehicles as IVehiclesList,
} from '../../../generated/fullTextSearchVehicleList';
import { productCardDataMapper } from './helpers';
import {
  useGSCardsData,
  useTextSearchList,
} from '../GlobalSearchContainer/gql';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_metaData as PageMetaData,
} from '../../../generated/GenericPageQuery';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import CommonDescriptionContainer from '../SearchPageContainer/CommonDescriptionContainer';
import { GlobalSearchCardsData_productCard as ICardsData } from '../../../generated/GlobalSearchCardsData';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import Skeleton from '../../components/Skeleton';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import { getSectionsData } from '../../utils/getSectionsData';
import SectionCards from '../../components/SectionCards';
import VehicleCard from '../../components/VehicleCard';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  pageData?: GenericPageQuery;
  metaData: PageMetaData;
  preLoadTextSearchList: ITextSearchQuery;
  carsData?: ICardsData[];
  vansData?: ICardsData[];
  responseVansCapIds?: string[];
  responseCarsCapIds?: string[];
}
export interface IGSVehiclesCardsData<T> {
  LCV: T;
  CAR: T;
}

const GlobalSearchPageContainer = ({
  preLoadTextSearchList,
  metaData,
  pageData,
  carsData,
  vansData,
  responseVansCapIds,
  responseCarsCapIds,
}: IProps) => {
  const router = useRouter();

  const [vehiclesList, setVehicleList] = useState<IVehiclesList[]>(
    preLoadTextSearchList.fullTextSearchVehicleList?.vehicles || [],
  );
  const [vehiclesListCache, setVehicleListCache] = useState<IVehiclesList[]>(
    [],
  );

  const [lcvCardsData, setLcvCardsData] = useState<ICardsData[]>(
    vansData || [],
  );
  const [carCardsData, setCarCardsData] = useState<ICardsData[]>(
    carsData || [],
  );

  const vehiclesCardsData: IGSVehiclesCardsData<ICardsData[]> = {
    LCV: lcvCardsData,
    CAR: carCardsData,
  };

  const [capIds] = useState<IGSVehiclesCardsData<string[]>>({
    LCV: responseVansCapIds || [],
    CAR: responseCarsCapIds || [],
  });

  const [totalResults] = useState(
    preLoadTextSearchList?.fullTextSearchVehicleList?.aggregation
      ?.totalVehicles || 0,
  );

  const [getCarCardsData] = useGSCardsData(
    capIds.CAR,
    VehicleTypeEnum.CAR,
    async data => {
      setCarCardsData(prevState => [
        ...prevState,
        ...(data.productCard as ICardsData[]),
      ]);
    },
  );

  const [getLcvCardsData] = useGSCardsData(
    capIds.LCV,
    VehicleTypeEnum.LCV,
    async data => {
      setLcvCardsData(prevState => [
        ...prevState,
        ...(data.productCard as ICardsData[]),
      ]);
    },
  );

  const [getVehiclesCache] = useTextSearchList(
    router.query.searchTerm as string,
    vehiclesList.length + 1,
    async vehicles => {
      const carsCapIds = vehicles?.fullTextSearchVehicleList?.vehicles
        ?.filter(vehicle => vehicle.vehicleType === VehicleTypeEnum.CAR)
        .map(vehicle => vehicle.derivativeId)
        .filter(value => value) as string[];
      const vansCapIds = vehicles?.fullTextSearchVehicleList?.vehicles
        ?.filter(vehicle => vehicle.vehicleType === VehicleTypeEnum.LCV)
        .map(vehicle => vehicle.derivativeId)
        .filter(value => value) as string[];
      if (carsCapIds[0]) {
        getCarCardsData({
          variables: {
            capIds: carsCapIds,
            vehicleType: VehicleTypeEnum.CAR,
          },
        });
      }
      if (vansCapIds[0]) {
        getLcvCardsData({
          variables: {
            capIds: vansCapIds,
            vehicleType: VehicleTypeEnum.LCV,
          },
        });
      }
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

  useFirstRenderEffect(() => {
    if (preLoadTextSearchList.fullTextSearchVehicleList?.vehicles) {
      setVehicleList(preLoadTextSearchList.fullTextSearchVehicleList?.vehicles);
      setCarCardsData(carsData || []);
      setLcvCardsData(vansData || []);
    }
  }, [preLoadTextSearchList]);

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

  const cards = useMemo(
    () =>
      getSectionsData(['sections', 'cards', 'cards'], pageData?.genericPage),
    [pageData],
  );

  const getProductCardData = (capId: string, vehicleType: VehicleTypeEnum) => {
    return vehiclesCardsData?.[vehicleType].find(x => x?.capId === capId);
  };

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
        <CommonDescriptionContainer pageData={pageData} />
        {totalResults === 0 && (
          <Text tag="p" color="black" size="lead" className="heading">
            0 results for your search “{router.query.searchTerm as string}”
            Search again, try our vehicle categories.
          </Text>
        )}
      </div>
      <div className="row:bg-lighter -thin">
        <div className="row:results">
          <div className="row:cards-3col">
            {vehiclesList?.map(vehicle => (
              <VehicleCard
                key={
                  (vehicle?.derivativeId || `${vehicle?.capBodyStyle}`) +
                    vehicle.vehicleType || ''
                }
                data={{
                  ...productCardDataMapper(vehicle),
                  ...getProductCardData(
                    vehicle.derivativeId || '',
                    vehicle.vehicleType || VehicleTypeEnum.LCV,
                  ),
                }}
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
      {totalResults === 0 && (
        <div className="row:bg-lighter -col-300">
          <div className="row:cards-3col">
            {cards && <SectionCards cards={cards} />}
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalSearchPageContainer;
