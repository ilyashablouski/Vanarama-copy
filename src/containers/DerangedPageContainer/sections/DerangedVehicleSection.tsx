import React from 'react';
import dynamic from 'next/dynamic';
import { GetConversionsVehicleList_conversions } from '../../../../generated/GetConversionsVehicleList';
import DerangedVehicleCard from '../../../components/DerangedVehicleCard/DerangedVehicleCard';
import Skeleton from '../../../components/Skeleton';

interface IProps {
  vehicleList: (GetConversionsVehicleList_conversions | null)[];
}

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const DerangedVehicleSection: React.FC<IProps> = ({ vehicleList }) => {
  return (
    <section className="row:bg-light">
      <div className="row:lead-text">
        <Heading
          size="large"
          color="black"
          tag="h2"
          className="deranged--result-title"
        >
          Deranged Leasing Deals
        </Heading>
        <Text
          tag="span"
          size="regular"
          color="darker"
          className="deranged--result-subtitle"
        >
          Lease Deranged Today & Find Your New Lease Of Life
        </Text>
      </div>
      <div className="row:results">
        <div className="row:cards-3col">
          {vehicleList?.map(vehicle => (
            <DerangedVehicleCard
              lazyLoad
              key={`${vehicle?.conversionId || ''}${vehicle?.capId ||
                ''}${vehicle?.vehicleType || ''}`}
              title={{
                title: `${vehicle?.manufacturerName} ${vehicle?.modelName}`,
                description: vehicle?.derivativeName || '',
              }}
              data={vehicle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(DerangedVehicleSection);
