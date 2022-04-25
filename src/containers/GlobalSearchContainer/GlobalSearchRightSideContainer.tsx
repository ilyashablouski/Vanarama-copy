import React, { useEffect, useState } from 'react';
import Button from 'core/atoms/button';
import { useRouter } from 'next/router';
import GlobalSearchCard from './GlobalSearchCard';
import { productDerivatives_productDerivatives_derivatives as ISuggestion } from '../../../generated/productDerivatives';
import RouterLink from '../../components/RouterLink/RouterLink';
import { useGSCardsData } from './gql';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { GlobalSearchCardsData_productCard as ICardsData } from '../../../generated/GlobalSearchCardsData';
import DropdownNoResults from './DropdownNoResults';
import { IGSVehiclesCardsData } from './interfaces';

interface IProps {
  suggestions: ISuggestion[];
  searchQuery: string;
  dataUiTestId?: string;
}

const GlobalSearchRightSideContainer = ({
  suggestions,
  searchQuery,
  dataUiTestId,
}: IProps) => {
  const router = useRouter();

  const [lcvCardsData, setLcvCardsData] = useState<ICardsData[]>([]);
  const [carCardsData, setCarCardsData] = useState<ICardsData[]>([]);

  const vehiclesCardsData: IGSVehiclesCardsData<ICardsData[]> = {
    LCV: lcvCardsData,
    CAR: carCardsData,
  };

  const [getCarCardsData] = useGSCardsData(
    async data => {
      setCarCardsData(data.productCard as ICardsData[]);
    },
    [''],
    VehicleTypeEnum.CAR,
  );

  const [getLcvCardsData] = useGSCardsData(
    async data => {
      setLcvCardsData(data.productCard as ICardsData[]);
    },
    [''],
    VehicleTypeEnum.LCV,
  );

  useEffect(() => {
    if (suggestions.length) {
      const carsCapIds = suggestions
        ?.filter(vehicle => vehicle.vehicleType === VehicleTypeEnum.CAR)
        .map(vehicle => `${vehicle.derivativeId}`)
        .filter(value => value) as string[];
      const vansCapIds = suggestions
        ?.filter(vehicle => vehicle.vehicleType === VehicleTypeEnum.LCV)
        .map(vehicle => `${vehicle.derivativeId}`)
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
      vehiclesCardsData?.[vehicleType].find(vehicle => vehicle?.capId === capId)
        ?.imageUrl || ''
    );
  };

  return (
    <div className="header-search-results">
      {suggestions.length === 0 ? (
        <DropdownNoResults searchQuery={searchQuery} />
      ) : (
        <>
          <span className="heading -small -dark">Vehicle Deals</span>
          <div className="card-two-columns -animate">
            {suggestions.map((data, index) => {
              return (
                <GlobalSearchCard
                  data={data}
                  dataUiTestId={`${dataUiTestId}_product-card-${index}`}
                  imgUrl={getImgUrl(
                    `${data.derivativeId}`,
                    (data.vehicleType as VehicleTypeEnum) ??
                      VehicleTypeEnum.LCV,
                  )}
                  key={
                    `${data?.derivativeId}` ||
                    `${data?.derivativeName}` ||
                    index
                  }
                />
              );
            })}
          </div>
          <RouterLink
            className="view-all"
            dataUiTestId={`${dataUiTestId}_view-all-button`}
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

          <div className="header-search-results__bottom">
            <div className="hmc-promo">
              <p data-uitestid={`${dataUiTestId}_text_not-sure-which-car-best`}>
                Not Sure Which Car Is Best For You?
              </p>
              <Button
                color="teal"
                fill="solid"
                size="regular"
                label="Help Me Choose"
                onClick={() => router.push('/help-me-choose')}
                dataUiTestId={`${dataUiTestId}_button_help-me-choose`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalSearchRightSideContainer;
