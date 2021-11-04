import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { GetConversionsVehicleList_conversions } from '../../../../generated/GetConversionsVehicleList';
import DerangedVehicleCard from '../../../components/DerangedVehicleCard/DerangedVehicleCard';
import Skeleton from '../../../components/Skeleton';
import DerangedModal from './components/DerangedModal';
import { ISelectedVehicle } from './interfaces';
import { DERANGED_FORM_DEFAULT_VALUES } from './constants';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  vehicleList: (GetConversionsVehicleList_conversions | null)[];
}

const DerangedVehicleSection: React.FC<IProps> = ({ vehicleList }) => {
  const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false);
  const [isFormSend, setIsFormSend] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<ISelectedVehicle>(
    DERANGED_FORM_DEFAULT_VALUES,
  );

  const handleClick = (
    imageSrc: string,
    title: string,
    description: string,
    conversionId?: number | null,
  ) => {
    const selectedCar = {
      imageSrc,
      title,
      description,
      conversionId,
    };
    setSelectedVehicle(selectedCar);
    setIsShowDrawer(true);
  };

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
          {vehicleList?.map(
            vehicle =>
              vehicle && (
                <DerangedVehicleCard
                  lazyLoad
                  key={`${vehicle?.conversionId || ''}${vehicle?.capId ||
                    ''}${vehicle?.vehicleType || ''}`}
                  title={{
                    title: `${vehicle?.manufacturerName} ${vehicle?.modelName}`,
                    description: vehicle?.derivativeName || '',
                  }}
                  data={vehicle}
                  handleClick={handleClick}
                />
              ),
          )}
        </div>
      </div>
      <DerangedModal
        setIsShowDrawer={setIsShowDrawer}
        isShowDrawer={isShowDrawer}
        isFormSend={isFormSend}
        setIsFormSend={setIsFormSend}
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
      />
    </section>
  );
};

export default React.memo(DerangedVehicleSection);
