import { useEffect, useState } from 'react';
import GlobalSearchCard from './GlobalSearchCard';
import {
  fullTextSearchVehicleList_fullTextSearchVehicleList_aggregation as IFullTextSearchAggregation,
  fullTextSearchVehicleList_fullTextSearchVehicleList_vehicles as ISuggestion,
} from '../../../generated/fullTextSearchVehicleList';
import RouterLink from '../../components/RouterLink/RouterLink';
import { IGSVehiclesCardsData } from '../GlobalSearchPageContainer/GlobalSearchPageContainer';
import { useGSCardsData } from './gql';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { GlobalSearchCardsData_productCard as ICardsData } from '../../../generated/GlobalSearchCardsData';
import DropdownNoResults from './DropdownNoResults';
import { Nullable } from '../../types/common';

interface IProps {
  suggestions: ISuggestion[];
  searchQuery: string;
  aggregation: Nullable<IFullTextSearchAggregation>;
}

const GlobalSearchRightSideContainer = ({
  suggestions,
  searchQuery,
  aggregation,
}: IProps) => {
  const [lcvCardsData, setLcvCardsData] = useState<ICardsData[]>([]);
  const [carCardsData, setCarCardsData] = useState<ICardsData[]>([]);

  const vehiclesCardsData: IGSVehiclesCardsData<ICardsData[]> = {
    LCV: lcvCardsData,
    CAR: carCardsData,
  };

  const [getCarCardsData] = useGSCardsData(
    [''],
    VehicleTypeEnum.CAR,
    async data => {
      setCarCardsData(data.productCard as ICardsData[]);
    },
  );

  const [getLcvCardsData] = useGSCardsData(
    [''],
    VehicleTypeEnum.LCV,
    async data => {
      setLcvCardsData(data.productCard as ICardsData[]);
    },
  );

  useEffect(() => {
    if (suggestions.length) {
      const carsCapIds = suggestions
        ?.filter(vehicle => vehicle.vehicleType === VehicleTypeEnum.CAR)
        .map(vehicle => vehicle.derivativeId)
        .filter(value => value) as string[];
      const vansCapIds = suggestions
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
    }
  }, [getCarCardsData, getLcvCardsData, suggestions]);

  const getImgUrl = (capId: string, vehicleType: VehicleTypeEnum) => {
    return (
      vehiclesCardsData?.[vehicleType].find(x => x?.capId === capId)
        ?.imageUrl || ''
    );
  };

  return (
    <div className="header-search-results">
      {aggregation?.totalVehicles === 0 ? (
        <DropdownNoResults searchQuery={searchQuery} />
      ) : (
        <>
          <span className="heading -small -dark">Vehicle Deals</span>

          <div className="card-two-columns -animate">
            {suggestions.map((data, idx) => {
              return (
                <GlobalSearchCard
                  data={data}
                  imgUrl={getImgUrl(
                    data.derivativeId || '',
                    data.vehicleType || VehicleTypeEnum.LCV,
                  )}
                  key={data?.derivativeId || `${data?.derivativeName}` || idx}
                />
              );
            })}
          </div>
          <RouterLink
            className="view-all"
            link={{
              href: '/search',
              label: '',
              query: {
                searchTerm: searchQuery,
              },
            }}
          >
            View All
          </RouterLink>
        </>
      )}
    </div>
  );
};

export default GlobalSearchRightSideContainer;
