import React, { useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { IComparatorBar } from './interface';
import ComporatorBarCard from './ComparatorBarCard';
import Heading from '../../atoms/heading/Heading';
import Button from '../../atoms/button';
import {
  getCompares,
  IVehicle,
  getVehiclesForComparator,
  IVehicleCarousel,
} from '../../../utils/comparatorHelpers';
import {
  PAGES_WITH_COMPARATOR,
  PAGES_WITHOUT_COMPARATOR,
  WHOLE_PATHS_PAGES_WITH_COMPARATOR,
} from '../../../utils/comparatorTool';

const MAX_AMOUNT_VEHICLES = 3;

const ComporatorBar: React.FC<IComparatorBar> = ({
  className,
  dataTestId,
  deleteVehicle,
  compareVehicles,
  vehicles: vehiclesState,
  setCompareVehicles,
}) => {
  const router = useRouter();
  const arrayCards = Array(MAX_AMOUNT_VEHICLES).fill('');
  const [existComparator, setExistComparator] = useState(false);

  const vehicles = useMemo(() => getVehiclesForComparator(vehiclesState), [
    vehiclesState,
  ]);

  const vehiclesAdded =
    vehicles?.length === 1
      ? `1 Vehicle Added`
      : `${vehicles.length} Vehicles Added`;

  useEffect(() => {
    const getVehicles = async () => {
      const vehiclesCompares = (await getCompares()) as
        | IVehicle[]
        | IVehicleCarousel[]
        | null;
      if (vehiclesCompares?.length) {
        setCompareVehicles(vehiclesCompares);
      }
    };
    getVehicles();

    if (
      (PAGES_WITH_COMPARATOR.some(page => router.pathname.includes(page)) &&
        !PAGES_WITHOUT_COMPARATOR.some(page =>
          router.pathname.includes(page),
        )) ||
      WHOLE_PATHS_PAGES_WITH_COMPARATOR.some(page => router.pathname === page)
    ) {
      setExistComparator(true);
    } else {
      setExistComparator(false);
    }
  }, [router.pathname]);
  return (vehicles?.length > 0 || router.pathname === '/comparator') &&
    existComparator ? (
    <div className={cx('comparator-bar', className)} data-testid={dataTestId}>
      <div className="comparator-bar--container">
        {arrayCards.map((card, index) => (
          <ComporatorBarCard
            deleteVehicle={() => {
              deleteVehicle(vehicles[index]);
            }}
            key={`${(vehicles[index]?.capId || '') + index}`}
            vehicle={vehicles[index]}
            number={index + 1}
          />
        ))}
        <div className="comparator-bar--actions">
          <Heading
            size="xsmall"
            color="black"
            className="comparator-bar--actions-count"
          >
            {vehiclesAdded}
          </Heading>
          {vehicles.length === MAX_AMOUNT_VEHICLES && (
            <Heading
              size="xsmall"
              color="black"
              className="comparator-bar--actions-max"
            >
              {`${MAX_AMOUNT_VEHICLES} Vehicles Max`}
            </Heading>
          )}
          <Button
            onClick={() => {
              compareVehicles();
            }}
            disabled={vehicles.length < 2}
            size="lead"
            color="teal"
            label="Compare Vehicles"
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ComporatorBar;
