import dynamic from 'next/dynamic';
import React, { useEffect, useState, useContext } from 'react';
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

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const ComparatorContainer: React.FC = () => {
  const [vehicles, setVehicles] = useState<
    { capId: number; vehicleType: VehicleTypeEnum | null }[]
  >([]);
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
    <ComparatorTable
      addVehicle={() => {
        Router.back();
      }}
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
  );
};

export default ComparatorContainer;
