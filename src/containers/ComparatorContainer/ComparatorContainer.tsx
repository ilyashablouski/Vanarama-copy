/* eslint-disable @typescript-eslint/camelcase */
import dynamic from 'next/dynamic';
import React, { useEffect, useState, useContext } from 'react';
import ComparatorTable from '@vanarama/uibook/lib/components/organisms/comparator-table';
import Router from 'next/router';
import { CompareContext } from '../../utils/comparatorTool';
import {
  getVehiclesIds,
  getCriterials,
} from '../../utils/comparatorTableHelpers';
import { useVehicleData } from './gql';
import { vehicleComparator } from '../../../generated/vehicleComparator';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/loading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const ComparatorContainer: React.FC = () => {
  const [vehicles, setVehicles] = useState<
    { capId: number; vehicleType: VehicleTypeEnum | null }[]
  >([]);
  const { compareVehicles, compareChange } = useContext(CompareContext);

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

  if (loading || !compareVehicles?.length) {
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
      criterias={
        compareVehicles?.length
          ? getCriterials(
              data as vehicleComparator | undefined,
              compareVehicles,
            )
          : []
      }
      viewOffer={capId => {
        viewOffer(`${capId}`);
      }}
    />
  );
};

export default ComparatorContainer;
