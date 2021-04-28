import dynamic from 'next/dynamic';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import ComparatorTable from 'core/organisms/comparator-table';
import Router from 'next/router';
import { CompareContext, INIT_VEHICLE } from '../../utils/comparatorTool';
import {
  getVehiclesIds,
  getCriterials,
} from '../../utils/comparatorTableHelpers';
import { useVehicleData } from './gql';
import { vehicleComparator } from '../../../generated/vehicleComparator';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import Skeleton from '../../components/Skeleton';
import useLeaseType from '../../hooks/useLeaseType';

import pickUpImage from '/public/Assets/images/comparator/modal/cap-44067-160978.png';
import vanImage from '/public/Assets/images/comparator/modal/cap-51392-171678.png';
import carImage from '/public/Assets/images/comparator/modal/cap-88928-161019.png';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Modal = dynamic(() => import('core/molecules/modal'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards/Card'), {
  loading: () => <Skeleton count={1} />,
});

const ComparatorContainer: React.FC = () => {
  const [vehicles, setVehicles] = useState<
    { capId: number; vehicleType: VehicleTypeEnum | null }[]
  >([]);
  const [isModalVisible, setModalVisibility] = useState(false);
  const { compareVehicles, compareChange } = useContext(CompareContext);
  const { cachedLeaseType } = useLeaseType(null);

  useEffect(() => {
    if (compareVehicles?.length) {
      setVehicles(getVehiclesIds(compareVehicles));
    }
  }, [compareVehicles]);

  const { data, loading, error, refetch } = useVehicleData(
    vehicles,
    !vehicles.length,
  );

  useEffect(() => {
    if (vehicles.length && compareVehicles?.length) {
      refetch();
    }
  }, [vehicles, compareVehicles, refetch]);

  const handleVehicleAdd = useCallback(() => {
    if ((compareVehicles || []).length > 0) {
      Router.back();
    } else {
      setModalVisibility(true);
    }
  }, [compareVehicles]);

  if (error) {
    return (
      <div
        style={{ minHeight: '10rem', display: 'flex', alignItems: 'center' }}
      >
        {error?.message}
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{ minHeight: '10rem', display: 'flex', alignItems: 'center' }}
      >
        <Loading size="xlarge" />
      </div>
    );
  }

  const viewOffer = (capId: string) => {
    const currentVehicle = compareVehicles?.find(
      compareVehicle => compareVehicle.capId === capId,
    );
    if (currentVehicle && currentVehicle.pageUrl) {
      sessionStorage.setItem('capId', capId);
      Router.push(currentVehicle.pageUrl.href, currentVehicle.pageUrl.url);
    }
  };

  return (
    <>
      <ComparatorTable
        addVehicle={handleVehicleAdd}
        deleteVehicle={capId => {
          compareChange(null, capId);
        }}
        criterias={getCriterials(
          (data as vehicleComparator) ?? (INIT_VEHICLE as vehicleComparator),
          compareVehicles,
          cachedLeaseType,
        )}
        viewOffer={capId => {
          viewOffer(`${capId}`);
        }}
        isNotEmptyPage={!!data}
      />
      {isModalVisible && (
        <Modal
          // className="-mt-000 callBack"
          show
          onRequestClose={() => setModalVisibility(false)}
        >
          <div className="-pt-000">
            <div>
              <Heading tag="span" color="black">
                Choose the type of vehicle are you looking for?
              </Heading>
            </div>
            <Card inline imageSrc={vanImage}>
              <div>
                <div>SOME</div>
                <div>EMOS</div>
              </div>
            </Card>
            <Card imageSrc={pickUpImage}>
              <div>
                <div>SOME</div>
                <div>EMOS</div>
              </div>
            </Card>
            <Card imageSrc={carImage}>
              <div>
                <div>SOME</div>
                <div>EMOS</div>
              </div>
            </Card>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ComparatorContainer;
