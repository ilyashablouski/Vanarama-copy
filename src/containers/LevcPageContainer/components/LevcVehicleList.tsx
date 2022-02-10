import React from 'react';

import Heading from 'core/atoms/heading';

import { vehicleList_vehicleList_edges as IVehicle } from '../../../../generated/vehicleList';
import { GetProductCard_productCard as IProductCard } from '../../../../generated/GetProductCard';

import VehicleCard from '../../../components/VehicleCard';
import LevcVehicleCardHeader from './LevcVehicleCardHeader';

interface IProps {
  vehicleList: IVehicle[];
  productCardList: IProductCard[];
  accentTextColor: string;
  accentColor: string;
}

const LevcVehicleList: React.FC<IProps> = ({
  accentColor,
  accentTextColor,
  vehicleList,
  productCardList,
}) => {
  const getCardData = (capId: string, dataForCards = productCardList) =>
    dataForCards?.filter(card => card?.capId === capId)[0];

  return (
    <section className="row:bg-lighter">
      <div className="row:results">
        <div className="row:cards-3col">
          <Heading size="large" color="black" tag="h3">
            LEVC Vans
          </Heading>
          {vehicleList.map((vehicle, index) => (
            <VehicleCard
              dataUiTestId="levc-van-leasing_vehicle-card"
              key={vehicle.node?.derivativeId ?? index}
              derivativeId={vehicle.node?.derivativeId}
              data={getCardData(vehicle.node?.derivativeId ?? '')}
              url={(vehicle.node?.legacyUrl || vehicle.node?.url) ?? ''}
              title={{
                title: `${vehicle.node?.manufacturerName} ${vehicle.node?.modelName}`,
                description: vehicle.node?.derivativeName ?? '',
              }}
              isPersonalPrice={false}
              customCTAColor={accentColor}
              customCTATextColor={accentTextColor}
              customHeader={LevcVehicleCardHeader}
              isAccentHeader
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LevcVehicleList;
