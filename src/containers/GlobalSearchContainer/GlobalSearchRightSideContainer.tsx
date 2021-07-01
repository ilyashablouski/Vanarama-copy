import { useEffect, useState } from 'react';
import GlobalSearchCard from './GlobalSearchCard';
import { productDerivatives_productDerivatives_derivatives as ISuggestion } from '../../../generated/productDerivatives';
import RouterLink from '../../components/RouterLink/RouterLink';
import { IGSVehiclesCardsData } from '../GlobalSearchPageContainer/GlobalSearchPageContainer';
import { useGSCardsData } from './gql';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { GlobalSearchCardsData_productCard as ICardsData } from '../../../generated/GlobalSearchCardsData';
import DropdownNoResults from './DropdownNoResults';

interface IProps {
  suggestions: ISuggestion[];
  searchQuery: string;
  totalCount: number;
}

const GlobalSearchRightSideContainer = ({
  suggestions,
  searchQuery,
  totalCount,
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
        ?.filter(vehicle => vehicle.vehicle_type === VehicleTypeEnum.CAR)
        .map(vehicle => `${vehicle.derivative_id}`)
        .filter(value => value) as string[];
      const vansCapIds = suggestions
        ?.filter(vehicle => vehicle.vehicle_type === VehicleTypeEnum.LCV)
        .map(vehicle => `${vehicle.derivative_id}`)
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
      {totalCount === 0 ? (
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
                    `${data.derivative_id}`,
                    (data.vehicle_type as VehicleTypeEnum) ??
                      VehicleTypeEnum.LCV,
                  )}
                  key={
                    `${data?.derivative_id}` ||
                    `${data?.derivative_name}` ||
                    idx
                  }
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
