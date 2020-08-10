/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import ComparatorTable from '@vanarama/uibook/lib/components/organisms/comparator-table';
import {
  getCompares,
  IVehicle,
  IVehicleCarousel,
} from '../../utils/comparatorHelpers';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { useVehicleData } from './gql';

interface ICustomerAlsoViewedContainerProps {
  capsId: string[];
  leaseType: string;
  vehicleType?: VehicleTypeEnum;
}

const getCriterials = (data, compareVehicles) => {
  const compareVehicle = compareVehicles[0];
  debugger
  const criterials = compareVehicles.map(compareVehicle => {
    const currentVehicleData = data.vehicleComparator.find(
      dat => dat.capId == compareVehicle.capId,
    );
    return currentVehicleData.data.map(criteria => ({
      title: criteria.name,
      values: [criteria.value]
    }));
  });
  console.log('criterials', criterials);
  return [];
};

const criterias = [
  {
    title: 'Manufacturer OTR',
    values: ['2', '2'],
  },
  {
    title: 'WLTP Combined',
    values: ['2', '2'],
  },
  {
    title: 'Fuel Type',
    values: ['2', '2'],
  },
  {
    title: '0 to 60 mph (secs)',
    values: ['2', '2'],
  },
  {
    title: 'CC',
    values: ['2', '2'],
  },
  {
    title: 'Engine Power - BHP',
    values: ['2', '2'],
  },
  {
    title: 'Insurance Group',
    values: ['2', '2'],
  },
  {
    title: 'No. of Seats',
    values: ['2', '2'],
  },
  {
    title: 'Top Speed',
    values: ['2', '2'],
  },
  {
    title: 'Transmission',
    values: ['2', '2'],
  },
  {
    title: 'Price',
    values: [
      {
        capId: 1,
        price: 56.73,
      },
      {
        capId: 2,
        price: 55.44,
      },
    ],
  },
  {
    title: 'Heading',
    values: [
      {
        capId: 1,
        name: 'Peugeot 208',
        description: '1.6 GDi SE Nav 5DR 2WD',
        image:
          'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg',
      },
      {
        capId: 2,
        name: 'Peugeot 208',
        description: '1.6 GDi SE Nav 5DR 2WD',
        image:
          'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg',
      },
    ],
  },
];

const getVehiclesIds = vehiclesCompares => {
  return vehiclesCompares.map(vehiclesCompare => ({
    capId: +vehiclesCompare.capId,
    vehicleType: vehiclesCompare.vehicleType,
  }));
};

const ComparatorContainer: React.FC<ICustomerAlsoViewedContainerProps> = ({}) => {
  const [compareVehicles, setCompareVehicles] = useState<
    IVehicle[] | IVehicleCarousel[]
  >([]);
  const [vehicles, setVehicles] = useState<IVehicle[] | IVehicleCarousel[]>([]);

  useEffect(() => {
    const getVehicles = async () => {
      const vehiclesCompares = (await getCompares()) as
        | IVehicle[]
        | IVehicleCarousel[]
        | null;
      if (vehiclesCompares) {
        setCompareVehicles(vehiclesCompares);
        setVehicles(getVehiclesIds(vehiclesCompares));
      }
    };
    getVehicles();
  }, []);

  const { data, loading, error, refetch } = useVehicleData(
    vehicles,
    !vehicles.length,
  );

  useEffect(() => {
    if (vehicles.length && compareVehicles.length) {
      refetch();
    }
  }, [vehicles, compareVehicles, refetch]);

  console.log('DATA', vehicles);
  console.log('DATA1', data);

  if (loading && compareVehicles.length) {
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

  if(!data || !compareVehicles.length) return null;

  return (
    <ComparatorTable
      addVehicle={() => {}}
      deleteVehicle={() => {}}
      criterias={getCriterials(data, compareVehicles)}
      viewOffer={() => {}}
    />
  );
};

export default ComparatorContainer;
