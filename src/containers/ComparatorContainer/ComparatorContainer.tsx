/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState, useContext } from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import ComparatorTable from '@vanarama/uibook/lib/components/organisms/comparator-table';
import Router from 'next/router';
import { IVehicle, IVehicleCarousel } from '../../utils/comparatorHelpers';
import { CompareContext } from '../../utils/comparatorTool';
import {
  getVehiclesIds,
  getCriterials,
} from '../../utils/comparatorTableHelpers';
import { useVehicleData } from './gql';

const ComparatorContainer: React.FC = () => {
  const [vehicles, setVehicles] = useState<IVehicle[] | IVehicleCarousel[]>([]);
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

  if (loading && compareVehicles?.length) {
    return (
      <div
        style={{ minHeight: '10rem', display: 'flex', alignItems: 'center' }}
      >
        <Loading size="xlarge" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{ minHeight: '10rem', display: 'flex', alignItems: 'center' }}
      >
        {error?.message}
      </div>
    );
  }

  if (!data && compareVehicles?.length) return null;

  return (
    <ComparatorTable
      addVehicle={() => {
        Router.back();
      }}
      deleteVehicle={capId => {
        compareChange(null, capId);
      }}
      criterias={getCriterials(data, compareVehicles)}
      viewOffer={() => {}}
    />
  );
};

export default ComparatorContainer;
